/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['pixellab.ai', 'storage.googleapis.com'], // Allow external images from PixelLab
  },
};

module.exports = nextConfig;

