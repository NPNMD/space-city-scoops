/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  images: {
    unoptimized: true,
    domains: ['pixellab.ai', 'storage.googleapis.com'], // Allow external images from PixelLab
  },
};

module.exports = nextConfig;

