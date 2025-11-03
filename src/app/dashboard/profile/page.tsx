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
      <div className="max-w-3xl w-full text-center sm:text-left">
        {/* Header */}
     <div className="max-w-3xl w-full">
       <div className="mb-10">
         <h1 className="text-4xl font-extrabold bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent"> Your Profile </h1>
         <p className="text-gray-400 mt-2 text-lg"> Manage your personal details and account info. </p> 
       </div>

        {/* Profile Card */}
        <div className="relative group bg-white/10 border border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl backdrop-blur-xl hover:scale-[1.02] transition-transform duration-500">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-500/10 to-violet-600/10 blur-xl opacity-60 group-hover:opacity-80 transition" />

          <div className="relative flex flex-col sm:flex-row items-center sm:items-start gap-8">
            {/* Profile Image */}
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-cyan-400/60 shadow-lg shadow-violet-600/30">
              <Image
                src={googleUser?.picture}
                alt={googleUser?.firstName || "User"}
                width={128}
                height={128}
                className="object-cover"
              />
            </div>

            {/* Info Section */}
            <div className="flex flex-col gap-3">
              <h2 className="text-3xl font-semibold tracking-tight bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
                {googleUser?.firstName}
              </h2>
              <p className="text-violet-300 text-lg">{googleUser?.role}</p>
              <p className="text-gray-300 text-base">{googleUser?.email}</p>

              {googleUser.createdAt && (
                <p className="text-sm text-gray-400 mt-1">
                  <span className="font-medium text-gray-200">Joined:</span>{" "}
                  {formatDate(googleUser.createdAt)}
                </p>
              )}

              <button
                onClick={logout}
                className="mt-5 self-center sm:self-start bg-gradient-to-r from-rose-500 to-red-600 px-5 py-2.5 rounded-lg font-semibold text-white shadow-md hover:shadow-rose-600/40 transition-all duration-300"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-gray-500 text-sm text-center sm:text-left">
          Super Sheldon © {new Date().getFullYear()} | Secure access enabled 🔒
        </div>
      </div>
    </main>
  );
}
