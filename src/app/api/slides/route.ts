import { NextRequest, NextResponse } from "next/server";

/** Normalize YouTube links */
function normalizeYouTube(url: string): string {
  try {
    if (!url.includes("youtube") && !url.includes("youtu.be")) return url;
    let videoId = "";
    if (url.includes("watch?v=")) videoId = url.split("v=")[1].split("&")[0];
    else if (url.includes("youtu.be/")) videoId = url.split("youtu.be/")[1].split("?")[0];
    else if (url.includes("/embed/")) videoId = url.split("/embed/")[1].split("?")[0];
    return `https://www.youtube-nocookie.com/embed/${videoId}`;
  } catch {
    return url;
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const curriculum = searchParams.get("curriculum")?.toLowerCase() || "ppt1";
    let slides: { type: "image" | "embed"; url: string }[] = [];

    // 🧩 Example: NAPLAN PPT 1
    if (curriculum === "ppt1") {
      slides = Array.from({ length: 47 }, (_, i) => ({
        type: "image" as const,
        url: `/slides/naplan/ppt1/${i + 1}.png`,
      }));

      const wordwallEmbeds = [
        { index: 8, url: "https://wordwall.net/embed/082a5489902e479aa47dc9ad2f2d2a1c" },
        { index: 12, url: "https://wordwall.net/embed/06cd4733511c45a1bbc62fc21322a471" },
      ];

      wordwallEmbeds.forEach(({ index, url }) => {
        if (index < slides.length) slides[index] = { type: "embed", url };
      });
    }

    // 🧠 Example: Demo 1
    else if (curriculum === "demo1") {
      slides = Array.from({ length: 60 }, (_, i) => ({
        type: "image" as const,
        url: `/slides/demo/demo1/${i + 1}.png`,
      }));
      slides[16] = { type: "embed", url: "https://wordwall.net/embed/1093ca070db946c6b61b355753dc1f98" };
    }

    return NextResponse.json({
      slides,
      total: slides.length,
      curriculum,
      appName: "Super Sheldon Secure Portal",
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
