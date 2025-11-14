import type { NextConfig } from 'next';

const storageUrl = process.env.STORAGE_IMAGE_URL;
if (!storageUrl) {
	throw new Error('STORAGE_IMAGE_URL is not set');
}

const storage = new URL(storageUrl);
const protocol = storage.protocol.replace(':', '') as 'http' | 'https';
const basePath = storage.pathname.replace(/\/$/, '');

const nextConfig: NextConfig = {
	reactStrictMode: true,
	poweredByHeader: false,
	logging: {
		fetches: {
			fullUrl: true
		}
	},
	images: {
		remotePatterns: [
			{
				protocol,
				hostname: storage.hostname,
				port: storage.port,
				pathname: `${basePath}/**`
			}
		]
	}
};

export default nextConfig;
