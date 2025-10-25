"use client";
import { useEffect, useState } from "react";
import { ShieldCheck } from "lucide-react";

export default function AdminPortal() {
  const [email, setEmail] = useState<string | null>(null);
  const adminEmails = [
    "admin@supersheldon.com",
    "hello.supersheldon@gmail.com",
    "teacher@example.com",
  ];

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("email");
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  if (!email) {
    return (
      <main className="flex items-center justify-center h-screen text-gray-400 px-4 text-center sm:ml-[250px]">
        Loading...
      </main>
    );
  }

  if (!adminEmails.includes(email)) {
    return (
      <main className="flex flex-col items-center justify-center h-screen text-center text-red-400 px-4 sm:ml-20 sm:pl-16">
        <ShieldCheck size={64} className="text-red-500 mb-4" />
        <h2 className="text-xl sm:text-2xl font-semibold">Access Denied</h2>
        <p className="text-gray-400 mt-2 text-sm sm:text-base max-w-sm sm:max-w-md">
          You are not authorized to access this page.
        </p>
      </main>
    );
  }

  return (
    <main
      className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 
      text-white p-6  sm:p-8 md:p-15 pt-20 sm:ml-20 sm:pl-16"
    >
      <div className="mb-8 pt-14 text-center sm:text-left">
        <h1 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
          Admin Portal
        </h1>
        <p className="text-gray-400 mt-2 text-base sm:text-lg max-w-2xl mx-auto sm:mx-0">
          Manage users, teachers, and curriculum access here.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        <div className="bg-white/10 p-5 sm:p-6 rounded-2xl border border-white/10 shadow-lg hover:shadow-violet-500/20 transition-all duration-300 text-center sm:text-left">
          <h3 className="text-lg sm:text-xl font-semibold text-violet-400 mb-2">
            🧑‍🏫 Manage Teachers
          </h3>
          <p className="text-gray-300 text-sm sm:text-base">
            Add, remove, or update teacher accounts.
          </p>
        </div>

        <div className="bg-white/10 p-5 sm:p-6 rounded-2xl border border-white/10 shadow-lg hover:shadow-violet-500/20 transition-all duration-300 text-center sm:text-left">
          <h3 className="text-lg sm:text-xl font-semibold text-violet-400 mb-2">
            📘 Assign Curriculum
          </h3>
          <p className="text-gray-300 text-sm sm:text-base">
            Assign lessons and materials to teachers.
          </p>
        </div>

        <div className="bg-white/10 p-5 sm:p-6 rounded-2xl border border-white/10 shadow-lg hover:shadow-violet-500/20 transition-all duration-300 text-center sm:text-left">
          <h3 className="text-lg sm:text-xl font-semibold text-violet-400 mb-2">
            👥 Manage Students
          </h3>
          <p className="text-gray-300 text-sm sm:text-base">
            Approve enrollments and track progress.
          </p>
        </div>
      </div>
    </main>
  );
}
