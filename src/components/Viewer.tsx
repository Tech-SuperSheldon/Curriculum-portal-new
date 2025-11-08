"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert, Lock, ArrowLeft } from "lucide-react";

interface Slide {
  type: "image" | "embed";
  url: string;
}

interface ViewerProps {
  slides: Slide[];
  user: string;
  appName: string;
  watermarkText?: string;
  set?: string; // Add set/folder prop
  onLogout: () => void;
}

export default function Viewer({
  slides,
  user,
  appName,
  watermarkText = "",
  set = "naplan",
  onLogout,
}: ViewerProps) {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [wmPos, setWmPos] = useState({ top: "50%", left: "50%" });
  const [showWarning, setShowWarning] = useState(false);

  // 🌀 Moving watermark
  useEffect(() => {
    const moveRandom = () => {
      const randTop = `${Math.floor(Math.random() * 80) + 10}%`;
      const randLeft = `${Math.floor(Math.random() * 80) + 10}%`;
      setWmPos({ top: randTop, left: randLeft });
    };
    moveRandom();
    const iv = setInterval(moveRandom, 1000);
    return () => clearInterval(iv);
  }, []);

  // 🔒 Key / mouse security
  useEffect(() => {
    const blockAll = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
      return false;
    };

    const keyHandler = (e: KeyboardEvent) => {
      const allowed = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "F11"];
      if (allowed.includes(e.key)) {
        if (e.key === "ArrowRight" || e.key === "ArrowDown") next();
        if (e.key === "ArrowLeft" || e.key === "ArrowUp") prev();
        return;
      }
      e.preventDefault();
      setShowWarning(true);
    };

    const visBlock = () => {
      if (document.hidden) setShowWarning(true);
    };

    window.addEventListener("keydown", keyHandler, true);
    document.addEventListener("contextmenu", blockAll, true);
    document.addEventListener("dragstart", blockAll, true);
    document.addEventListener("visibilitychange", visBlock, true);

    return () => {
      window.removeEventListener("keydown", keyHandler, true);
      document.removeEventListener("contextmenu", blockAll, true);
      document.removeEventListener("dragstart", blockAll, true);
      document.removeEventListener("visibilitychange", visBlock, true);
    };
  }, []);

  // 🧩 DevTools detection
  useEffect(() => {
    const detect = () => {
      const t0 = performance.now();
      // eslint-disable-next-line no-debugger
      debugger;
      const t1 = performance.now();
      if (t1 - t0 > 100) setShowWarning(true);
    };
    const interval = setInterval(detect, 2000);
    return () => clearInterval(interval);
  }, []);

  // 🖥 Fullscreen state
  useEffect(() => {
    const onChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  // 🧭 Navigation + Zoom
  const next = () => setIndex((p) => Math.min(slides.length - 1, p + 1));
  const prev = () => setIndex((p) => Math.max(0, p - 1));
  const zoomIn = () => setZoom((z) => Math.min(2.5, z + 0.1));
  const zoomOut = () => setZoom((z) => Math.max(0.5, z - 0.1));
  const resetZoom = () => setZoom(1);

  const toggleFullscreen = () => {
    const elem = document.documentElement as any;
    if (!document.fullscreenElement) elem.requestFullscreen?.();
    else document.exitFullscreen?.();
  };

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    document.cookie = "auth_token=; Max-Age=0; path=/; SameSite=Strict";
    onLogout();
  };

  /** ⚠️ Warning Overlay */
  const WarningOverlay = () => (
    <AnimatePresence>
      {showWarning && (
        <motion.div
          className="fixed inset-0 flex flex-col items-center justify-center bg-slate-900/90 backdrop-blur-3xl text-white z-[9999] px-6"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 1 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-cyan-400/10 to-emerald-400/10 blur-[180px]" />
          <div className="relative bg-gradient-to-br from-slate-800/90 to-slate-700/70 border border-cyan-400/30 rounded-3xl p-6 sm:p-10 text-center backdrop-blur-xl max-w-xs sm:max-w-md w-full mx-auto">
            <div className="flex justify-center mb-5">
              <div className="relative">
                <motion.div
                  className="absolute inset-0 rounded-full bg-cyan-400/15 blur-2xl"
                  animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.6, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <ShieldAlert className="w-12 sm:w-16 h-12 sm:h-16 text-cyan-400" />
              </div>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-cyan-300 mb-2 tracking-wide">
              Secure Classroom Mode
            </h2>
            <p className="text-gray-200 text-sm leading-relaxed mb-6">
              We’ve paused your session to keep your environment secure.
            </p>
            <motion.button
              onClick={() => setShowWarning(false)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="px-6 py-3 w-full sm:w-auto rounded-md font-semibold text-white bg-gradient-to-r from-cyan-600 via-sky-500 to-emerald-400 shadow-lg"
            >
              <Lock className="inline-block w-4 h-4 mr-2" />
              Resume Lesson
            </motion.button>
          </div>
          <div className="mt-6 text-xs text-gray-400 font-mono tracking-widest flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-cyan-400" />
            Super Sheldon Secure Classroom
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  const currentSlide = slides[index];

  return (
    <div className="relative flex flex-col min-h-screen bg-gradient-to-b from-slate-900 to-slate-950 text-white">
      <WarningOverlay />

      {/* 🔹 Header */}
      <header className="flex flex-wrap gap-2 justify-between items-center px-4 sm:px-6 py-3 border-b border-white/10 bg-slate-800/60 backdrop-blur-md z-10">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-300 hover:text-white bg-white/10 px-3 py-1 rounded-md hover:bg-white/20 transition text-sm sm:text-base"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <h1 className="text-sm sm:text-lg font-semibold text-cyan-400 text-center flex-1">
          {appName}
        </h1>

        <div className="flex flex-wrap justify-center sm:justify-end gap-2 sm:gap-3">
          <button onClick={prev} disabled={index === 0} className="px-2 sm:px-3 py-1 bg-white/10 rounded-md hover:bg-white/20 transition disabled:opacity-30 text-xs sm:text-sm">
            ◀ Prev
          </button>
          <span className="text-xs sm:text-sm text-gray-300">
            {index + 1} / {slides.length}
          </span>
          <button onClick={next} disabled={index === slides.length - 1} className="px-2 sm:px-3 py-1 bg-white/10 rounded-md hover:bg-white/20 transition disabled:opacity-30 text-xs sm:text-sm">
            Next ▶
          </button>
          <button onClick={zoomOut} className="px-2 py-1 bg-white/10 rounded-md hover:bg-white/20 transition text-xs sm:text-sm">➖</button>
          <button onClick={zoomIn} className="px-2 py-1 bg-white/10 rounded-md hover:bg-white/20 transition text-xs sm:text-sm">➕</button>
          <button onClick={resetZoom} className="px-2 py-1 bg-white/10 rounded-md hover:bg-white/20 transition text-xs sm:text-sm">🔁</button>
          <button onClick={toggleFullscreen} className="px-3 py-1 bg-cyan-500/20 border border-cyan-400/30 rounded-md hover:bg-cyan-500/30 transition text-xs sm:text-sm">
            {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
          </button>
          <button onClick={handleLogout} className="px-3 py-1 bg-red-500/20 border border-red-400/30 rounded-md hover:bg-red-500/30 transition text-xs sm:text-sm">
            Logout
          </button>
        </div>
      </header>

      {/* 🔹 Slides */}
      <main className="flex-1 flex justify-center items-center overflow-hidden p-2 sm:p-6 bg-slate-950">
        {slides.length ? (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="relative w-full h-full flex justify-center items-center"
          >
            {currentSlide.type === "image" ? (
              <>
                <div className="relative w-full h-[65vh] sm:h-[80vh] max-w-6xl mx-auto">
                  <Image
                    src={currentSlide.url}
                    alt={`Slide ${index + 1}`}
                    fill
                    sizes="100vw"
                    className="object-contain rounded-2xl border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.7)]"
                    draggable={false}
                    style={{ transform: `scale(${zoom})` }}
                  />
                  <div
                    className="absolute text-xs sm:text-sm font-semibold text-red-500/80 pointer-events-none select-none"
                    style={{ top: wmPos.top, left: wmPos.left }}
                  >
                    {watermarkText ||
                      `${user} • ${appName} • ${set} • ${new Date().toLocaleString()}`}
                  </div>
                </div>
              </>
            ) : (
              <div className="relative w-[95%] sm:w-[90%] max-w-5xl aspect-video rounded-2xl overflow-hidden border border-white/10">
                <iframe
                  src={currentSlide.url}
                  className="absolute top-0 left-0 w-full h-full rounded-2xl"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-presentation"
                />
              </div>
            )}
          </motion.div>
        ) : (
          <p className="text-gray-400 text-base sm:text-lg">No slides available</p>
        )}
      </main>

      {/* 🔹 Footer */}
      <footer className="flex flex-wrap justify-between items-center text-gray-400 text-[10px] sm:text-xs px-4 sm:px-6 py-2 border-t border-white/10">
        <span className="truncate max-w-[40%] sm:max-w-none">{appName}</span>
        <span className="truncate max-w-[55%] sm:max-w-none text-right">
          {user} | {new Date().toLocaleString()}
        </span>
      </footer>
    </div>
  );
}
