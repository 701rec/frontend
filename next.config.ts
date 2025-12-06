import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Убираем небезопасные и нестабильные "hostname: "**""
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ibb.co.com",
      },
      {
        protocol: "https",
        hostname: "astanait.edu.kz",
      },
      {
        protocol: "https",
        hostname: "sdu.edu.kz",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      },
      {
        protocol: "https",
        hostname: "farabi.university",
      },
      {
        protocol: "https",
        hostname: "weproject.media",
      },
      {
        protocol: "https",
        hostname: "www.kimep.kz",
      },
      {
        protocol: "https",
        hostname: "static.tildacdn.pro",
      },
      // Правило для KBTU, которое у вас уже было,
      // но для всех остальных лучше использовать только hostname
      {
        protocol: "https",
        hostname: "kbtu.edu.kz",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
