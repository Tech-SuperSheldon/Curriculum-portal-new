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
  // allow selecting a different slides folder (default 'naplan')
  const setFolder = (searchParams.get("set") || "naplan").toLowerCase();

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






    /** 🧩 Year 7 Module 1 PPTs */
else if (curriculum === "y7mod1-ppt1") {
  slides = Array.from({ length: 50 }, (_, i) => ({
    type: "image" as const,
    url: `/slides/${setFolder}/ppt1/${i + 1}.png`,
  }));
  const wordwallEmbeds = [
    { index: 4, url: "https://wordwall.net/embed/placeholder1" },
    { index: 13, url: "https://wordwall.net/embed/placeholder2" },



  ];
  wordwallEmbeds.forEach(({ index, url }) => (slides[index] = { type: "embed", url }));
}

else if (curriculum === "y7mod1-ppt2") {
  slides = Array.from({ length: 49 }, (_, i) => ({
    type: "image" as const,
    url: `/slides/${setFolder}/ppt2/${i + 1}.png`,
  }));
  const wordwallEmbeds = [
    { index: 7, url: "https://wordwall.net/embed/placeholder6" },
    { index: 12, url: "https://wordwall.net/embed/placeholder7" },


  ];
  wordwallEmbeds.forEach(({ index, url }) => (slides[index] = { type: "embed", url }));
}

else if (curriculum === "y7mod1-ppt3") {
  slides = Array.from({ length: 45 }, (_, i) => ({
    type: "image" as const,
    url: `/slides/${setFolder}/ppt3/${i + 1}.png`,
  }));
  const wordwallEmbeds = [
    { index: 4, url: "https://wordwall.net/embed/placeholder11" },
    { index: 11, url: "https://wordwall.net/embed/placeholder12" },
    { index: 14, url: "https://wordwall.net/embed/placeholder13" },
    { index: 16, url: "https://wordwall.net/embed/placeholder14" },
    { index: 37, url: "https://wordwall.net/embed/placeholder15" },
  ];
  wordwallEmbeds.forEach(({ index, url }) => (slides[index] = { type: "embed", url }));
}

else if (curriculum === "y7mod1-ppt4") {
  slides = Array.from({ length: 48 }, (_, i) => ({
    type: "image" as const,
    url: `/slides/${setFolder}/ppt4/${i + 1}.png`,
  }));
  const wordwallEmbeds = [
    { index: 4, url: "https://wordwall.net/embed/placeholder16" },
    { index: 8, url: "https://wordwall.net/embed/placeholder17" },
    { index: 12, url: "https://wordwall.net/embed/placeholder18" },
    { index: 15, url: "https://wordwall.net/embed/placeholder19" },
    { index: 17, url: "https://wordwall.net/embed/placeholder20" },
    { index: 41, url: "https://wordwall.net/embed/placeholder20" },
  ];
  wordwallEmbeds.forEach(({ index, url }) => (slides[index] = { type: "embed", url }));
}

else if (curriculum === "y7mod1-ppt5") {
  slides = Array.from({ length: 49 }, (_, i) => ({
    type: "image" as const,
    url: `/slides/${setFolder}/ppt5/${i + 1}.png`,
  }));
  const wordwallEmbeds = [
    { index: 12, url: "https://wordwall.net/embed/placeholder21" },

  ];
  wordwallEmbeds.forEach(({ index, url }) => (slides[index] = { type: "embed", url }));
}

else if (curriculum === "y7mod1-ppt6") {
  slides = Array.from({ length: 51 }, (_, i) => ({
    type: "image" as const,
    url: `/slides/${setFolder}/ppt6/${i + 1}.png`,
  }));
  const wordwallEmbeds = [
    { index: 6, url: "https://wordwall.net/embed/placeholder26" },


  ];
  wordwallEmbeds.forEach(({ index, url }) => (slides[index] = { type: "embed", url }));
}

else if (curriculum === "y7mod1-ppt7") {
  slides = Array.from({ length: 48 }, (_, i) => ({
    type: "image" as const,
    url: `/slides/${setFolder}/ppt7/${i + 1}.png`,
  }));
  const wordwallEmbeds = [
    { index: 3, url: "https://wordwall.net/embed/placeholder31" },
    { index: 7, url: "https://wordwall.net/embed/placeholder32" },
    { index: 14, url: "https://wordwall.net/embed/placeholder33" },

  ];
  wordwallEmbeds.forEach(({ index, url }) => (slides[index] = { type: "embed", url }));
}

else if (curriculum === "y7mod1-ppt8") {
  slides = Array.from({ length: 47 }, (_, i) => ({
    type: "image" as const,
    url: `/slides/${setFolder}/ppt8/${i + 1}.png`,
  }));
  const wordwallEmbeds = [
    { index: 7, url: "https://wordwall.net/embed/placeholder36" },
    { index: 12, url: "https://wordwall.net/embed/placeholder37" },

  ];
  wordwallEmbeds.forEach(({ index, url }) => (slides[index] = { type: "embed", url }));
}

/** 🧩 UK Module 1 — PPTs 1..26 (each: 40 images + 5 Wordwall embeds) */
else if (curriculum === "ukmod1-ppt1") {
  slides = Array.from({ length: 40 }, (_, i) => ({ type: "image" as const, url: `/slides/${setFolder}/ppt1/${i + 1}.png` }));
  const wordwallEmbeds = [
    { index: 4, url: "https://wordwall.net/embed/ukmod1-ppt1-1" },
    { index: 10, url: "https://wordwall.net/embed/ukmod1-ppt1-2" },
    { index: 16, url: "https://wordwall.net/embed/ukmod1-ppt1-3" },
    { index: 22, url: "https://wordwall.net/embed/ukmod1-ppt1-4" },
    { index: 28, url: "https://wordwall.net/embed/ukmod1-ppt1-5" },
  ];
  wordwallEmbeds.forEach(({ index, url }) => (slides[index] = { type: "embed", url }));
}
else if (curriculum === "ukmod1-ppt2") {
  slides = Array.from({ length: 40 }, (_, i) => ({ type: "image" as const, url: `/slides/${setFolder}/ppt2/${i + 1}.png` }));
  const wordwallEmbeds = [
    { index: 5, url: "https://wordwall.net/embed/ukmod1-ppt2-1" },
    { index: 11, url: "https://wordwall.net/embed/ukmod1-ppt2-2" },
    { index: 17, url: "https://wordwall.net/embed/ukmod1-ppt2-3" },
    { index: 23, url: "https://wordwall.net/embed/ukmod1-ppt2-4" },
    { index: 29, url: "https://wordwall.net/embed/ukmod1-ppt2-5" },
  ];
  wordwallEmbeds.forEach(({ index, url }) => (slides[index] = { type: "embed", url }));
}
else if (curriculum === "ukmod1-ppt3") {
  slides = Array.from({ length: 40 }, (_, i) => ({ type: "image" as const, url: `/slides/${setFolder}/ppt3/${i + 1}.png` }));
  const wordwallEmbeds = [
    { index: 6, url: "https://wordwall.net/embed/ukmod1-ppt3-1" },
    { index: 12, url: "https://wordwall.net/embed/ukmod1-ppt3-2" },
    { index: 18, url: "https://wordwall.net/embed/ukmod1-ppt3-3" },
    { index: 24, url: "https://wordwall.net/embed/ukmod1-ppt3-4" },
    { index: 30, url: "https://wordwall.net/embed/ukmod1-ppt3-5" },
  ];
  wordwallEmbeds.forEach(({ index, url }) => (slides[index] = { type: "embed", url }));
}
else if (curriculum === "ukmod1-ppt4") {
  slides = Array.from({ length: 40 }, (_, i) => ({ type: "image" as const, url: `/slides/${setFolder}/ppt4/${i + 1}.png` }));
  const wordwallEmbeds = [
    { index: 7, url: "https://wordwall.net/embed/ukmod1-ppt4-1" },
    { index: 13, url: "https://wordwall.net/embed/ukmod1-ppt4-2" },
    { index: 19, url: "https://wordwall.net/embed/ukmod1-ppt4-3" },
    { index: 25, url: "https://wordwall.net/embed/ukmod1-ppt4-4" },
    { index: 31, url: "https://wordwall.net/embed/ukmod1-ppt4-5" },
  ];
  wordwallEmbeds.forEach(({ index, url }) => (slides[index] = { type: "embed", url }));
}
else if (curriculum === "ukmod1-ppt5") {
  slides = Array.from({ length: 40 }, (_, i) => ({ type: "image" as const, url: `/slides/${setFolder}/ppt5/${i + 1}.png` }));
  const wordwallEmbeds = [
    { index: 4, url: "https://wordwall.net/embed/ukmod1-ppt5-1" },
    { index: 10, url: "https://wordwall.net/embed/ukmod1-ppt5-2" },
    { index: 16, url: "https://wordwall.net/embed/ukmod1-ppt5-3" },
    { index: 22, url: "https://wordwall.net/embed/ukmod1-ppt5-4" },
    { index: 28, url: "https://wordwall.net/embed/ukmod1-ppt5-5" },
  ];
  wordwallEmbeds.forEach(({ index, url }) => (slides[index] = { type: "embed", url }));
}
else if (curriculum === "ukmod1-ppt6") {
  slides = Array.from({ length: 40 }, (_, i) => ({ type: "image" as const, url: `/slides/${setFolder}/ppt6/${i + 1}.png` }));
  const wordwallEmbeds = [
    { index: 5, url: "https://wordwall.net/embed/ukmod1-ppt6-1" },
    { index: 11, url: "https://wordwall.net/embed/ukmod1-ppt6-2" },
    { index: 17, url: "https://wordwall.net/embed/ukmod1-ppt6-3" },
    { index: 23, url: "https://wordwall.net/embed/ukmod1-ppt6-4" },
    { index: 29, url: "https://wordwall.net/embed/ukmod1-ppt6-5" },
  ];
  wordwallEmbeds.forEach(({ index, url }) => (slides[index] = { type: "embed", url }));
}
else if (curriculum === "ukmod1-ppt7") {
  slides = Array.from({ length: 40 }, (_, i) => ({ type: "image" as const, url: `/slides/${setFolder}/ppt7/${i + 1}.png` }));
  const wordwallEmbeds = [
    { index: 6, url: "https://wordwall.net/embed/ukmod1-ppt7-1" },
    { index: 12, url: "https://wordwall.net/embed/ukmod1-ppt7-2" },
    { index: 18, url: "https://wordwall.net/embed/ukmod1-ppt7-3" },
    { index: 24, url: "https://wordwall.net/embed/ukmod1-ppt7-4" },
    { index: 30, url: "https://wordwall.net/embed/ukmod1-ppt7-5" },
  ];
  wordwallEmbeds.forEach(({ index, url }) => (slides[index] = { type: "embed", url }));
}
else if (curriculum === "ukmod1-ppt8") {
  slides = Array.from({ length: 40 }, (_, i) => ({ type: "image" as const, url: `/slides/${setFolder}/ppt8/${i + 1}.png` }));
  const wordwallEmbeds = [
    { index: 7, url: "https://wordwall.net/embed/ukmod1-ppt8-1" },
    { index: 13, url: "https://wordwall.net/embed/ukmod1-ppt8-2" },
    { index: 19, url: "https://wordwall.net/embed/ukmod1-ppt8-3" },
    { index: 25, url: "https://wordwall.net/embed/ukmod1-ppt8-4" },
    { index: 31, url: "https://wordwall.net/embed/ukmod1-ppt8-5" },
  ];
  wordwallEmbeds.forEach(({ index, url }) => (slides[index] = { type: "embed", url }));
}
else if (curriculum === "ukmod1-ppt9") {
  slides = Array.from({ length: 40 }, (_, i) => ({ type: "image" as const, url: `/slides/${setFolder}/ppt9/${i + 1}.png` }));
  const wordwallEmbeds = [
    { index: 4, url: "https://wordwall.net/embed/ukmod1-ppt9-1" },
    { index: 10, url: "https://wordwall.net/embed/ukmod1-ppt9-2" },
    { index: 16, url: "https://wordwall.net/embed/ukmod1-ppt9-3" },
    { index: 22, url: "https://wordwall.net/embed/ukmod1-ppt9-4" },
    { index: 28, url: "https://wordwall.net/embed/ukmod1-ppt9-5" },
  ];
  wordwallEmbeds.forEach(({ index, url }) => (slides[index] = { type: "embed", url }));
}
else if (curriculum === "ukmod1-ppt10") {
  slides = Array.from({ length: 40 }, (_, i) => ({ type: "image" as const, url: `/slides/${setFolder}/ppt10/${i + 1}.png` }));
  const wordwallEmbeds = [
    { index: 5, url: "https://wordwall.net/embed/ukmod1-ppt10-1" },
    { index: 11, url: "https://wordwall.net/embed/ukmod1-ppt10-2" },
    { index: 17, url: "https://wordwall.net/embed/ukmod1-ppt10-3" },
    { index: 23, url: "https://wordwall.net/embed/ukmod1-ppt10-4" },
    { index: 29, url: "https://wordwall.net/embed/ukmod1-ppt10-5" },
  ];
  wordwallEmbeds.forEach(({ index, url }) => (slides[index] = { type: "embed", url }));
}
else if (curriculum === "ukmod1-ppt11") {
  slides = Array.from({ length: 40 }, (_, i) => ({ type: "image" as const, url: `/slides/${setFolder}/ppt11/${i + 1}.png` }));
  const wordwallEmbeds = [
    { index: 6, url: "https://wordwall.net/embed/ukmod1-ppt11-1" },
    { index: 12, url: "https://wordwall.net/embed/ukmod1-ppt11-2" },
    { index: 18, url: "https://wordwall.net/embed/ukmod1-ppt11-3" },
    { index: 24, url: "https://wordwall.net/embed/ukmod1-ppt11-4" },
    { index: 30, url: "https://wordwall.net/embed/ukmod1-ppt11-5" },
  ];
  wordwallEmbeds.forEach(({ index, url }) => (slides[index] = { type: "embed", url }));
}
else if (curriculum === "ukmod1-ppt12") {
  slides = Array.from({ length: 40 }, (_, i) => ({ type: "image" as const, url: `/slides/${setFolder}/ppt12/${i + 1}.png` }));
  const wordwallEmbeds = [
    { index: 7, url: "https://wordwall.net/embed/ukmod1-ppt12-1" },
    { index: 13, url: "https://wordwall.net/embed/ukmod1-ppt12-2" },
    { index: 19, url: "https://wordwall.net/embed/ukmod1-ppt12-3" },
    { index: 25, url: "https://wordwall.net/embed/ukmod1-ppt12-4" },
    { index: 31, url: "https://wordwall.net/embed/ukmod1-ppt12-5" },
  ];
  wordwallEmbeds.forEach(({ index, url }) => (slides[index] = { type: "embed", url }));
}
else if (curriculum === "ukmod1-ppt13") {
  slides = Array.from({ length: 40 }, (_, i) => ({ type: "image" as const, url: `/slides/${setFolder}/ppt13/${i + 1}.png` }));
  const wordwallEmbeds = [
    { index: 4, url: "https://wordwall.net/embed/ukmod1-ppt13-1" },
    { index: 10, url: "https://wordwall.net/embed/ukmod1-ppt13-2" },
    { index: 16, url: "https://wordwall.net/embed/ukmod1-ppt13-3" },
    { index: 22, url: "https://wordwall.net/embed/ukmod1-ppt13-4" },
    { index: 28, url: "https://wordwall.net/embed/ukmod1-ppt13-5" },
  ];
  wordwallEmbeds.forEach(({ index, url }) => (slides[index] = { type: "embed", url }));
}
else if (curriculum === "ukmod1-ppt14") {
  slides = Array.from({ length: 40 }, (_, i) => ({ type: "image" as const, url: `/slides/${setFolder}/ppt14/${i + 1}.png` }));
  const wordwallEmbeds = [
    { index: 5, url: "https://wordwall.net/embed/ukmod1-ppt14-1" },
    { index: 11, url: "https://wordwall.net/embed/ukmod1-ppt14-2" },
    { index: 17, url: "https://wordwall.net/embed/ukmod1-ppt14-3" },
    { index: 23, url: "https://wordwall.net/embed/ukmod1-ppt14-4" },
    { index: 29, url: "https://wordwall.net/embed/ukmod1-ppt14-5" },
  ];
  wordwallEmbeds.forEach(({ index, url }) => (slides[index] = { type: "embed", url }));
}
else if (curriculum === "ukmod1-ppt15") {
  slides = Array.from({ length: 40 }, (_, i) => ({ type: "image" as const, url: `/slides/${setFolder}/ppt15/${i + 1}.png` }));
  const wordwallEmbeds = [
    { index: 6, url: "https://wordwall.net/embed/ukmod1-ppt15-1" },
    { index: 12, url: "https://wordwall.net/embed/ukmod1-ppt15-2" },
    { index: 18, url: "https://wordwall.net/embed/ukmod1-ppt15-3" },
    { index: 24, url: "https://wordwall.net/embed/ukmod1-ppt15-4" },
    { index: 30, url: "https://wordwall.net/embed/ukmod1-ppt15-5" },
  ];
  wordwallEmbeds.forEach(({ index, url }) => (slides[index] = { type: "embed", url }));
}
else if (curriculum === "ukmod1-ppt16") {
  slides = Array.from({ length: 40 }, (_, i) => ({ type: "image" as const, url: `/slides/${setFolder}/ppt16/${i + 1}.png` }));
  const wordwallEmbeds = [
    { index: 7, url: "https://wordwall.net/embed/ukmod1-ppt16-1" },
    { index: 13, url: "https://wordwall.net/embed/ukmod1-ppt16-2" },
    { index: 19, url: "https://wordwall.net/embed/ukmod1-ppt16-3" },
    { index: 25, url: "https://wordwall.net/embed/ukmod1-ppt16-4" },
    { index: 31, url: "https://wordwall.net/embed/ukmod1-ppt16-5" },
  ];
  wordwallEmbeds.forEach(({ index, url }) => (slides[index] = { type: "embed", url }));
}
else if (curriculum === "ukmod1-ppt17") {
  slides = Array.from({ length: 40 }, (_, i) => ({ type: "image" as const, url: `/slides/${setFolder}/ppt17/${i + 1}.png` }));
  const wordwallEmbeds = [
    { index: 4, url: "https://wordwall.net/embed/ukmod1-ppt17-1" },
    { index: 10, url: "https://wordwall.net/embed/ukmod1-ppt17-2" },
    { index: 16, url: "https://wordwall.net/embed/ukmod1-ppt17-3" },
    { index: 22, url: "https://wordwall.net/embed/ukmod1-ppt17-4" },
    { index: 28, url: "https://wordwall.net/embed/ukmod1-ppt17-5" },
  ];
  wordwallEmbeds.forEach(({ index, url }) => (slides[index] = { type: "embed", url }));
}
else if (curriculum === "ukmod1-ppt18") {
  slides = Array.from({ length: 40 }, (_, i) => ({ type: "image" as const, url: `/slides/${setFolder}/ppt18/${i + 1}.png` }));
  const wordwallEmbeds = [
    { index: 5, url: "https://wordwall.net/embed/ukmod1-ppt18-1" },
    { index: 11, url: "https://wordwall.net/embed/ukmod1-ppt18-2" },
    { index: 17, url: "https://wordwall.net/embed/ukmod1-ppt18-3" },
    { index: 23, url: "https://wordwall.net/embed/ukmod1-ppt18-4" },
    { index: 29, url: "https://wordwall.net/embed/ukmod1-ppt18-5" },
  ];
  wordwallEmbeds.forEach(({ index, url }) => (slides[index] = { type: "embed", url }));
}
else if (curriculum === "ukmod1-ppt19") {
  slides = Array.from({ length: 40 }, (_, i) => ({ type: "image" as const, url: `/slides/${setFolder}/ppt19/${i + 1}.png` }));
  const wordwallEmbeds = [
    { index: 6, url: "https://wordwall.net/embed/ukmod1-ppt19-1" },
    { index: 12, url: "https://wordwall.net/embed/ukmod1-ppt19-2" },
    { index: 18, url: "https://wordwall.net/embed/ukmod1-ppt19-3" },
    { index: 24, url: "https://wordwall.net/embed/ukmod1-ppt19-4" },
    { index: 30, url: "https://wordwall.net/embed/ukmod1-ppt19-5" },
  ];
  wordwallEmbeds.forEach(({ index, url }) => (slides[index] = { type: "embed", url }));
}
else if (curriculum === "ukmod1-ppt20") {
  slides = Array.from({ length: 40 }, (_, i) => ({ type: "image" as const, url: `/slides/${setFolder}/ppt20/${i + 1}.png` }));
  const wordwallEmbeds = [
    { index: 7, url: "https://wordwall.net/embed/ukmod1-ppt20-1" },
    { index: 13, url: "https://wordwall.net/embed/ukmod1-ppt20-2" },
    { index: 19, url: "https://wordwall.net/embed/ukmod1-ppt20-3" },
    { index: 25, url: "https://wordwall.net/embed/ukmod1-ppt20-4" },
    { index: 31, url: "https://wordwall.net/embed/ukmod1-ppt20-5" },
  ];
  wordwallEmbeds.forEach(({ index, url }) => (slides[index] = { type: "embed", url }));
}
else if (curriculum === "ukmod1-ppt21") {
  slides = Array.from({ length: 40 }, (_, i) => ({ type: "image" as const, url: `/slides/${setFolder}/ppt21/${i + 1}.png` }));
  const wordwallEmbeds = [
    { index: 4, url: "https://wordwall.net/embed/ukmod1-ppt21-1" },
    { index: 10, url: "https://wordwall.net/embed/ukmod1-ppt21-2" },
    { index: 16, url: "https://wordwall.net/embed/ukmod1-ppt21-3" },
    { index: 22, url: "https://wordwall.net/embed/ukmod1-ppt21-4" },
    { index: 28, url: "https://wordwall.net/embed/ukmod1-ppt21-5" },
  ];
  wordwallEmbeds.forEach(({ index, url }) => (slides[index] = { type: "embed", url }));
}
else if (curriculum === "ukmod1-ppt22") {
  slides = Array.from({ length: 40 }, (_, i) => ({ type: "image" as const, url: `/slides/${setFolder}/ppt22/${i + 1}.png` }));
  const wordwallEmbeds = [
    { index: 5, url: "https://wordwall.net/embed/ukmod1-ppt22-1" },
    { index: 11, url: "https://wordwall.net/embed/ukmod1-ppt22-2" },
    { index: 17, url: "https://wordwall.net/embed/ukmod1-ppt22-3" },
    { index: 23, url: "https://wordwall.net/embed/ukmod1-ppt22-4" },
    { index: 29, url: "https://wordwall.net/embed/ukmod1-ppt22-5" },
  ];
  wordwallEmbeds.forEach(({ index, url }) => (slides[index] = { type: "embed", url }));
}
else if (curriculum === "ukmod1-ppt23") {
  slides = Array.from({ length: 40 }, (_, i) => ({ type: "image" as const, url: `/slides/${setFolder}/ppt23/${i + 1}.png` }));
  const wordwallEmbeds = [
    { index: 6, url: "https://wordwall.net/embed/ukmod1-ppt23-1" },
    { index: 12, url: "https://wordwall.net/embed/ukmod1-ppt23-2" },
    { index: 18, url: "https://wordwall.net/embed/ukmod1-ppt23-3" },
    { index: 24, url: "https://wordwall.net/embed/ukmod1-ppt23-4" },
    { index: 30, url: "https://wordwall.net/embed/ukmod1-ppt23-5" },
  ];
  wordwallEmbeds.forEach(({ index, url }) => (slides[index] = { type: "embed", url }));
}
else if (curriculum === "ukmod1-ppt24") {
  slides = Array.from({ length: 40 }, (_, i) => ({ type: "image" as const, url: `/slides/${setFolder}/ppt24/${i + 1}.png` }));
  const wordwallEmbeds = [
    { index: 7, url: "https://wordwall.net/embed/ukmod1-ppt24-1" },
    { index: 13, url: "https://wordwall.net/embed/ukmod1-ppt24-2" },
    { index: 19, url: "https://wordwall.net/embed/ukmod1-ppt24-3" },
    { index: 25, url: "https://wordwall.net/embed/ukmod1-ppt24-4" },
    { index: 31, url: "https://wordwall.net/embed/ukmod1-ppt24-5" },
  ];
  wordwallEmbeds.forEach(({ index, url }) => (slides[index] = { type: "embed", url }));
}
else if (curriculum === "ukmod1-ppt25") {
  slides = Array.from({ length: 40 }, (_, i) => ({ type: "image" as const, url: `/slides/${setFolder}/ppt25/${i + 1}.png` }));
  const wordwallEmbeds = [
    { index: 4, url: "https://wordwall.net/embed/ukmod1-ppt25-1" },
    { index: 10, url: "https://wordwall.net/embed/ukmod1-ppt25-2" },
    { index: 16, url: "https://wordwall.net/embed/ukmod1-ppt25-3" },
    { index: 22, url: "https://wordwall.net/embed/ukmod1-ppt25-4" },
    { index: 28, url: "https://wordwall.net/embed/ukmod1-ppt25-5" },
  ];
  wordwallEmbeds.forEach(({ index, url }) => (slides[index] = { type: "embed", url }));
}
else if (curriculum === "ukmod1-ppt26") {
  slides = Array.from({ length: 40 }, (_, i) => ({ type: "image" as const, url: `/slides/${setFolder}/ppt26/${i + 1}.png` }));
  const wordwallEmbeds = [
    { index: 5, url: "https://wordwall.net/embed/ukmod1-ppt26-1" },
    { index: 11, url: "https://wordwall.net/embed/ukmod1-ppt26-2" },
    { index: 17, url: "https://wordwall.net/embed/ukmod1-ppt26-3" },
    { index: 23, url: "https://wordwall.net/embed/ukmod1-ppt26-4" },
    { index: 29, url: "https://wordwall.net/embed/ukmod1-ppt26-5" },
  ];
  wordwallEmbeds.forEach(({ index, url }) => (slides[index] = { type: "embed", url }));
}

/** 🧩 PPT 1 — Reading Practice */
    else if (curriculum === "ppt1") {
      slides = Array.from({ length: 47 }, (_, i) => ({
        type: "image" as const,
        url: `/slides/${setFolder}/ppt1/${i + 1}.png`,
      }));
      const wordwallEmbeds = [
        { index: 8, url: "https://wordwall.net/embed/082a5489902e479aa47dc9ad2f2d2a1c" },
        { index: 12, url: "https://wordwall.net/embed/06cd4733511c45a1bbc62fc21322a471" },
        { index: 15, url: "https://wordwall.net/embed/84047d63749241efa6d2a1dea290186a" },
        { index: 17, url: "https://wordwall.net/embed/f89b9ee51b51410b85c01599d5acfae9" },
      ];
      wordwallEmbeds.forEach(({ index, url }) => (slides[index] = { type: "embed", url }));
    }


        
    /** 🧩 PPT 2 — Reading Practice */
    else if (curriculum === "ppt2") {
      slides = Array.from({ length: 38 }, (_, i) => ({
        type: "image" as const,
        url: `/slides/${setFolder}/ppt2/${i + 1}.png`,
      }));
      const wordwallEmbeds = [
        { index: 5, url: "https://wordwall.net/embed/0ac9ad422ea5413fa62074bf3b1173f2" },

        { index: 9, url: "https://wordwall.net/embed/739ded7c1f8740b29d3bd9b9f67a720b" },

        { index: 13, url: "https://wordwall.net/embed/9e0f6be5b1454dfc9610b561ad7143ee" },

        { index: 16, url: "https://wordwall.net/embed/507a951c5dc64583b09490cd4ab34ed0" },

        { index: 19, url: "https://wordwall.net/embed/8bd3a179a56e4956b51c888fe55990a9" },

        { index: 21, url: "https://wordwall.net/embed/54a45317286646b5899ed666a9640f87" },

        { index: 27, url: "https://wordwall.net/embed/ef2da3892cb244eeb60ba77aece960b9" },
      ];
      wordwallEmbeds.forEach(({ index, url }) => (slides[index] = { type: "embed", url }));
    }

    /** 🧩 PPT 3 — Reading Practice */
    else if (curriculum === "ppt3") {
      slides = Array.from({ length: 73 }, (_, i) => ({
        type: "image" as const,
        url: `/slides/${setFolder}/ppt3/${i + 1}.png`,
      }));
      const wordwallEmbeds = [
        { index: 14, url: "https://wordwall.net/embed/25c4f011fe8b422db981dfcd5d02d498" },

        { index: 16, url: "https://wordwall.net/embed/1f3aee1f23cd4078ae209ca0ff55f08d" },
        
        { index: 18, url: "https://www.youtube.com/embed/wsloA5kCqPo" },

        { index: 45, url: "https://wordwall.net/embed/6debf0f1ecba4d80b532d5ff553d806b" },

        { index: 48, url: "https://wordwall.net/embed/ea0b337fcd674417bce781787ef0de98" },

        { index: 51, url: "https://wordwall.net/embed/ea0b337fcd674417bce781787ef0de98" },

        { index: 54, url: "https://wordwall.net/embed/5dc7e9d91125408bbdc00fd5145ffe65" },

        { index: 60, url: "https://wordwall.net/embed/91c82a41532942b79cd6077b6c1c30a1" },


      ];
      wordwallEmbeds.forEach(({ index, url }) => (slides[index] = { type: "embed", url }));
    }

    /** 🧩 PPT 4 — Reading Practice */
    else if (curriculum === "ppt4") {
      slides = Array.from({ length: 40 }, (_, i) => ({
        type: "image" as const,
        url: `/slides/${setFolder}/ppt4/${i + 1}.png`,
      }));
      const wordwallEmbeds = [
        { index: 4, url: "https://wordwall.net/embed/0c64f4e63449455885726707573c51b2" },

        { index: 7, url: "https://wordwall.net/embed/d8d16d3d88ad43d3b9f494e2863fdd65" },

        { index: 10, url: "https://wordwall.net/embed/998d858ad9404381867f5310bcff6821" },

        { index: 13, url: "https://wordwall.net/embed/28664973020d4072bfb25703e223ee5d" },
        
        { index: 14, url: "https://wordwall.net/embed/1bdf58f60c85483087881ce2cfa70e26" },

        { index: 15, url: "https://www.youtube.com/embed/w6KzAj7CZXQ" },

        { index: 18, url: "https://wordwall.net/embed/03ab0bd79a11408f99ab94400fb5f488" },

        { index: 21, url: "https://wordwall.net/embed/21c394d2f75c4a6cb7dadfbf8e1bd4b6" },

        { index: 23, url: "https://wordwall.net/embed/6a5b74f506db4b85b2d5361e4ca2d596" },

        { index: 29, url: "https://wordwall.net/embed/f1d74815876e4852a0d3af5b168082ee" },

      ];
      wordwallEmbeds.forEach(({ index, url }) => (slides[index] = { type: "embed", url }));
    }

    /** 🧩 PPT 5 — Reading Practice */
    else if (curriculum === "ppt5") {
      slides = Array.from({ length: 41 }, (_, i) => ({
        type: "image" as const,
        url: `/slides/${setFolder}/ppt5/${i + 1}.png`,
      }));
      const wordwallEmbeds = [
        { index: 11, url: "https://wordwall.net/embed/7725cf15dcba4aa88b530fb3c8fbba98" },

        { index: 15, url: "https://wordwall.net/embed/4c61daa82be04951828ce69b3c1c035c" },

        { index: 18, url: "https://wordwall.net/embed/6ca4ecc78f4943cdbb397d2694c91f27" },

        { index: 21, url: "https://wordwall.net/embed/7604a0fdf1e84af2bbc89c6cc98e5974" },
        
        { index: 23, url: "https://wordwall.net/embed/f9caaa2f0429497aa629e76e422ea05c" },

        { index: 32, url: "https://wordwall.net/embed/744121f817234dd1ab6b7d7225fbf23a" },

        { index: 37, url: "https://wordwall.net/embed/3cd7291ac6414087bb0537e05d098a71" },

      ];
      wordwallEmbeds.forEach(({ index, url }) => (slides[index] = { type: "embed", url }));
    }

    /** 🧩 PPT 6 — Reading Practice */
    else if (curriculum === "ppt6") {
      slides = Array.from({ length: 40 }, (_, i) => ({
        type: "image" as const,
        url: `/slides/${setFolder}/ppt6/${i + 1}.png`,
      }));
      const wordwallEmbeds = [
        { index: 8, url: "https://wordwall.net/embed/cfb279b5766d47c0ae441771ce7fd20c" },

        { index: 13, url: "https://wordwall.net/embed/95b0a1e92531473abe15470161e52735" },

        { index: 16, url: "https://wordwall.net/embed/e75aa987163545b7aeb371bbdd4703bb" },

        { index: 19, url: "https://wordwall.net/embed/8ee378f899a8406a8696a9750acb7901" },
        
        { index: 21, url: "https://wordwall.net/embed/0d3c7a4127424d1aabc1f5b6885752f9" },

        { index: 31, url: "https://wordwall.net/embed/65848c5b181c4b91aeb055df8af7f684" },

        
      ];
      wordwallEmbeds.forEach(({ index, url }) => (slides[index] = { type: "embed", url }));
    }

    /** 🧩 PPT 7 — Reading Practice */
    else if (curriculum === "ppt7") {
      slides = Array.from({ length: 43 }, (_, i) => ({
        type: "image" as const,
        url: `/slides/${setFolder}/ppt7/${i + 1}.png`,
      }));
      const wordwallEmbeds = [
        { index: 14, url: "https://wordwall.net/embed/9f6e1e05ffc64d5e8b78b1b481450448" },
        
        { index: 16, url: "https://www.youtube.com/embed/u6pkcdEylTE" },
        
        { index: 17, url: "https://wordwall.net/embed/cece408501af48599b6f25072ad96b66" },
        
        { index: 20, url: "https://wordwall.net/embed/3a27ea89170e455bbfbfe6cbc0871b65" },
        
        { index: 23, url: "https://www.youtube.com/embed/H2Z4p0au1yk" },
        
        { index: 24, url: "https://wordwall.net/embed/8fea226ae1334bbf9003fca58ff5b32b" },
        
        { index: 26, url: "https://wordwall.net/embed/a041856ca5fa42989680e32d53793e4a" },
        
        { index: 34, url: "https://wordwall.net/embed/8a4c47f6fcec4e9cab5488cf46f066ab" },
        
      ];
      wordwallEmbeds.forEach(({ index, url }) => (slides[index] = { type: "embed", url }));
    }

    /** 🧩 PPT 8 — Reading Practice */
    else if (curriculum === "ppt8") {
      slides = Array.from({ length: 51 }, (_, i) => ({
        type: "image" as const,
        url: `/slides/${setFolder}/ppt8/${i + 1}.png`,
      }));
      const wordwallEmbeds = [
        { index: 10, url: "https://wordwall.net/embed/92bab9b5733a4715924d664a8b5784c6" },
        
        { index: 12, url: "https://www.youtube.com/embed/KfFoRw0UNzk" },
        
        { index: 13, url: "https://wordwall.net/embed/e914897ffd774974a258ec4f10a2d3f8" },
        
        { index: 16, url: "https://wordwall.net/embed/ac74a38243fa465c877f7a91b6924632" },
        
        { index: 19, url: "https://wordwall.net/embed/d8cff3debb5d46ffa42dbcf3bef58a98" },
        
        { index: 42, url: "https://wordwall.net/embed/0e7b8f0987394ee6abcda86f486a7c2d" },
        
        { index: 47, url: "https://www.youtube.com/embed/1TSkkxu8on0" },
        

        { index: 47, url: "" },
      ];
      wordwallEmbeds.forEach(({ index, url }) => (slides[index] = { type: "embed", url }));
    }

    /** 🧩 PPT 9 — Reading Practice */
    else if (curriculum === "ppt9") {
      slides = Array.from({ length: 47 }, (_, i) => ({
        type: "image" as const,
        url: `/slides/${setFolder}/ppt9/${i + 1}.png`,
      }));
      const wordwallEmbeds = [
        { index: 5, url: "https://wordwall.net/embed/0119ebfb722a43f88e1f636718450ea4" },

        { index: 9, url: "https://wordwall.net/embed/c9815201e6194906a77b818f59bc5754" },

        { index: 11, url: "https://wordwall.net/embed/eef2a3962a2740e5aa64661136dd3aa4" },

        { index: 14, url: "https://wordwall.net/embed/8da5c0dafee04b93aeafaa272d7c4161" },

        { index: 17, url: "https://wordwall.net/embed/cdb05b7e5b5a4b9891b4145d51ee8a10" },

        { index: 41, url: "https://wordwall.net/embed/5ba65cf684ca4830b06b902ffe858544" },
      ];
      wordwallEmbeds.forEach(({ index, url }) => (slides[index] = { type: "embed", url }));
    }

    /** 🧩 PPT 10 — Reading Practice */
    else if (curriculum === "ppt10") {
      slides = Array.from({ length: 94 }, (_, i) => ({
        type: "image" as const,
        url: `/slides/${setFolder}/ppt10/${i + 1}.png`,
      }));
      const wordwallEmbeds = [
        { index: 5, url: "https://wordwall.net/embed/9d59409ac1a14b2393c661cf4d283f12" },
        
      ];
      wordwallEmbeds.forEach(({ index, url }) => (slides[index] = { type: "embed", url }));
    }







    
    /** 🧩 PPT 11 — Reading Practice */
else if (curriculum === "ppt11") {
  slides = Array.from({ length: 56 }, (_, i) => ({
    type: "image" as const,
    url: `/slides/${setFolder}/ppt11/${i + 1}.png`,
  }));
  const wordwallEmbeds = [
    { index: 18, url: "https://wordwall.net/embed/2b751ded65b74c32bfa257d8ce90ebbf" },
    { index: 44, url: "https://wordwall.net/embed/271d3bfb383246f0baba01f2ea49cf15" },
  ];
  wordwallEmbeds.forEach(({ index, url }) => (slides[index] = { type: "embed", url }));
}

/** 🧩 PPT 12 — Reading Practice */
else if (curriculum === "ppt12") {
  slides = Array.from({ length: 46 }, (_, i) => ({
    type: "image" as const,
    url: `/slides/${setFolder}/ppt12/${i + 1}.png`,
  }));
  const wordwallEmbeds = [
    { index: 14, url: "https://wordwall.net/embed/b091ab6369dd49c296416c528f5aaba1" },
    { index: 19, url: "https://wordwall.net/embed/772e782f7f0a46bc9e9a51e6a79eace2" },
    { index: 22, url: "https://wordwall.net/embed/90f3e3c4b70a426bb1d9ae195b20c648" },
    { index: 26, url: "https://wordwall.net/embed/eee062a6fa074955ad306a74ff05db23" },
    { index: 28, url: "https://wordwall.net/embed/808c40bb8f1f400c907c498738f5a75b" },
    { index: 36, url: "https://wordwall.net/embed/bafb86ff4e774110ac51f161539257b0" },
  ];
  wordwallEmbeds.forEach(({ index, url }) => (slides[index] = { type: "embed", url }));
}

/** 🧩 PPT 13 — Reading Practice */
else if (curriculum === "ppt13") {
  slides = Array.from({ length: 58 }, (_, i) => ({
    type: "image" as const,
    url: `/slides/${setFolder}/ppt13/${i + 1}.png`,
  }));
  const wordwallEmbeds = [
    { index: 16, url: "https://wordwall.net/embed/1e9cbf37578841598721f0d380577ff9" },
    { index: 21, url: "https://wordwall.net/embed/4504acb816224121ac6a4694ea7fe0f1" },
    { index: 38, url: "https://wordwall.net/embed/0a074fe4907941f99f28761f6dea0867" },
    { index: 48, url: "https://wordwall.net/embed/615abe42b7874cce995c3e678378e63d" },
  ];
  wordwallEmbeds.forEach(({ index, url }) => (slides[index] = { type: "embed", url }));
}

/** 🧩 PPT 14 — Reading Practice */
else if (curriculum === "ppt14") {
  slides = Array.from({ length: 46 }, (_, i) => ({
    type: "image" as const,
    url: `/slides/${setFolder}/ppt14/${i + 1}.png`,
  }));
  const wordwallEmbeds = [
    { index: 14, url: "https://wordwall.net/embed/91d552b50bbc41ffa8875335fe11c34c" },
    { index: 18, url: "https://wordwall.net/embed/1ddfb583ed294330b02735721339caf6" },
    { index: 21, url: "https://wordwall.net/embed/ba3ba32ad30f4c8199ac9d33e16dbd9f" },
    { index: 24, url: "https://wordwall.net/embed/ba3ba32ad30f4c8199ac9d33e16dbd9f" },
    { index: 26, url: "https://wordwall.net/embed/b62b4258424048ff8f9f1e0e288bfdb1" },
    { index: 34, url: "https://wordwall.net/embed/ca4f56bb06c74df884532a77e2bd8cab" },
    { index: 37, url: "https://www.youtube.com/embed/aUpiy67_nt4"},
  ];
  wordwallEmbeds.forEach(({ index, url }) => (slides[index] = { type: "embed", url }));
}

/** 🧩 PPT 15 — Reading Practice */
else if (curriculum === "ppt15") {
  slides = Array.from({ length: 33 }, (_, i) => ({
    type: "image" as const,
    url: `/slides/${setFolder}/ppt15/${i + 1}.png`,
  }));
  const wordwallEmbeds = [
    { index: 8, url: "https://wordwall.net/embed/a370d387f9464cd1a4bbff690afdafc5" },
    { index: 12, url: "https://wordwall.net/embed/b9bfba3b48c64fd8973579c296c4df2d" },
    { index: 15, url: "https://wordwall.net/embed/8b887885d7da418982489058d2db6ad3" },
    { index: 18, url: "https://wordwall.net/embed/c34d32abab5847b3ad01828e061af19a" },
    { index: 20, url: "https://wordwall.net/embed/df298110372f4a109382b90e649c19cf" },
    { index: 27, url: "https://wordwall.net/embed/1d6aec1d8112442d9b61382f79a53830" },
  ];
  wordwallEmbeds.forEach(({ index, url }) => (slides[index] = { type: "embed", url }));
}

/** 🧩 PPT 16 — Reading Practice */
else if (curriculum === "ppt16") {
  slides = Array.from({ length: 42 }, (_, i) => ({
    type: "image" as const,
    url: `/slides/${setFolder}/ppt16/${i + 1}.png`,
  }));
  const wordwallEmbeds = [
    { index: 14, url: "https://wordwall.net/embed/c3655500eaff404994a1fe779ba14148" },
    { index: 19, url: "https://wordwall.net/embed/9c8fec13efdb4aea8fcc21c20c5cbcf1" },
    { index: 22, url: "https://wordwall.net/embed/4b2cc38090474c1a8cd7d2f38c69c0cb" },
    { index: 25, url: "https://wordwall.net/embed/816c33610618415bad9d537e91517c95" },
    { index: 27, url: "https://wordwall.net/embed/dee0f200459b4a05a8d613612a2e605e" },
    { index: 35, url: "https://wordwall.net/embed/84322bd7d504465c86e3b5481803980b" },
  ];
  wordwallEmbeds.forEach(({ index, url }) => (slides[index] = { type: "embed", url }));
}

/** 🧩 PPT 17 — Reading Practice */
else if (curriculum === "ppt17") {
  slides = Array.from({ length: 39 }, (_, i) => ({
    type: "image" as const,
    url: `/slides/${setFolder}/ppt17/${i + 1}.png`,
  }));
  const wordwallEmbeds = [
    { index: 8, url: "https://wordwall.net/embed/c01f5624367d47fdaa493b0fc9224b42" },
    { index: 11, url: "https://wordwall.net/embed/0e01a2a700034908acace6c139c19278" },
    { index: 15, url: "https://wordwall.net/embed/37a22378e8544a5e8c7c7c2dbc7ef4ab" },
    { index: 18, url: "https://wordwall.net/embed/563c7a87ef7046be8a4f6496fd89bc76" },
    { index: 20, url: "https://wordwall.net/embed/30eba41b3be74a24a7d7f0a7086cbde7" },
    { index: 29, url: "https://www.youtube.com/embed/aUpiy67_nt4" },
    { index: 37, url: "https://wordwall.net/embed/ef2da3892cb244eeb60ba77aece960b9" },
  ];
  wordwallEmbeds.forEach(({ index, url }) => (slides[index] = { type: "embed", url }));
}

/** 🧩 PPT 18 — Reading Practice */
else if (curriculum === "ppt18") {
  slides = Array.from({ length: 43 }, (_, i) => ({
    type: "image" as const,
    url: `/slides/${setFolder}/ppt18/${i + 1}.png`,
  }));
  const wordwallEmbeds = [
    { index: 14, url: "https://wordwall.net/embed/606667dc4e3c49c7b35a672a1214ed18" },
    { index: 17, url: "https://wordwall.net/embed/4371fe531bfb4551815df85fb9b9c5ae" },

    { index: 21, url: "https://wordwall.net/embed/e2f2bf6ca74945d99578b45a9fe9b5f8" },

    { index: 24, url: "https://wordwall.net/embed/c7139f1e952b4551a39da8671dff1917" },
    { index: 26, url: "https://wordwall.net/embed/ad83eb3b86a549a89bb47bf46698ec92" },
    { index: 41, url: "https://wordwall.net/embed/ad83eb3b86a549a89bb47bf46698ec92" },
  ];
  wordwallEmbeds.forEach(({ index, url }) => (slides[index] = { type: "embed", url }));
}

/** 🧩 PPT 19 — Reading Practice */
else if (curriculum === "ppt19") {
  slides = Array.from({ length: 42 }, (_, i) => ({
    type: "image" as const,
    url: `/slides/${setFolder}/ppt19/${i + 1}.png`,
  }));
  const wordwallEmbeds = [
    { index: 14, url: "https://wordwall.net/embed/60b4ae640e1c46138f7208071db20c89" },
    { index: 16, url: "https://wordwall.net/embed/f0db2fed55fc4cc7b247d5067b9c25d6" },
    { index: 20, url: "https://wordwall.net/embed/fa7006ab222e404cb151fc40418044bf" },
    { index: 23, url: "https://wordwall.net/embed/07d0e6951b69487eb9b338b8f07b0649" },
    { index: 25, url: "https://wordwall.net/embed/94e2da279de0450cac247c284a177cb5" },
    { index: 39, url: "https://wordwall.net/embed/3cf7955c684b49e2aa4c46b0b5a1e1d2" },
  ];
  wordwallEmbeds.forEach(({ index, url }) => (slides[index] = { type: "embed", url }));
}

/** 🧩 PPT 20 — Reading Practice */
else if (curriculum === "ppt20") {
  slides = Array.from({ length: 96 }, (_, i) => ({
    type: "image" as const,
    url: `/slides/${setFolder}/ppt20/${i + 1}.png`,
  }));
  const wordwallEmbeds = [
    { index: 5, url: "https://wordwall.net/embed/64e3b8a68c784803be750c01f9986cca" },
   
  ];
  wordwallEmbeds.forEach(({ index, url }) => (slides[index] = { type: "embed", url }));
}






    /** 🧩 Fallback */
    else {
      slides = [{ type: "image", url: "/slides/notfound.png" }];
    }

    return NextResponse.json({
      slides,
      total: slides.length,
      curriculum,
      set: setFolder,
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
