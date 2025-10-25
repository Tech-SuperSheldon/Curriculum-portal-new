// app/api/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import { sign } from "jsonwebtoken";
import crypto from "crypto";

export const runtime = "nodejs"; // ✅ force Node runtime (jsonwebtoken works here)

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { user, pass } = body || {};

  const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "teacher@example.com";
  const ADMIN_PASS = process.env.ADMIN_PASS || "12345";
  const ALLOWED_USERS = (process.env.ALLOWED_USERS || ADMIN_EMAIL)
    .split(",")
    .map((e) => e.trim().toLowerCase());
  const JWT_SECRET = process.env.JWT_SECRET || "super_secure_secret";

  if (!user || !pass)
    return NextResponse.json({ error: "Missing credentials" }, { status: 400 });

  if (!ALLOWED_USERS.includes(user.toLowerCase()) || pass !== ADMIN_PASS)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const sessionId = crypto.randomBytes(12).toString("hex");
  const ua = req.headers.get("user-agent") || "";
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
   
    (req as any).ip ||
    "";

  const fingerprint = crypto
    .createHash("sha256")
    .update(ua + ip + (process.env.DEVICE_FINGERPRINT_SALT || ""))
    .digest("hex");

  const token = sign({ user, sessionId, fingerprint }, JWT_SECRET, {
    expiresIn: "2h",
  });

  const res = NextResponse.json({
    token,
    user,
    appName: "Secure Portal",
    sessionId,
  });

  // ✅ HttpOnly cookie checked by middleware (no JWT parsing there)
  res.cookies.set("auth_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 2, // 2h
  });

  return res;
}
