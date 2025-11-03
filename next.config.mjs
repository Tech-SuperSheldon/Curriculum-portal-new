/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true, 
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },

  async headers() {
    return [
      {
        
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "ALLOWALL",
          },
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
        ],
      },
    ];
  },

  typescript: {
    ignoreBuildErrors: process.env.NODE_ENV === "development",
  },

  eslint: {
    ignoreDuringBuilds: process.env.NODE_ENV === "development",
  },

  experimental: {
    workerThreads: true,
    cpus: 1,
  },
};

export default nextConfig;
