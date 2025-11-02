"use client";

import React from "react";
import Image from "next/image";
import GoogleAuth from "../components/Google"; // works if components/GoogleAuth.tsx exists

export default function Login() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-slate-900 to-slate-950 text-white">
      {/* 🔹 Logo + Title */}
      <div className="text-center mb-10">
        <div className="flex justify-center mb-4">
          <Image
            src="/logo.png"
            alt="Super Sheldon Logo"
            width={80}
            height={80}
            className="rounded-full shadow-lg"
          />
        </div>
        <h1 className="text-3xl font-bold text-cyan-400 tracking-wide">
          Super Sheldon Login
        </h1>
        <p className="text-gray-400 text-sm mt-2">
          Sign in to access your secure curriculum portal
        </p>
      </div>

      {/* 🔹 Google Sign-in */}
      <div className="bg-slate-800/50 border border-white/10 p-8 rounded-2xl shadow-lg text-center backdrop-blur-xl">
        <GoogleAuth buttonText="continue_with" />
      </div>

      {/* 🔹 Footer */}
      <p className="mt-10 text-xs text-gray-500 tracking-widest">
        © {new Date().getFullYear()} Super Sheldon — All Rights Reserved
      </p>
    </div>
  );
}
