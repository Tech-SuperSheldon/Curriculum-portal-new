"use client";

import { useState } from "react";
import LoginForm from "@/components/Viewer";

export default function Home() {
  const [error, setError] = useState("");

  return (
    <main className="flex items-center justify-center h-screen bg-slate-900 text-white">
      <Viewer/>
    </main>
  );
}
//comment
