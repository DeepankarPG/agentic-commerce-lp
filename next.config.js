/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      // All images, fonts, SVGs and videos in /public — cache for 1 year
      {
        source: '/:path*.(jpg|jpeg|png|webp|avif|gif|svg|ico|woff|woff2|ttf|otf|mp4|webm)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Next.js static chunk files already get immutable cache via _next/static,
      // but belt-and-suspenders for any asset subfolder
      {
        source: '/assets/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}
module.exports = nextConfig
