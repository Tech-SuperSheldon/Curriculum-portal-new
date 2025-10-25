"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface LoginFormProps {
  error?: string;
}

export default function LoginForm({ error }: LoginFormProps) {
  const router = useRouter();
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [errMsg, setErrMsg] = useState(error || "");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const savedEmail = sessionStorage.getItem("email");
    if (token && savedEmail) {
      setIsLoggedIn(true);
      setEmail(savedEmail);
    }
  }, []);

  const handleLogin = async () => {
    if (!user || !pass) {
      setErrMsg("Please enter both email and password.");
      return;
    }

    setLoading(true);
    setErrMsg("");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user, pass }),
      });

      const data: { token?: string; user?: string; error?: string } = await res.json();

      if (!res.ok) {
        setErrMsg(data?.error || "Invalid credentials");
        setLoading(false);
        return;
      }

      sessionStorage.setItem("token", data.token || "");
      sessionStorage.setItem("email", data.user || "");
      setEmail(data.user || "");
      setIsLoggedIn(true);

      setTimeout(() => router.replace("/dashboard"), 400);
    } catch (err) {
      console.error(err);
      setErrMsg("Network error");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("email");
    document.cookie = "auth_token=; Max-Age=0; path=/;";
    setIsLoggedIn(false);
    setEmail("");
    router.replace("/");
  };

  return (
    <main
      className="relative min-h-screen flex items-center justify-center overflow-hidden 
      bg-slate-900 text-white 
       before:opacity-30 before:animate-spin before:blur-[160px] before:z-0"
    >
      <div className="z-10 w-full max-w-[420px] sm:max-w-[400px] md:max-w-[450px] lg:max-w-[480px] p-4 sm:p-6 md:p-8">
        <div
          className="relative bg-white/10 border border-white/10 rounded-[26px]
          backdrop-blur-[18px] p-6 sm:p-8 text-center 
          shadow-lg shadow-violet-500/10 transition-all duration-300
          hover:shadow-violet-500/20"
        >
          {!isLoggedIn ? (
            <>
              {/* 🔐 Header */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-center">
                🔐 Secure Portal
              </h1>
              <p className="text-xs sm:text-sm text-gray-300 mb-6 text-center">
                Sign in to access your dashboard
              </p>

              {/* 📩 Input Fields */}
              <div className="flex flex-col gap-4 text-left">
                {/* Email */}
                <label className="text-gray-200 text-sm sm:text-base">
                  Email
                  <input
                    type="email"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    placeholder="teacher@example.com"
                    className="w-full mt-1 p-2 sm:p-2.5 rounded-lg bg-white/10 text-white placeholder-gray-400
                    focus:ring-2 focus:ring-violet-500 focus:outline-none transition-all duration-200"
                  />
                </label>

                {/* Password */}
                <label className="text-gray-200 text-sm sm:text-base">
                  Password
                  <div className="relative flex items-center mt-1">
                    <input
                      type={showPass ? "text" : "password"}
                      value={pass}
                      onChange={(e) => setPass(e.target.value)}
                      placeholder="••••••••"
                      className="w-full p-2 sm:p-2.5 rounded-lg bg-white/10 text-white placeholder-gray-400
                      focus:ring-2 focus:ring-violet-500 focus:outline-none pr-10 transition-all duration-200"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass(!showPass)}
                      className="absolute right-3 text-lg text-gray-400 hover:text-white transition"
                    >
                      {showPass ? "🙈" : "👁️"}
                    </button>
                  </div>
                </label>

                {/* Error Message */}
                {errMsg && (
                  <p className="text-red-400 text-xs sm:text-sm text-center mt-1">{errMsg}</p>
                )}

                {/* Login Button */}
                <button
                  onClick={handleLogin}
                  disabled={loading}
                  className={`w-full py-2 mt-2 rounded-lg bg-gradient-to-r from-cyan-500 to-violet-600
                    hover:from-cyan-600 hover:to-violet-700 text-white font-semibold
                    transition-all duration-200 ease-in-out
                    ${
                      loading
                        ? "opacity-60 cursor-not-allowed"
                        : "shadow-lg shadow-violet-500/30 hover:shadow-xl hover:shadow-violet-500/40"
                    }`}
                >
                  {loading ? "Logging in..." : "Login"}
                </button>

                {/* Demo Info */}
             
              </div>
            </>
          ) : (
            <>
              {/* ✅ Logged In UI */}
              <div className="text-center">
                <h1 className="text-2xl sm:text-3xl font-bold mb-3">Welcome Back!</h1>
                <p className="text-gray-300 mb-1 text-sm sm:text-base">Logged in as</p>
                <p className="font-semibold text-cyan-300 mb-4 text-sm sm:text-base">
                  {email}
                </p>

                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => router.replace("/dashboard")}
                    className="w-full py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600
                    hover:from-emerald-600 hover:to-teal-700 text-white font-semibold
                    transition-all duration-200 ease-in-out
                    shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40"
                  >
                    Go to Dashboard
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full py-2 rounded-lg bg-gradient-to-r from-rose-500 to-red-600
                    hover:from-rose-600 hover:to-red-700 text-white font-semibold
                    transition-all duration-200 ease-in-out
                    shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
