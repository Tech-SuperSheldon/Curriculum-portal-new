"use client";

import { useState } from "react";
import Viewer from "@/components/Viewer";

export default function Home() {
  const [error, setError] = useState("");

  // ✅ Sample data to render the Viewer
  const slides = [
    { type: "image", url: "/demo-slide1.png" },
    { type: "image", url: "/demo-slide2.png" },
    { type: "embed", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
  ];

  const handleLogout = () => {
    console.log("User logged out");
  };

  return (
    <Viewer
      slides={slides}
      user="demo@supersheldon.com"
      appName="Super Sheldon Secure Viewer"
      watermarkText="Super Sheldon • Demo Mode"
      onLogout={handleLogout}
    />
  );
}
