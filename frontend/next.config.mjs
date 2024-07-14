/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    baseUrlAPI: "http://localhost:3000/api",
  },
};

export default nextConfig;
