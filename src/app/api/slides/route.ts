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


        
    /** 🧩 PPT 2 — Reading Practice */
    else if (curriculum === "ppt2") {
      slides = Array.from({ length: 38 }, (_, i) => ({
        type: "image" as const,
        url: `/slides/naplan/ppt2/${i + 1}.png`,
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
        url: `/slides/naplan/ppt3/${i + 1}.png`,
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
        url: `/slides/naplan/ppt4/${i + 1}.png`,
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
        url: `/slides/naplan/ppt5/${i + 1}.png`,
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
        url: `/slides/naplan/ppt6/${i + 1}.png`,
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
        url: `/slides/naplan/ppt7/${i + 1}.png`,
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
        url: `/slides/naplan/ppt8/${i + 1}.png`,
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
        url: `/slides/naplan/ppt9/${i + 1}.png`,
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
        url: `/slides/naplan/ppt10/${i + 1}.png`,
      }));
      const wordwallEmbeds = [
        { index: 5, url: "https://wordwall.net/embed/9d59409ac1a14b2393c661cf4d283f12" },
        
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
