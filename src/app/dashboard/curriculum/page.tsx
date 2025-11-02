"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

interface PPT {
  id: string;
  title: string;
  desc: string;
  img: string;
}

interface Module {
  id: string;
  title: string;
  desc: string;
  ppts: PPT[];
}

export default function CurriculumPage() {
  const router = useRouter();
  const [activeModule, setActiveModule] = useState<string | null>(null);
  const [assignedTeachers, setAssignedTeachers] = useState<{ [key: string]: string }>({});
  const [showModal, setShowModal] = useState(false);
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [teacherEmail, setTeacherEmail] = useState("");
  const [error, setError] = useState("");
  const [currentUserEmail, setCurrentUserEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  // 🔐 Load current user
  useEffect(() => {
    const email = sessionStorage.getItem("email") || "";
    setCurrentUserEmail(email);
    const admin = (process.env.NEXT_PUBLIC_ADMIN_EMAIL || "Support@supersheldon.com").toLowerCase();
    setIsAdmin(email.toLowerCase() === admin);
  }, []);

  // 📘 Demo data
  const modules: Module[] = [
    {
      id: "demo",
      title: "Demo Module – Sample Lessons",
      desc: "Preview 3 demo lessons showcasing Super Sheldon’s interactive learning style.",
      ppts: [
        { id: "demo1", title: "Demo PPT 1", desc: "Introduction to Learning", img: "/slides/demo/demo1/1.png" },
        { id: "demo2", title: "Demo PPT 2", desc: "Interactive Concepts", img: "/slides/demo/demo2/1.png" },
        { id: "demo3", title: "Demo PPT 3", desc: "Fun Practice Session", img: "/slides/demo/demo3/1.png" },
      ],
    },
    {
      id: "module1",
      title: "Module 1 – Reading & Comprehension",
      desc: "Build strong reading and comprehension skills for NAPLAN success.",
      ppts: [
        { id: "ppt1", title: "PPT 1", desc: "Reading Basics", img: "/slides/naplan/ppt1/1.png" },
        { id: "ppt2", title: "PPT 2", desc: "Comprehension Practice", img: "/slides/naplan/ppt2/1.png" },
        { id: "ppt3", title: "PPT 3", desc: "Story Analysis", img: "/slides/naplan/ppt3/1.png" },
      ],
    },
    {
    id: "module2",
    title: "Module 2 – Grammar & Writing",
    desc: "Master grammar, sentence structure, and writing clarity.",
    ppts: [
      { id: "ppt11", title: "PPT 1", desc: "Advanced Grammar & Writing", img: "/slides/naplan/ppt11/1.png" },
      { id: "ppt12", title: "PPT 2", desc: "Advanced Grammar & Writing", img: "/slides/naplan/ppt12/1.png" },
      { id: "ppt13", title: "PPT 3", desc: "Festivals & Celebrations", img: "/slides/naplan/ppt13/1.png" },
     { id: "ppt14", title: "PPT 4", desc: "Australian Exam Mastery Program", img: "/slides/naplan/ppt14/1.png" },
   
    ],
  },
  ];

  const currentModule = modules.find((m) => m.id === activeModule);
  const openPPT = (id: string) => router.push(`/viewer?id=${id}`);

  const handleView = (id: string) => {
    const assignedTo = assignedTeachers[id];
    if (!isAdmin && assignedTo && assignedTo.toLowerCase() !== currentUserEmail.toLowerCase()) {
      setError("Access denied. You are not assigned to this module.");
      return;
    }
    setError("");
    setActiveModule(id);
  };

  const handleAssign = (id: string) => {
    if (!isAdmin) return alert("Only admin can assign modules.");
    setSelectedModule(id);
    setShowModal(true);
  };

  const saveAssignment = () => {
    if (!teacherEmail) return;
    setAssignedTeachers((prev) => ({ ...prev, [selectedModule as string]: teacherEmail }));
    setShowModal(false);
    setTeacherEmail("");
  };

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-white px-4 sm:px-6 md:px-10 py-16 sm:py-20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
            NAPLAN Test Library
          </h1>
          <p className="text-gray-400 text-base sm:text-lg mt-2 max-w-2xl mx-auto md:mx-0">
            Access interactive PPTs crafted for Year 3–9 NAPLAN preparation.
          </p>
        </div>

        {/* Module Grid */}
        {!activeModule ? (
          <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {modules.map((m) => (
              <div
                key={m.id}
                className="group bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-5 sm:p-6 transition-all hover:scale-[1.03] hover:border-violet-400/40"
              >
                <h3 className="text-xl sm:text-2xl font-semibold mb-2">{m.title}</h3>
                <p className="text-gray-400 text-sm sm:text-base mb-4">{m.desc}</p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => handleView(m.id)}
                    className="w-full sm:w-auto px-4 py-2 rounded-lg bg-violet-500 hover:bg-violet-600 transition text-sm sm:text-base font-medium"
                  >
                    View
                  </button>

                  {isAdmin && (
                    <button
                      onClick={() => handleAssign(m.id)}
                      className="w-full sm:w-auto px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-600 transition text-sm sm:text-base font-medium"
                    >
                      Assign Teacher
                    </button>
                  )}
                </div>

                {assignedTeachers[m.id] && (
                  <p className="mt-3 text-xs sm:text-sm text-gray-400">
                    Assigned to: {assignedTeachers[m.id]}
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <>
            <button
              onClick={() => setActiveModule(null)}
              className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition text-sm sm:text-base"
            >
              <ArrowLeft className="w-5 h-5" /> Back to Modules
            </button>

            {error && <p className="text-red-400 mb-4 text-center sm:text-left">{error}</p>}

            <h2 className="text-2xl sm:text-3xl font-bold mb-4">{currentModule?.title}</h2>
            <p className="text-gray-400 mb-8 text-sm sm:text-base">{currentModule?.desc}</p>

            <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {currentModule?.ppts.map((p) => (
                <div
                  key={p.id}
                  onClick={() => openPPT(p.id)}
                  className="group bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.03] hover:border-violet-400/40 cursor-pointer"
                >
                  <div className="relative w-full h-40 sm:h-48 border-b border-white/10">
                    <Image src={p.img} alt={p.title} fill className="object-cover" unoptimized />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg sm:text-xl font-semibold mb-1">{p.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-300">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Assign Teacher Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
          <div className="bg-slate-800 p-6 rounded-xl shadow-xl w-full max-w-sm sm:max-w-md">
            <h3 className="text-lg sm:text-xl font-semibold mb-4 text-white text-center">
              Assign Teacher to Module
            </h3>
            <input
              type="email"
              placeholder="Enter teacher email"
              value={teacherEmail}
              onChange={(e) => setTeacherEmail(e.target.value)}
              className="w-full p-3 rounded-lg bg-slate-700 text-white placeholder-gray-400 mb-4 text-sm sm:text-base"
            />
            <div className="flex flex-col sm:flex-row justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded-lg text-sm sm:text-base"
              >
                Cancel
              </button>
              <button
                onClick={saveAssignment}
                className="px-4 py-2 bg-violet-600 hover:bg-violet-700 rounded-lg text-sm sm:text-base"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
