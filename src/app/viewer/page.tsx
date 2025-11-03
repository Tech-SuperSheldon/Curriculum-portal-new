"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Viewer from "@/components/Viewer";

interface Slide {
  type: "image" | "embed";
  url: string;
}

export default function ViewerPage() {
  const router = useRouter();
  const params = useSearchParams();
  const curriculumId = params.get("id");

  console.log(curriculumId);

  const [slides, setSlides] = useState<Slide[]>([]);
  const [appName, setAppName] = useState("Super Sheldon Secure Portal");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  

   console.log("hello bhai");

  useEffect(() => {
    if (!curriculumId) {
      router.replace("/dashboard/curriculum");
      return;
    }



    const loadSlides = async () => {
      
      
     
      try {
        // ✅ Public API — no token or auth header
        const res = await fetch(`/api/slides?curriculum=${curriculumId}`, {
          cache: "no-store",
        
        });

        
      
        if (!res.ok) throw new Error("Failed to load slides");

        const data = await res.json();
        setSlides(data.slides || []);
        setAppName(data.appName || "Super Sheldon Secure Portal");
      } catch (e: any) {
        console.error(e.message);
        setError("Failed to load slides. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadSlides();
  }, [curriculumId, router]);

  if (loading)
    return (
      <main className="flex items-center justify-center h-screen text-gray-300 text-lg">
        Loading {curriculumId}…
      </main>
    );

  if (error)
    return (
      <main className="flex items-center justify-center h-screen text-red-400 text-lg">
        {error}
      </main>
    );

  if (!slides.length)
    return (
      <main className="flex flex-col items-center justify-center h-screen text-gray-400 text-center">
        <p>
          No slides found for <b>{curriculumId}</b>.
        </p>
        <button
          onClick={() => router.replace("/dashboard/curriculum")}
          className="mt-4 px-5 py-2 bg-orange-500 hover:bg-orange-600 rounded-lg text-white font-semibold"
        >
          ← Back to Curriculum
        </button>
      </main>
    );

  return (
    <Viewer
      slides={slides}
      user="Guest User"
      appName={appName}
      onLogout={() => router.replace("/dashboard/curriculum")}
    />
  );
}
