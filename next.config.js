/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // output: "export",
  env: {
    DB_URL: " _DB_URL"
  }
};

module.exports = nextConfig;
