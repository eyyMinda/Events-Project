/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  // output: "export",
  env: {
    DB_URL: "https://wwafeww-e792f-default-rtdb.europe-west1.firebasedatabase.app/"
  }
};

module.exports = nextConfig;
