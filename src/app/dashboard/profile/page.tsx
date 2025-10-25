"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

interface User {
  name: string;
  role: string;
  email: string;
  joined: string;
  avatar: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // 🧠 Fetch user details from sessionStorage
    if (typeof window !== "undefined") {
      const storedName = sessionStorage.getItem("name") || "Guest User";
      const storedEmail = sessionStorage.getItem("email") || "guest@supersheldon.com";
      const storedRole = sessionStorage.getItem("role") || "Tutor | SuperSheldon";
      const storedAvatar = sessionStorage.getItem("avatar") || "/profile.png";
      const storedJoined = sessionStorage.getItem("joined") || "October 2025";

      setUser({
        name: storedName,
        email: storedEmail,
        role: storedRole,
        avatar: storedAvatar,
        joined: storedJoined,
      });
    }
  }, []);

  if (!user) {
    return (
      <main className="min-h-screen flex justify-center items-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-gray-300 px-4">
        <p className="text-base sm:text-lg animate-pulse text-center">Loading profile...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-white px-4 sm:px-6 lg:px-10 py-20 flex justify-center items-start">
      <div className="max-w-3xl w-full">
        <div className="mb-10 text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
            Your Profile
          </h1>
          <p className="text-gray-400 mt-2 text-base sm:text-lg">
            Manage your personal details and account info.
          </p>
        </div>

        <div className="bg-white/10 border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6 shadow-lg hover:shadow-violet-600/20 transition-all duration-300">
          <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-violet-500/50 shadow-md">
            <Image
              src={user.avatar}
              alt={user.name}
              width={128}
              height={128}
              className="object-cover w-full h-full"
            />
          </div>

          <div className="flex flex-col gap-1 text-center sm:text-left">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold">{user.name}</h2>
            <p className="text-violet-400 text-sm sm:text-base">{user.role}</p>
            <p className="text-gray-300 text-sm sm:text-base break-words">{user.email}</p>
            <p className="text-gray-400 text-xs sm:text-sm mt-1">Joined: {user.joined}</p>
            <button className="mt-3 bg-gradient-to-r from-cyan-400 to-violet-500 px-4 py-2 rounded-lg text-white font-semibold hover:shadow-lg hover:scale-[1.03] transition-all duration-200 w-full sm:w-auto">
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
