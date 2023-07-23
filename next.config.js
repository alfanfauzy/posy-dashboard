/** @type {import('next').NextConfig} */
const nextConfig = {
	output: 'standalone',
	reactStrictMode: true,
	images: {
		domains: [
			'pvpapi.klikoo.co.id',
			'fnbapi.stage.pvg.im',
			'fnbapi.posy.tech',
			'ik.imagekit.io',
			'fnbapi.stage.pvg.im'
		],
	},
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
			{
				source: '/notification-service/:path*',
				destination: `${process.env.NEXT_PUBLIC_API}/fnb-notification-service/:path*`,
			},
			{
				source: '/payment-service/:path*',
				destination: `${process.env.NEXT_PUBLIC_API}/fnb-payment-service/:path*`,
			},
			{
				source: '/document-service/:path*',
				destination: `${process.env.NEXT_PUBLIC_API}/fnb-document-service/:path*`,
			},
		];
	},
	swcMinify: true,
};

module.exports = nextConfig;
