/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      // Root-level static assets (e.g. /bg-demo.webp, /bghero.png)
      {
        source: '/:file((?!_next/).+\\.(?:jpg|jpeg|png|webp|avif|gif|svg|ico|woff|woff2|ttf|otf|mp4|webm))',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Nested public assets (e.g. /assets/Hotel/...)
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
