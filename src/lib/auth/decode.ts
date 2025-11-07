import type { DecodedJWT } from '@/lib/auth/types';

export function decodeJwt(token: string): DecodedJWT {
	const [, payloadB64] = token.split('.');
	const json = Buffer.from(payloadB64, 'base64').toString('utf8');
	return JSON.parse(json);
}
