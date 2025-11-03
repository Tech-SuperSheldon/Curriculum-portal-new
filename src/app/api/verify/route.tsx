import { NextRequest, NextResponse } from "next/server";
import { OAuth2Client } from "google-auth-library";

export const runtime = "nodejs";

const client = new OAuth2Client(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization") || "";
    const token = authHeader.replace(/^Bearer\s+/i, "").trim();
    if (!token) {
      return NextResponse.json(
        { valid: false, message: "Missing Google token" },
        { status: 401 }
      );
    }

    // ✅ Verify Google ID token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload || !payload.email) {
      return NextResponse.json(
        { valid: false, message: "Invalid Google token" },
        { status: 401 }
      );
    }

    // ✅ Success
    return NextResponse.json({
      valid: true,
      user: payload.email,
      name: payload.name,
      picture: payload.picture,
      appName: "Super Sheldon Secure Portal",
    });
  } catch (error: any) {
    console.error("[verify] Google token verification failed:", error.message);
    return NextResponse.json(
      { valid: false, message: "Unauthorized or invalid Google token" },
      { status: 401 }
    );
  }
}
