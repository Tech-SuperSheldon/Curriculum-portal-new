"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import GoogleAuth from "./Google";

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

  // ✅ Check login state on mount
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const savedEmail = sessionStorage.getItem("email");
    if (token && savedEmail) {
      setIsLoggedIn(true);
      setEmail(savedEmail);
    }
  }, []);

  // ✅ Secure login using /api/login endpoint
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

      const data = await res.json();

      if (!res.ok) {
        setErrMsg(data?.error || "Invalid credentials");
        setLoading(false);
        return;
      }

      // ✅ Store secure JWT token
      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("email", data.user);
      setEmail(data.user);
      setIsLoggedIn(true);

      // ✅ Redirect after token is saved
      setTimeout(() => router.replace("/viewer"), 400);
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
    router.replace("/"); // Redirect to home/login page after logout
  };

  return (
    <main
      className="relative min-h-screen flex items-center justify-center overflow-hidden
                 bg-gradient-login-radial text-white
                 before:content-[''] before:absolute before:inset-[-50%] before:bg-gradient-conic-aura
                 before:animate-spinAura before:filter before:blur-[160px] before:z-0"
    >
      <div className="z-10 w-full max-w-420px p-1rem"> {/* Adjusted z-index for content */}
        <div className="relative bg-white/8 border border-white/10 rounded-[26px] backdrop-blur-[18px] p-2.8rem sm:p-2rem text-center
                        shadow-login-card-glow animate-floatUp">
          {!isLoggedIn ? (
            <>
              <h1 className="text-3xl font-bold mb-2 text-center">
                🔐 Secure Portal
              </h1>
              <p className="text-sm text-gray-300 mb-6 text-center">
                Sign in to access your dashboard
              </p>

              <div className="flex flex-col gap-3">
                {/* Email */}
                <label className="flex flex-col text-gray-200 text-left">
                  <span>Email</span>
                  <input
                    type="email"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    placeholder="teacher@example.com"
                    className="w-full p-2 rounded-lg bg-white/10 text-white placeholder-gray-400
                               focus:ring-2 focus:ring-violet-500 focus:outline-none transition-all duration-200"
                  />
                </label>

                {/* Password */}
                <label className="flex flex-col text-gray-200 text-left">
                  <span>Password</span>
                  <div className="relative flex items-center">
                    <input
                      type={showPass ? "text" : "password"}
                      value={pass}
                      onChange={(e) => setPass(e.target.value)}
                      placeholder="••••••••"
                      className="w-full p-2 rounded-lg bg-white/10 text-white placeholder-gray-400
                                 focus:ring-2 focus:ring-violet-500 focus:outline-none pr-10 transition-all duration-200"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass(!showPass)}
                      className="absolute right-2 text-lg text-gray-400 hover:text-white transition-colors duration-200"
                      aria-label="Toggle password visibility"
                    >
                      {showPass ? "🙈" : "👁️"}
                    </button>
                  </div>
                </label>

                {errMsg && <p className="text-red-400 text-sm mt-1">{errMsg}</p>}

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

                <GoogleAuth/>

                <p className="text-sm text-gray-400 mt-2 text-center">
                  Demo login: <b>teacher@example.com</b> / <b>12345</b>
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="text-center">
                <h1 className="text-3xl font-bold mb-3">
                  Welcome Back!
                </h1>
                <p className="text-gray-300 mb-1">Logged in as</p>
                <p className="font-semibold text-cyan-300 mb-4">
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