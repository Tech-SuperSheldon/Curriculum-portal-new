"use client";

import { useState } from "react";
import Image from "next/image";
import { useUser } from "@/context/UserContext";
import { formatDate } from "../../../utils/formatDate";

export default function ProfilePage() {
  const { user: googleUser, logout } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: googleUser?.firstName || "",
    email: googleUser?.email || "",
    role: googleUser?.role || "",
  });

  if (!googleUser) {
    return (
      <main className="min-h-screen flex justify-center items-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-gray-300">
        <p className="text-lg animate-pulse">Loading profile...</p>
      </main>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    // In future: POST or PATCH to /api/users/update
    console.log("Updated data:", formData);
    setIsEditing(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-white px-6 py-20 flex justify-center">
      <div className="max-w-3xl w-full">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
            Your Profile
          </h1>
          <p className="text-gray-400 mt-2 text-lg">
            Manage your personal details and account info.
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-white/10 border border-white/10 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-6 shadow-lg hover:shadow-violet-600/20 transition-all duration-300">
          <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-violet-500/50 shadow-md">
            <Image
              src={googleUser?.picture}
              alt={googleUser?.firstName || "User"}
              width={112}
              height={112}
            />
          </div>

          {/* Info Section */}
          <div className="flex flex-col gap-2 text-center sm:text-left w-full">
            {isEditing ? (
              <>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="bg-slate-800 border border-slate-600 rounded-md px-3 py-2 text-white"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  
                  className="bg-slate-800 border border-slate-600 rounded-md px-3 py-2 text-white"
                />
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  className="bg-slate-800 border border-slate-600 rounded-md px-3 py-2 text-white"
                />
                <div className="flex gap-3 mt-3">
                  <button
                    onClick={handleSave}
                    className="bg-gradient-to-r from-cyan-400 to-violet-500 px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="bg-slate-700 px-4 py-2 rounded-lg hover:bg-slate-600 transition"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-semibold">{googleUser?.firstName}</h2>
                <p className="text-violet-400">{googleUser?.role}</p>
                <p className="text-gray-300">{googleUser?.email}</p>
                {googleUser.createdAt && (
                  <p><strong>Joined:</strong> {formatDate(googleUser.createdAt)}</p>
                )}
                <div className="flex gap-3 mt-3">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-gradient-to-r from-cyan-400 to-violet-500 px-4 py-2 rounded-lg text-white font-semibold hover:shadow-lg transition"
                  >
                    Edit Profile
                  </button>
                  <button
                    onClick={logout}
                    className="bg-red-500/80 px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition"
                  >
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
