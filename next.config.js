const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, "src", "styles")],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.29cm.co.kr",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
