/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  rewrites() {
    return [
      {
        source: '/order-service/:path*',
        destination: `${process.env.NEXT_PUBLIC_API}/fnb-order-service/:path*`,
      },
      {
        source: '/user-service/:path*',
        destination: `${process.env.NEXT_PUBLIC_API}/fnb-user-service/:path*`,
      },
      {
        source: '/product-service/:path*',
        destination: `${process.env.NEXT_PUBLIC_API}/fnb-product-service/:path*`,
      },
    ]
  },
  swcMinify: true,
}

module.exports = nextConfig
