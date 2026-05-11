/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Statik eksportni yoqish
  images: {
    unoptimized: true, // Statik eksportda rasmlarni optimallashtirishni o'chirish kerak
  },
};

module.exports = nextConfig;
