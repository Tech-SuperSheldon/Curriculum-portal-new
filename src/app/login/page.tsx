"use client";

import Image from "next/image";
import GoogleAuth from "@/components/Google";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";

export default function LoginPage() {
  const router = useRouter();
  const { user } = useUser();

  // 🔄 Redirect if already logged in
  useEffect(() => {
    if (user) {
      router.replace("/dashboard/curriculum");
    }
  }, [user, router]);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-white px-4">
      <div className="bg-white/5 border border-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-10 text-center w-[90%] max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Image
            src="/Final-Logo-bg-removed.png"
            alt="Super Sheldon Logo"
            width={120}
            height={120}
            unoptimized
          />
        </div>

        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
          Super Sheldon Portal
        </h1>
        <p className="text-gray-400 mb-8">Sign in securely with Google</p>

        {/* Google Authentication Component */}
        <div className="flex justify-center">
          <GoogleAuth buttonText="continue_with" />
        </div>
      </div>
    </main>
  );
}
