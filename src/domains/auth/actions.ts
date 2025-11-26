import { AUTH_ENDPOINTS } from '@/domains/auth/endpoints/external';
import {
	RefreshResponseSchema,
	type RefreshResponseType,
	SignInResponseSchema,
	type SignInResponseType
} from '@/domains/auth/schema';
import { apiFetchValidated } from '@/lib/api/api-fetch.server';

export async function authLogin(
	email: string,
	password: string
): Promise<SignInResponseType | null> {
	try {
		return await apiFetchValidated(
			AUTH_ENDPOINTS.LOGIN,
			SignInResponseSchema,
			{
				method: 'POST',
				body: JSON.stringify({ email, password })
			},
			false
		);
	} catch (e) {
		console.error(e);
		return null;
	}
}

export async function authRefresh(refreshToken: string): Promise<RefreshResponseType | null> {
	try {
		return await apiFetchValidated(
			AUTH_ENDPOINTS.REFRESH,
			RefreshResponseSchema,
			{
				method: 'POST',
				headers: {
					Authorization: `Bearer ${refreshToken}`
				}
			},
			false
		);
	} catch (e) {
		console.error(e);
		return null;
	}
}
