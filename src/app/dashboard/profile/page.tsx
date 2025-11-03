"use client";
import Image from "next/image";
import { useUser } from "@/context/UserContext";
import { formatDate } from '../../../utils/formatDate';

export default function ProfilePage() {
 
  const {user: googleUser , logout} = useUser() ;
  console.log(googleUser) ;
  
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
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
            Your Profile
          </h1>
          <p className="text-gray-400 mt-2 text-lg">
            Manage your personal details and account info.
          </p>
        </div>

        <div className="bg-white/10 border border-white/10 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-6 shadow-lg hover:shadow-violet-600/20 transition-all duration-300">
          <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-violet-500/50 shadow-md">
            {googleUser ? <Image src={googleUser?.picture} alt={googleUser?.firstName} width={112} height={112} /> : "login"}
          </div>
          <div className="flex flex-col gap-1 text-center sm:text-left">
            <h2 className="text-2xl font-semibold">{googleUser?.firstName}</h2>
            <p className="text-violet-400">{googleUser?.role}</p>
            <p className="text-gray-300">{googleUser?.email}</p>
            {googleUser.createdAt && (
              <p><strong>Joined:</strong> {formatDate(googleUser.createdAt)}</p>
            )}
            <button className="mt-3 bg-gradient-to-r from-cyan-400 to-violet-500 px-4 py-2 rounded-lg text-white font-semibold hover:shadow-lg transition">
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}