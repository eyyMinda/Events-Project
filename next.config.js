/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // output: "export",
  env: {
    DB_URL: "https://wwafeww-e792f-default-rtdb.europe-west1.firebasedatabase.app/"
  }
};

module.exports = nextConfig;
