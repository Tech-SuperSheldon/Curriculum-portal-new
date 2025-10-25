import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const token = req.headers.get("authorization")?.replace("Bearer ", "");
  if (token === "securetoken123")
    return Response.json({
      valid: true,
      user: "teacher@example.com",
      appName: "Secure Portal",
    });
  return Response.json({ valid: false });
}
