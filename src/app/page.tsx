"use client";

import { useState } from "react";
// import LoginForm from "@/components/LoginForm";
import ViewerPage from "./viewer/page";

export default function Home() {
  const [error, setError] = useState("");

  return (
    // <main className="flex items-center justify-center h-screen bg-slate-900 text-white">
      <ViewerPage />
    // </main>
  );
}
