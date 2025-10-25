"use client";

import { useState } from "react";
import LoginForm from "@/components/LoginForm";

export default function Home() {
  const [error, setError] = useState("");

  return (
    <main className="flex items-center justify-center h-screen bg-slate-900 text-white">
      <LoginForm error={error} />
    </main>
  );
}
//comment