import { NextRequest, NextResponse } from "next/server";
import { verify } from "jsonwebtoken";

export const runtime = "nodejs";

// temporary store (replace with MongoDB later)
const assignments: Record<string, string> = {};

export async function POST(req: NextRequest) {
  try {
    const token =
      req.cookies.get("auth_token")?.value ||
      req.headers.get("authorization")?.replace("Bearer ", "").trim();

    if (!token)
      return NextResponse.json({ error: "Missing token" }, { status: 401 });

    const decoded = verify(
      token,
      process.env.JWT_SECRET || "super_secure_secret_2025_portal"
    ) as { user: string; role: string };

    const ADMIN_PASS = process.env.ADMIN_PASS || "12345";
    const { moduleId, teacherEmail, pass } = await req.json();

    if (!moduleId || !teacherEmail || !pass)
      return NextResponse.json(
        { error: "Missing moduleId, teacherEmail, or password" },
        { status: 400 }
      );

    if (decoded.role !== "admin" || pass !== ADMIN_PASS)
      return NextResponse.json(
        { error: "Only admin can assign modules" },
        { status: 403 }
      );

    assignments[moduleId] = teacherEmail.toLowerCase();
    console.log(`✅ ${decoded.user} assigned ${moduleId} → ${teacherEmail}`);

    return NextResponse.json({ success: true, assignments });
  } catch (err: any) {
    console.error("❌ [assign] Error:", err.message);
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function GET() {
  return NextResponse.json({ assignments });
}
