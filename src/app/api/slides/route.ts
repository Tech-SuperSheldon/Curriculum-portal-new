import { NextRequest, NextResponse } from "next/server";

/** 🔧 Normalize YouTube URLs for embedding */
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

    /** 🧩 DEMO 1 — 60 slides (Wordwall embeds) */
    if (curriculum === "demo1") {
      slides = Array.from({ length: 60 }, (_, i) => ({
        type: "image" as const,
        url: `/slides/demo/demo1/${i + 1}.png`,
      }));
      const embeds = [
        { index: 16, url: "https://wordwall.net/embed/1093ca070db946c6b61b355753dc1f98" },
        { index: 19, url: "https://wordwall.net/embed/944c1ac9a3c5478bbd5f52391efb495a" },
      ];
      embeds.forEach(({ index, url }) => (slides[index] = { type: "embed", url }));
    }

    /** 🧩 DEMO 2 — 45 slides (Wordwall + YouTube) */
    else if (curriculum === "demo2") {
      slides = Array.from({ length: 45 }, (_, i) => ({
        type: "image" as const,
        url: `/slides/demo/demo2/${i + 1}.png`,
      }));
      const embeds = [
        { index: 12, url: "https://wordwall.net/embed/8f0c42e5e9fc4f13b751b983680e6b06" },
        { index: 30, url: "https://www.youtube.com/watch?v=gwuqA1Ys9Zo" },
      ];
      embeds.forEach(({ index, url }) => {
        slides[index] = { type: "embed", url: normalizeYouTube(url) };
      });
    }

    /** 🧩 DEMO 3 — 41 slides (Wordwall + YouTube) */
    else if (curriculum === "demo3") {
      slides = Array.from({ length: 41 }, (_, i) => ({
        type: "image" as const,
        url: `/slides/demo/demo3/${i + 1}.png`,
      }));
      const embeds = [
        { index: 17, url: "https://wordwall.net/embed/e1e1b336b36d452081059394734c7a6f" },
        { index: 18, url: "https://www.youtube.com/embed/CxCsk-rvfTQ" },
      ];
      embeds.forEach(({ index, url }) => {
        slides[index] = { type: "embed", url: normalizeYouTube(url) };
      });
    }

    /** 🧩 PPT 1 — Reading Practice */
    else if (curriculum === "ppt1") {
      slides = Array.from({ length: 47 }, (_, i) => ({
        type: "image" as const,
        url: `/slides/naplan/ppt1/${i + 1}.png`,
      }));
      const wordwallEmbeds = [
        { index: 8, url: "https://wordwall.net/embed/082a5489902e479aa47dc9ad2f2d2a1c" },
        { index: 12, url: "https://wordwall.net/embed/06cd4733511c45a1bbc62fc21322a471" },
        { index: 15, url: "https://wordwall.net/embed/84047d63749241efa6d2a1dea290186a" },
        { index: 17, url: "https://wordwall.net/embed/f89b9ee51b51410b85c01599d5acfae9" },
      ];
      wordwallEmbeds.forEach(({ index, url }) => (slides[index] = { type: "embed", url }));
    }

    /** 📘 PPT 2 — Grammar & Writing */
    else if (curriculum === "ppt2") {
      slides = [
        { type: "image", url: "/slides/naplan/ppt2/1.png" },
        { type: "image", url: "/slides/naplan/ppt2/2.png" },
        { type: "embed", url: "https://wordwall.net/embed/f89b9ee51b51410b85c01599d5acfae9" },
        { type: "image", url: "/slides/naplan/ppt2/3.png" },
      ];
    }

    /** 🧮 PPT 3 — Numeracy */
    else if (curriculum === "ppt3") {
      slides = [
        { type: "image", url: "/slides/naplan/ppt3/1.png" },
        { type: "image", url: "/slides/naplan/ppt3/2.png" },
        { type: "embed", url: "https://wordwall.net/embed/3adf637e531b4b66a76fd99111e6d27b" },
        { type: "image", url: "/slides/naplan/ppt3/3.png" },
      ];
    }

    /** 🧠 PPT 4 — Vocabulary */
    else if (curriculum === "ppt4") {
      slides = [
        { type: "image", url: "/slides/naplan/ppt4/1.png" },
        { type: "image", url: "/slides/naplan/ppt4/2.png" },
        { type: "embed", url: "https://wordwall.net/embed/92b3ed0a334c49f187cf7f9915aa23e2" },
      ];
    }

    /** 🧩 Fallback */
    else {
      slides = [{ type: "image", url: "/slides/notfound.png" }];
    }

    return NextResponse.json({
      slides,
      total: slides.length,
      curriculum,
      appName: "Super Sheldon Secure Portal",
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    console.error("[slides] error:", err.message);
    return NextResponse.json(
      { error: "Server error while fetching slides" },
      { status: 500 }
    );
  }
}
