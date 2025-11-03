"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import axiosClient from "@/utils/axiosClient";
import { useUser } from "@/context/UserContext";

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
  const { user } = useUser();
  const [activeModule, setActiveModule] = useState<string | null>(null);
  const [assignedTeachers, setAssignedTeachers] = useState<{ [key: string]: string }>({});
  const [showModal, setShowModal] = useState(false);
  const [selectedPPT, setSelectedPPT] = useState<string | null>(null);
  const [teacherEmail, setTeacherEmail] = useState("");
  const [allowedPPTs, setAllowedPPTs] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const isAdmin = user?.role === "admin";
  const currentUserEmail = user?.email || "";

  // 📡 Load assigned PPTs for the teacher
  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        if (!user || isAdmin) return;

        const res = await axiosClient.post("/ppt/getPPT", { email: currentUserEmail });

        if (res.data?.success && Array.isArray(res.data.data)) {
          const pptList = res.data.data.map((ppt: any) => ppt.fileUrl || ppt.title);
          setAllowedPPTs(pptList);
          console.log("✅ Assigned PPTs:", pptList);
        } else {
          console.warn("No assigned PPTs found");
        }
      } catch (err) {
        console.error("❌ Failed to load assigned PPTs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, [user, currentUserEmail, isAdmin]);

  // 📘 Modules
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
        { id: "ppt4", title: "PPT 4", desc: "Grammar Warm-up", img: "/slides/naplan/ppt4/1.png" },
        { id: "ppt5", title: "PPT 5", desc: "Writing Basics", img: "/slides/naplan/ppt5/1.png" },
        { id: "ppt6", title: "PPT 6", desc: "Creative Writing", img: "/slides/naplan/ppt6/1.png" },
      ],
    },
  ];

  const currentModule = modules.find((m) => m.id === activeModule);

  // 🔍 Open PPT with access check
  const openPPT = (id: string) => {
    if (!isAdmin && !allowedPPTs.includes(id)) {
      alert("🚫 Access denied — this PPT is not assigned to you.");
      return;
    }
    router.push(`/viewer?id=${id}`);
  };

  // 🧑‍🏫 Assign PPT
  const handleAssign = (pptId: string) => {
    if (!isAdmin) {
      alert("Only admin can assign PPTs.");
      return;
    }
    setSelectedPPT(pptId);
    setShowModal(true);
  };

  // 💾 Save assignment
  const saveAssignment = async () => {
    if (!teacherEmail || !selectedPPT) return alert("Please enter all fields.");

    try {
      const res = await axiosClient.post("/ppt/assignPPT", {
        title: selectedPPT,
        description: "Assigned via Curriculum Portal",
        subject: "NAPLAN",
        grade: "General",
        fileUrl: selectedPPT,
        uploadedBy: currentUserEmail,
        assignedTo: teacherEmail,
      });

      if (res.status === 200 && res.data?.success !== false) {
        alert("✅ PPT assigned successfully!");
        setAssignedTeachers((prev) => ({ ...prev, [selectedPPT]: teacherEmail }));
      } else {
        alert("❌ Failed to assign PPT — please check backend logs.");
      }
    } catch (err) {
      console.error("Assignment failed:", err);
      alert("Failed to assign PPT.");
    } finally {
      setShowModal(false);
      setTeacherEmail("");
    }
  };

  if (loading)
    return (
      <main className="flex items-center justify-center h-screen text-gray-300 text-lg">
        Loading Curriculum...
      </main>
    );

  // 👇 Rest of your original UI untouched
  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-white px-6 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
            NAPLAN Test Library
          </h1>
          <p className="text-gray-400 text-lg mt-2">
            Access interactive PPTs crafted for Year 3–9 NAPLAN preparation.
          </p>
        </div>

        {!activeModule ? (
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {modules.map((m) => (
              <div
                key={m.id}
                className="group bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-6 transition-all hover:scale-[1.03]"
              >
                <h3 className="text-2xl font-semibold mb-2">{m.title}</h3>
                <p className="text-gray-400 mb-4">{m.desc}</p>
                <button
                  onClick={() => setActiveModule(m.id)}
                  className="w-full px-4 py-2 rounded-lg bg-violet-500 hover:bg-violet-600 transition font-medium"
                >
                  View
                </button>
              </div>
            ))}
          </div>
        ) : (
          <>
            <button
              onClick={() => setActiveModule(null)}
              className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition"
            >
              <ArrowLeft className="w-5 h-5" /> Back to Modules
            </button>

            <h2 className="text-3xl font-bold mb-4">{currentModule?.title}</h2>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {currentModule?.ppts.map((p) => (
                <div
                  key={p.id}
                  className="group bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl overflow-hidden hover:scale-[1.03] transition-all duration-300"
                >
                  <div
                    className="relative w-full h-48 border-b border-white/10 cursor-pointer"
                    onClick={() => openPPT(p.id)}
                  >
                    <Image src={p.img} alt={p.title} fill className="object-cover" unoptimized />
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-semibold mb-1">{p.title}</h3>
                    <p className="text-sm text-gray-300">{p.desc}</p>

                    {isAdmin && (
                      <button
                        onClick={() => handleAssign(p.id)}
                        className="mt-3 w-full px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-600 transition font-medium"
                      >
                        Assign Teacher
                      </button>
                    )}

                    {assignedTeachers[p.id] && (
                      <p className="mt-2 text-sm text-gray-400">
                        Assigned to: {assignedTeachers[p.id]}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Assign Modal (UI unchanged) */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
          <div className="bg-slate-800 p-6 rounded-xl shadow-xl w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4 text-white text-center">
              Assign Teacher to PPT
            </h3>
            <input
              type="email"
              placeholder="Enter teacher email"
              value={teacherEmail}
              onChange={(e) => setTeacherEmail(e.target.value)}
              className="w-full p-3 rounded-lg bg-slate-700 text-white placeholder-gray-400 mb-4"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={saveAssignment}
                className="px-4 py-2 bg-violet-600 hover:bg-violet-700 rounded-lg"
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
