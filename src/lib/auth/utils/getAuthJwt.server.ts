import { getToken } from '@auth/core/jwt';
import { cookies, headers } from 'next/headers';

export const getAuthTokens = async () => {
	const req = {
		headers: Object.fromEntries(await headers()),
		cookies: Object.fromEntries((await cookies()).getAll().map(c => [c.name, c.value]))
	};
	const jwt = await getToken({ req, secret: process.env.AUTH_SECRET });
	if (!jwt) {
		return null;
	}
	return {
		accessToken: jwt.data.tokens.accessToken,
		refreshToken: jwt.data.tokens.refreshToken
	};
};
