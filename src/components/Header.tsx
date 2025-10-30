"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, LogOut, Settings, User } from "lucide-react";
import Image from "next/image";
import { useUser } from '@/context/UserContext';

export default function Header() {
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();
  const {user , logout} = useUser() ;

  // 🧠 Handle Logout
  const handleLogout = (): void => {
    if (typeof window !== "undefined") {
      sessionStorage.clear(); // Clear stored session
    }
    router.push("/"); // Redirect to login/home
  };

  // 🧭 Navigate helper
  const navigate = (path: string): void => {
    setOpen(false); // Close dropdown
    router.push(path);
  };

  // 🧾 Get signed-in email from sessionStorage
  const userEmail = user ? user.email : "login" ;

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-slate-900/90 via-slate-800/90 to-slate-900/90 backdrop-blur-lg border-b border-white/10 shadow-lg px-6 h-[70px] flex items-center justify-between transition-all duration-300">
      {/* 🌟 Brand Logo */}
      {/* 🌟 Modern Glass Logo Section */}
<div
  className="flex items-center gap-3 cursor-pointer select-none group"
  onClick={() => router.push('/dashboard/profile')}
>
  {/* Glass Panel with Neon Edge */}
  <div className="relative flex items-center justify-center w-[160px] h-[60px] rounded-2xl bg-gradient-to-br from-slate-800/70 to-slate-900/60 backdrop-blur-md border border-white/10 shadow-[0_0_25px_rgba(56,189,248,0.15)] overflow-hidden transition-all duration-500 group-hover:shadow-[0_0_40px_rgba(56,189,248,0.5)] group-hover:scale-105">
    {/* Animated Neon Ring */}
    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 opacity-30 blur-xl group-hover:opacity-60 transition-all duration-500"></div>

    {/* Logo Image */}
      <Image
        src="/Final-Logo-bg-removed.png"
        alt="Super Sheldon Logo"
        width={110}
        height={110}
        className="relative z-10 object-contain drop-shadow-[0_0_12px_rgba(56,189,248,0.6)] transition-all duration-500 group-hover:drop-shadow-[0_0_20px_rgba(139,92,246,0.9)] group-hover:scale-110"
      />
  </div>

 
</div>

      {/* 👤 Profile Dropdown */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 bg-white/5 px-3 py-2 rounded-xl border border-white/10 hover:bg-white/10 transition"
          title="Toggle Menu"
        >
          {user?.picture && (
            <Image
              src={user.picture}
              alt={user.firstName}
              width={32}
              height={32}
              className="rounded-full border border-violet-400/50"
            />
          )}
          <ChevronDown
            className={`w-4 h-4 text-gray-300 transition ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>

        {open && (
          <div className="absolute right-0 mt-3 w-56 bg-slate-800/95 border border-white/10 rounded-xl shadow-xl backdrop-blur-md overflow-hidden animate-fadeIn">
            <div className="p-3 border-b border-white/10">
              <p className="text-sm text-gray-400">Signed in as</p>
              <p className="text-cyan-400 font-semibold truncate">{userEmail}</p>
            </div>

            {/* Profile Button */}
            <button
              type="button"
              onClick={() => navigate("/dashboard/profile")}
              className="flex items-center gap-3 w-full text-left px-4 py-2 hover:bg-white/10 transition text-gray-200"
            >
              <User className="w-4 h-4 text-violet-400" /> Profile
            </button>

            {/* Settings Button */}
            <button
              type="button"
              onClick={() => navigate("/dashboard/settings")}
              className="flex items-center gap-3 w-full text-left px-4 py-2 hover:bg-white/10 transition text-gray-200"
            >
              <Settings className="w-4 h-4 text-cyan-400" /> Settings
            </button>

            {/* Logout Button */}
            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-3 w-full text-left px-4 py-2 text-red-400 hover:bg-red-500/10 transition"
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}