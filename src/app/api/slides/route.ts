
You said:
import { NextRequest, NextResponse } from "next/server";
import { verify } from "jsonwebtoken";

export const runtime = "nodejs";

/** 🔧 Helper: Normalize YouTube links into embed-safe URLs */
function normalizeYouTube(url: string): string {
  try {
    if (!url.includes("youtube") && !url.includes("youtu.be")) return url;

    let videoId = "";

    if (url.includes("watch?v=")) {
      videoId = url.split("v=")[1].split("&")[0];
    } else if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1].split("?")[0];
    } else if (url.includes("/embed/")) {
      videoId = url.split("/embed/")[1].split("?")[0];
    }

    return https://www.youtube-nocookie.com/embed/${videoId};
  } catch {
    return url;
  }
}

export async function GET(req: NextRequest) {
  try {
    /** 1️⃣ Verify Token */
    const headerToken =
      req.headers.get("authorization")?.replace("Bearer ", "").trim() || "";
    const cookieToken = req.cookies.get("auth_token")?.value || "";
    const token = headerToken || cookieToken;
    if (!token) throw new Error("Missing token");

    const decoded = verify(token, process.env.JWT_SECRET || "super_secure_secret") as {
      user: string;
      iat: number;
      exp: number;
    };

    /** 2️⃣ Identify Curriculum */
    const { searchParams } = new URL(req.url);
    const curriculum = searchParams.get("curriculum")?.toLowerCase() || "ppt1";

    let slides: { type: "image" | "embed"; url: string }[] = [];

    /* 🧩 DEMO 1 — 60 slides (Wordwall embeds at 17 & 20) */
    if (curriculum === "demo1") {
      slides = Array.from({ length: 60 }, (_, i) => ({
        type: "image" as const,
        url: /slides/demo/demo1/${i + 1}.png,
      }));

      const demo1Embeds = [
        {
          index: 16,
          url: "https://wordwall.net/embed/1093ca070db946c6b61b355753dc1f98?themeId=1&templateId=2&fontStackId=0",
        },
        {
          index: 19,
          url: "https://wordwall.net/embed/944c1ac9a3c5478bbd5f52391efb495a?themeId=1&templateId=3&fontStackId=0",
        },
      ];
      demo1Embeds.forEach(({ index, url }) => {
        if (index >= 0 && index < slides.length)
          slides[index] = { type: "embed", url };
      });
    }

    /* 🧩 DEMO 2 — 45 slides (Wordwall + YouTube) */
    else if (curriculum === "demo2") {
      slides = Array.from({ length: 45 }, (_, i) => ({
        type: "image" as const,
        url: /slides/demo/demo2/${i + 1}.png,
      }));

      const demo2Embeds = [
        {
          index: 12,
          url: "https://wordwall.net/embed/8f0c42e5e9fc4f13b751b983680e6b06?themeId=4&templateId=3&fontStackId=0",
        },
        {
          index: 30,
          url: "https://www.youtube.com/watch?v=gwuqA1Ys9Zo",
        },
      ];

      demo2Embeds.forEach(({ index, url }) => {
        const finalUrl = normalizeYouTube(url);
        if (index >= 0 && index < slides.length)
          slides[index] = { type: "embed", url: finalUrl };
      });
    }

    /* 🧩 DEMO 3 — 41 slides (Wordwall + YouTube) */
    else if (curriculum === "demo3") {
      slides = Array.from({ length: 41 }, (_, i) => ({
        type: "image" as const,
        url: /slides/demo/demo3/${i + 1}.png,
      }));

      const demo3Embeds = [
        {
          index: 17, // slide 18 (Wordwall)
          url: "https://wordwall.net/embed/e1e1b336b36d452081059394734c7a6f?themeId=1&templateId=3&fontStackId=0",
        },
        {
          index: 18, // slide 19 (YouTube)
          url: "https://www.youtube.com/embed/CxCsk-rvfTQ?si=tBr4HkAp1DQROo3B",
        },
      ];

      demo3Embeds.forEach(({ index, url }) => {
        const finalUrl = normalizeYouTube(url);
        if (index >= 0 && index < slides.length)
          slides[index] = { type: "embed", url: finalUrl };
      });
    }

    /* 🧩 PPT 1 — Reading Practice */
    else if (curriculum === "ppt1") {
      slides = Array.from({ length: 47 }, (_, i) => ({
        type: "image" as const,
        url: /slides/naplan/ppt1/${i + 1}.png,
      }));

      const wordwallEmbeds = [
        {
          index: 8,
          url: "https://wordwall.net/embed/082a5489902e479aa47dc9ad2f2d2a1c?themeId=1&templateId=2&fontStackId=0",
        },
        {
          index: 12,
          url: "https://wordwall.net/embed/06cd4733511c45a1bbc62fc21322a471?themeId=1&templateId=5&fontStackId=0",
        },
        {
          index: 15,
          url: "https://wordwall.net/embed/84047d63749241efa6d2a1dea290186a?themeId=1&templateId=3&fontStackId=0",
        },
        {
          index: 17,
          url: "https://wordwall.net/embed/f89b9ee51b51410b85c01599d5acfae9?themeId=41&templateId=5&fontStackId=0",
        },
      ];
      wordwallEmbeds.forEach(({ index, url }) => {
        if (index >= 0 && index < slides.length)
          slides[index] = { type: "embed", url };
      });
    }

    /* ✏️ PPT 2 — Grammar & Writing */
    else if (curriculum === "ppt2") {
      slides = [
        { type: "image", url: "/slides/naplan/ppt2/1.png" },
        { type: "image", url: "/slides/naplan/ppt2/2.png" },
        {
          type: "embed",
          url: "https://wordwall.net/embed/f89b9ee51b51410b85c01599d5acfae9?themeId=1&templateId=2",
        },
        { type: "image", url: "/slides/naplan/ppt2/3.png" },
      ];
    }

    /* 🔢 PPT 3 — Numeracy / Logical Thinking */
    else if (curriculum === "ppt3") {
      slides = [
        { type: "image", url: "/slides/naplan/ppt3/1.png" },
        { type: "image", url: "/slides/naplan/ppt3/2.png" },
        {
          type: "embed",
          url: "https://wordwall.net/embed/3adf637e531b4b66a76fd99111e6d27b?themeId=1&templateId=5",
        },
        { type: "image", url: "/slides/naplan/ppt3/3.png" },
      ];
    }

    /* 🧠 PPT 4 — Vocabulary / Spelling */
    else if (curriculum === "ppt4") {
      slides = [
        { type: "image", url: "/slides/naplan/ppt4/1.png" },
        { type: "image", url: "/slides/naplan/ppt4/2.png" },
        {
          type: "embed",
          url: "https://wordwall.net/embed/92b3ed0a334c49f187cf7f9915aa23e2?themeId=1&templateId=2",
        },
      ];
    }

    /* 📘 PPT 5 — Comprehension Practice */
    else if (curriculum === "ppt5") {
      slides = [
        { type: "image", url: "/slides/naplan/ppt5/1.png" },
        { type: "image", url: "/slides/naplan/ppt5/2.png" },
        {
          type: "embed",
          url: "https://wordwall.net/embed/63069e26b0b9481d96f2352a6cbe70c7?themeId=1&templateId=2",
        },
      ];
    }

    /* 🧮 PPT 6 — Mixed Mock Test */
    else if (curriculum === "ppt6") {
      slides = [
        { type: "image", url: "/slides/naplan/ppt6/1.png" },
        { type: "image", url: "/slides/naplan/ppt6/2.png" },
        { type: "image", url: "/slides/naplan/ppt6/3.png" },
        {
          type: "embed",
          url: "https://wordwall.net/embed/8c1b57c276d841f582fa5674ebdf7347?themeId=1&templateId=5",
        },
      ];
    }

    /* Default fallback */
    else {
      slides = [{ type: "image", url: /slides/naplan/${curriculum}/1.png }];
    }

    /** 4️⃣ Secure JSON Response */
    return NextResponse.json({
      slides,
      total: slides.length,
      curriculum,
      user: decoded.user,
      appName: "Super Sheldon Secure Portal",
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    console.error("[slides] route error:", err.message || err);
    return NextResponse.json(
      { error: "Unauthorized or invalid token" },
      { status: 401 }
    );
  }
} 
