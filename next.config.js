/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  rewrites() {
    return [
      {
        source: '/api/fnb-order-service/:path*',
        destination: `${process.env.NEXT_PUBLIC_API}/fnb-order-service/:path*`,
      },
      {
        source: '/api/fnb-user-service/:path*',
        destination: `${process.env.NEXT_PUBLIC_API}/fnb-user-service/:path*`,
      },
      {
        source: '/settings/api/fnb-user-service/:path*',
        destination: `${process.env.NEXT_PUBLIC_API}/fnb-user-service/:path*`,
      },
      {
        source: '/api/fnb-product-service/:path*',
        destination: `${process.env.NEXT_PUBLIC_API}/fnb-product-service/:path*`,
      },
    ]
  },
  swcMinify: true,
}

module.exports = nextConfig
