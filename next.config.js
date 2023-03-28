/** @type {import('next').NextConfig} */
const nextConfig = {
	output: 'standalone',
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
		];
	},
	swcMinify: true,
	webpack: (config, {isServer}) => {
		config.module.rules.push({
			test: /\.(png|jpe?g|gif|svg)$/i,
			use: [
				{
					loader: 'file-loader',
					options: {
						publicPath: '/_next',
						name: 'static/images/[hash].[ext]',
					},
				},
			],
		});

		if (!isServer) {
			config.resolve.fallback = {
				fs: false,
				module: false,
			};
		}

		return config;
	},
};

module.exports = nextConfig;
