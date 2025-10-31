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

  const [slides, setSlides] = useState<Slide[]>([]);
  const [user, setUser] = useState("");
  const [appName, setAppName] = useState("Super Sheldon Secure Portal");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const email = sessionStorage.getItem("email");

    setUser(email);

    if (!curriculumId) {
      router.replace("/dashboard/curriculum");
      return;
    }
    const loadSlides = async () => {
      try {
        const res = await fetch(`/api/slides?curriculum=${curriculumId}`, {
          headers: { Authorization: `Bearer ${token}` },
          cache: "no-store",
        });

        if (!res.ok) throw new Error("Unauthorized or invalid token");

        const data = await res.json();
        setSlides(data.slides || []);
        setAppName(data.appName || "Super Sheldon Secure Portal");
      } catch (e: any) {
        console.error(e.message);
        setError("Failed to load slides – please login again.");
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
      user={user}
      appName={appName}
      onLogout={() => {
        sessionStorage.clear();
        router.replace("/login");
      }}
    />
  );
}
