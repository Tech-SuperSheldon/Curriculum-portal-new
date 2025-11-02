"use client";

import { useState } from "react";
import { useUser } from "@/context/UserContext"; // ✅ Assuming you already have this context
import Viewer from "@/components/Viewer";
import type { Slide } from "@/components/Viewer";

export default function Home() {
  const { user } = useUser(); // ✅ Get logged-in user
  const [error, setError] = useState("");

  const slides: Slide[] = [
    { type: "image", url: "/demo-slide1.png" },
    { type: "image", url: "/demo-slide2.png" },
    { type: "embed", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
  ];

  const handleLogout = () => {
    console.log("User logged out");
  };

  // ✅ If no user is logged in, show fallback
  if (!user?.email) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-300">
        Please log in to access the viewer.
      </div>
    );
  }

  return (
    <Viewer
      slides={slides}
      user={user.email} // ✅ Dynamically shows logged-in user's email
      appName="Super Sheldon Secure Viewer"
      watermarkText={`Super Sheldon • ${user.email}`}
      onLogout={handleLogout}
    />
  );
}
