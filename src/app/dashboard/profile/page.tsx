"use client";
import Image from "next/image";
import { useUser } from "@/context/UserContext";
import { formatDate } from "../../../utils/formatDate";

export default function ProfilePage() {
  const { user: googleUser, logout } = useUser();
  console.log(googleUser);

  if (!googleUser) {
    return (
      <main className="min-h-screen flex justify-center items-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-gray-300">
        <p className="text-lg animate-pulse">Loading profile...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-white px-6 py-20 flex justify-center">
      <div className="max-w-3xl w-full">
        {/* Header */}
        <div className="mb-12 text-center sm:text-left">
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-500 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(139,92,246,0.5)]">
            Your Profile
          </h1>
          <p className="text-gray-400 mt-3 text-lg tracking-wide">
            Manage your personal details and account info.
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-white/10 border border-white/10 rounded-3xl p-8 flex flex-col sm:flex-row items-center gap-8 shadow-2xl hover:shadow-[0_0_25px_rgba(139,92,246,0.4)] hover:scale-[1.02] transition-all duration-500 backdrop-blur-lg">
          {/* Profile Picture */}
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gradient-to-r from-cyan-400 to-violet-500 shadow-lg shadow-violet-700/40 ring-2 ring-white/10 hover:ring-cyan-400/50 transition-all duration-300">
            {googleUser ? (
              <Image
                src={googleUser?.picture}
                alt={googleUser?.firstName}
                width={128}
                height={128}
                className="object-cover scale-105 hover:scale-110 transition-transform duration-500"
              />
            ) : (
              "login"
            )}
          </div>

          {/* Profile Info */}
          <div className="flex flex-col gap-2 text-center sm:text-left">
            <h2 className="text-3xl font-semibold bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
              {googleUser?.firstName}
            </h2>
            <p className="text-violet-300 text-lg font-medium">{googleUser?.role}</p>
            <p className="text-gray-300 text-base">{googleUser?.email}</p>

            {googleUser.createdAt && (
              <p className="text-gray-400 mt-1 text-sm">
                <span className="font-semibold text-gray-200">Joined:</span>{" "}
                {formatDate(googleUser.createdAt)}
              </p>
            )}

            {/* Edit Button (styled beautifully but same placement) */}
            <button className="mt-4 bg-gradient-to-r from-cyan-400 to-violet-500 px-6 py-2.5 rounded-lg text-white font-semibold shadow-lg hover:shadow-[0_0_20px_rgba(56,189,248,0.6)] transition-all duration-500">
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

