const withPWA = require("@ducanh2912/next-pwa").default({
	dest: "public",
  });
  
  /** @type {import('next').NextConfig} */
  const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	images: {
	  unoptimized: true,
	},
	pwa: {
		dest: 'public',
		mode: 'production'
	},
	async rewrites() {
	  return [
		{
		  source: '/citizen/:path*',
		  destination:
			process.env.NODE_ENV === 'development'
			  ? 'http://flask:5001/:path*' 
			  : '/citizen/:path*', 
		},
		
		{
		  source: '/api/:path*',
		  destination:
			process.env.NODE_ENV === 'development'
			  ? 'http://127.0.0.1:5328/api/:path*' 
			  : '/api/',
		},
	  ];
	},
	webpack: (config, { isServer }) => {
	  config.resolve = {
		...config.resolve,
		alias: {
		  ...config.resolve.alias,
		},
	  };
	  if (!isServer) {
		config.node = {
		  ...config.node,
		};
	  }
	  return config;
	},
  };
  
  module.exports = withPWA(nextConfig);  