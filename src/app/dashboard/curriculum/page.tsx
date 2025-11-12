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
      desc: "Preview 3 demo lessons showcasing Super Sheldon's interactive learning style.",
      ppts: [
        { id: "demo1", title: "Demo PPT 1", desc: "Introduction to Learning", img: "/slides/demo/demo1/1.png" },
        { id: "demo2", title: "Demo PPT 2", desc: "Interactive Concepts", img: "/slides/demo/demo2/1.png" },
        { id: "demo3", title: "Demo PPT 3", desc: "Fun Practice Session", img: "/slides/demo/demo3/1.png" },
      ],
    },
    {
      id: "ukdemo",
      title: "UK Demo",
      desc: "UK Demo module exposing demo4/demo5/demo6 for quick edits.",
      ppts: [
        { id: "demo4", title: "Demo 4", desc: "UK Demo 4", img: "/slides/demo/demo4/1.png" },
        { id: "demo5", title: "Demo 5", desc: "UK Demo 5", img: "/slides/demo/demo5/1.png" },
        { id: "demo6", title: "Demo 6", desc: "UK Demo 6", img: "/slides/demo/demo6/1.png" },
      ],
    },
    {
      id: "ukmod1",
      title: "UK Module 1",
      desc: "UK Module — comprehensive set of 26 PPTs.",
      ppts: [
        { id: "ukmod1-ppt1", title: "English Readnig Comprehension", desc: "UK Module — Lesson 1", img: "/slides/ukmod1/ppt1/1.png" },
        { id: "ukmod1-ppt2", title: "NOUNS, PRONOUNS AND THEIR INTERCHANGEBILITY", desc: "UK Module — Lesson 2", img: "/slides/ukmod1/ppt2/1.png" },
        { id: "ukmod1-ppt3", title: "Main Verbs and Auxiliary Verbs", desc: "UK Module — Lesson 3", img: "/slides/ukmod1/ppt3/1.png" },
        { id: "ukmod1-ppt4", title: "CREATIVE SENTENCES", desc: "UK Module — Lesson 4", img: "/slides/ukmod1/ppt4/1.png" },
        { id: "ukmod1-ppt5", title: "Creative Writing & Exam Style", desc: "UK Module — Lesson 5", img: "/slides/ukmod1/ppt5/1.png" },
        { id: "ukmod1-ppt6", title: "Auxiliary Verbs: Types and Subject-Verb Agreement", desc: "UK Module — Lesson 6", img: "/slides/ukmod1/ppt6/1.png" },
        { id: "ukmod1-ppt7", title: "Tenses and Gerunds", desc: "UK Module — Lesson 7", img: "/slides/ukmod1/ppt7/1.png" },
        { id: "ukmod1-ppt8", title: "English Reading Comprehension (ERC) Session Overview", desc: "UK Module — Lesson 8", img: "/slides/ukmod1/ppt8/1.png" },
        { id: "ukmod1-ppt9", title: "Connecting Ideas: Exploring Connectives in Language", desc: "UK Module — Lesson 9", img: "/slides/ukmod1/ppt9/1.png" },
        { id: "ukmod1-ppt10", title: "Exploring Adjectives", desc: "UK Module — Lesson 10", img: "/slides/ukmod1/ppt10/1.png" },
        { id: "ukmod1-ppt11", title: "Creative Writing: Sensory Language and Its Use", desc: "UK Module — Lesson 11", img: "/slides/ukmod1/ppt11/1.png" },
        { id: "ukmod1-ppt12", title: "ADVERBS, TYPES OF ADVERBS AND THEIR IMPORTANCE IN CREATIVE WRITING", desc: "UK Module — Lesson 12", img: "/slides/ukmod1/ppt12/1.png" },
        { id: "ukmod1-ppt13", title: "ERC", desc: "UK Module — Lesson 13", img: "/slides/ukmod1/ppt13/1.png" },
        { id: "ukmod1-ppt14", title: "Types of Sentences and Infinitives", desc: "UK Module — Lesson 14", img: "/slides/ukmod1/ppt14/1.png" },
        { id: "ukmod1-ppt15", title: "Prepositions and Interjections: Building Blocks of Language", desc: "UK Module — Lesson 15", img: "/slides/ukmod1/ppt15/1.png" },
        { id: "ukmod1-ppt16", title: "Literary devices", desc: "UK Module — Lesson 16", img: "/slides/ukmod1/ppt16/1.png" },
        { id: "ukmod1-ppt17", title: "Structure of Sentences: Components and Types", desc: "UK Module — Lesson 17", img: "/slides/ukmod1/ppt17/1.png" },
        { id: "ukmod1-ppt18", title: "Grammar Literary Devices (Deep Dive)", desc: "UK Module — Lesson 18", img: "/slides/ukmod1/ppt18/1.png" },
        { id: "ukmod1-ppt19", title: "ERC 4", desc: "UK Module — Lesson 19", img: "/slides/ukmod1/ppt19/1.png" },
        { id: "ukmod1-ppt20", title: "Idioms and phrases", desc: "UK Module — Lesson 20", img: "/slides/ukmod1/ppt20/1.png" },
        { id: "ukmod1-ppt21", title: "ERC facts vs opinions", desc: "UK Module — Lesson 21", img: "/slides/ukmod1/ppt21/1.png" },
        { id: "ukmod1-ppt22", title: "ERC 6- Practice papr 1", desc: "UK Module — Lesson 22", img: "/slides/ukmod1/ppt22/1.png" },
        { id: "ukmod1-ppt23", title: "ERC 7 practice paper 2", desc: "UK Module — Lesson 23", img: "/slides/ukmod1/ppt23/1.png" },
        { id: "ukmod1-ppt24", title: "ERC 8  Practice – Mixed Texts", desc: "UK Module — Lesson 24", img: "/slides/ukmod1/ppt24/1.png" },
        { id: "ukmod1-ppt25", title: "ERC 9 Inference texts", desc: "UK Module — Lesson 25", img: "/slides/ukmod1/ppt25/1.png" },
        { id: "ukmod1-ppt26", title: "ERC 10 Author’s Influence", desc: "UK Module — Lesson 26", img: "/slides/ukmod1/ppt26/1.png" },
      ],
    },
    {
      id: "y7mod1",
      title: "Year 7 Module 1",
      desc: "Year 7 foundational lessons covering key concepts.",
      ppts: [
        { id: "y7mod1-ppt1", title: "PPT 1", desc: "Module Introduction", img: "/slides/y7mod1/ppt1/1.png" },
        { id: "y7mod1-ppt2", title: "PPT 2", desc: "Core Concepts", img: "/slides/y7mod1/ppt2/1.png" },
        { id: "y7mod1-ppt3", title: "PPT 3", desc: "Key Learning", img: "/slides/y7mod1/ppt3/1.png" },
        { id: "y7mod1-ppt4", title: "PPT 4", desc: "Practice Session", img: "/slides/y7mod1/ppt4/1.png" },
        { id: "y7mod1-ppt5", title: "PPT 5", desc: "Advanced Topics", img: "/slides/y7mod1/ppt5/1.png" },
        { id: "y7mod1-ppt6", title: "PPT 6", desc: "Complex Problems", img: "/slides/y7mod1/ppt6/1.png" },
        { id: "y7mod1-ppt7", title: "PPT 7", desc: "Applied Learning", img: "/slides/y7mod1/ppt7/1.png" },
        { id: "y7mod1-ppt8", title: "PPT 8", desc: "Final Review", img: "/slides/y7mod1/ppt8/1.png" },
      ],
    },
    {
      id: "module1",
      title: "Year 5 - Module 1",
      desc: "Naplan modules from session 1 through 10.",
      ppts: [
        { id: "ppt1", title: "PPT 1", desc: "Reading Basics", img: "/slides/naplan/ppt1/1.png" },
        { id: "ppt2", title: "PPT 2", desc: "Comprehension Practice", img: "/slides/naplan/ppt2/1.png" },
        { id: "ppt3", title: "PPT 3", desc: "Story Analysis", img: "/slides/naplan/ppt3/1.png" },
        { id: "ppt4", title: "PPT 4", desc: "Analyzing the Story", img: "/slides/naplan/ppt4/1.png" },
        { id: "ppt5", title: "PPT 5", desc: "Story Breakdown", img: "/slides/naplan/ppt5/1.png" },
        { id: "ppt6", title: "PPT 6", desc: "Understanding the Narrative", img: "/slides/naplan/ppt6/1.png" },
        { id: "ppt7", title: "PPT 7", desc: "Exploring the Story", img: "/slides/naplan/ppt7/1.png" },
        { id: "ppt8", title: "PPT 8", desc: "Story Structure Analysis", img: "/slides/naplan/ppt8/1.png" },
        { id: "ppt9", title: "PPT 9", desc: "Dissecting the Plot", img: "/slides/naplan/ppt9/1.png" },
        { id: "ppt10", title: "PPT 10", desc: "Narrative Exploration", img: "/slides/naplan/ppt10/1.png" }


      ],
    },
    {
      id: "module2",
      title: "Year 5 - Module 2",
      desc: "Master grammar, sentence structure, and writing clarity.",
      ppts: [

        
        { id: "ppt11", title: "PPT 11", desc: "Grammar Essentials", img: "/slides/naplan/ppt11/1.png" },
        { id: "ppt12", title: "PPT 12", desc: "Sentence Structure", img: "/slides/naplan/ppt12/1.png" },
        { id: "ppt13", title: "PPT 13", desc: "Writing Clarity", img: "/slides/naplan/ppt13/1.png" },
        { id: "ppt14", title: "PPT 14", desc: "Effective Writing", img: "/slides/naplan/ppt14/1.png" },
        { id: "ppt15", title: "PPT 15", desc: "Grammar Practice", img: "/slides/naplan/ppt15/1.png" },
        { id: "ppt16", title: "PPT 16", desc: "Sentence Skills", img: "/slides/naplan/ppt16/1.png" },
        { id: "ppt17", title: "PPT 17", desc: "Writing Techniques", img: "/slides/naplan/ppt17/1.png" },
        { id: "ppt18", title: "PPT 18", desc: "Grammar Deep Dive", img: "/slides/naplan/ppt18/1.png" },
        { id: "ppt19", title: "PPT 19", desc: "Advanced Writing", img: "/slides/naplan/ppt19/1.png" },
        { id: "ppt20", title: "PPT 20", desc: "Writing Mastery", img: "/slides/naplan/ppt20/1.png" }

      ],
    },
  ];

  const currentModule = modules.find((m) => m.id === activeModule);

  // � Get folder for PPT
  const getFolderForPPT = (id: string): string => {
    // Extract folder from PPT ID pattern
    if (id.startsWith("y7mod1-")) return "y7mod1";
    if (id.startsWith("ukmod1-")) return "ukmod1";
    if (id.startsWith("demo")) return "demo";
    if (id.startsWith("y8mod1-")) return "y8mod1"; // Ready for future modules
    if (id.startsWith("y9mod1-")) return "y9mod1";
    return "naplan"; // Default folder
  };

  // �🔍 Open PPT with access check
  const openPPT = (id: string) => {
    if (!isAdmin && !allowedPPTs.includes(id)) {
      alert("🚫 Access denied — this PPT is not assigned to you.");
      return;
    }
    
    const set = getFolderForPPT(id);
    router.push(`/viewer?id=${id}&set=${set}`);
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
