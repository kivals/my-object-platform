import { getToken } from '@auth/core/jwt';
import { cookies, headers } from 'next/headers';

export const getAccessToken = async () => {
	const req = {
		headers: Object.fromEntries(await headers()),
		cookies: Object.fromEntries((await cookies()).getAll().map(c => [c.name, c.value]))
	};
	const jwt = await getToken({ req, secret: process.env.AUTH_SECRET });
	if (!jwt) {
		return null;
	}

	return jwt.data.tokens.accessToken;
};
