import { getToken } from '@auth/core/jwt';

export const getAccessToken = async () => {
	const { headers, cookies } = require('next/headers');
	const req = {
		headers: Object.fromEntries(await headers()),
		cookies: Object.fromEntries(
			(await cookies()).getAll().map((c: { name: any; value: any }) => [c.name, c.value])
		)
	};
	const jwt = await getToken({ req, secret: process.env.AUTH_SECRET });
	if (!jwt) {
		return null;
	}

	return jwt.data.tokens.accessToken;
};
