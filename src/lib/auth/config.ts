import type { NextAuthConfig } from 'next-auth';
import type { JWT } from 'next-auth/jwt';
import Credentials from 'next-auth/providers/credentials';

import { authLogin, authRefresh } from '@/domains/auth/actions';
import { LoginSchema } from '@/lib/auth/login.schema';
import type { AuthValidity, UserObject } from '@/lib/auth/types';
import { decodeJwt } from '@/lib/auth/utils/decode';

async function refreshAccessToken(nextAuthJWTCookie: JWT): Promise<JWT> {
	try {
		const tokens = await authRefresh(nextAuthJWTCookie.data.tokens.refreshToken);

		if (!tokens) {
			throw new Error('Tokens is not exist');
		}

		const access = decodeJwt(tokens.accessToken);
		const refresh = decodeJwt(tokens.refreshToken);

		nextAuthJWTCookie.data.validity.valid_until = access.exp;
		nextAuthJWTCookie.data.validity.refresh_until = refresh.exp;
		nextAuthJWTCookie.data.tokens.accessToken = tokens.accessToken;
		nextAuthJWTCookie.data.tokens.refreshToken = tokens.refreshToken;

		return { ...nextAuthJWTCookie, error: null };
	} catch {
		return {
			...nextAuthJWTCookie,
			error: 'RefreshAccessTokenError'
		};
	}
}

export const authConfig = {
	debug: process.env.NODE_ENV !== 'production',
	session: {
		strategy: 'jwt'
	},
	providers: [
		Credentials({
			credentials: {
				email: { label: 'Email', type: 'email' },
				password: { label: 'Password', type: 'password' }
			},
			authorize: async credentials => {
				const parsed = LoginSchema.safeParse(credentials);

				if (!parsed.success) {
					return null;
				}

				const { email, password } = parsed.data;

				try {
					const tokens = await authLogin(email, password);
					if (!tokens) return null;

					const access = decodeJwt(tokens.accessToken);
					const refresh = decodeJwt(tokens.refreshToken);

					const user: UserObject = {
						name: access.name ?? 'Пользователь',
						role: access.role
					};

					const validity: AuthValidity = {
						valid_until: access.exp,
						refresh_until: refresh.exp
					};

					return {
						id: refresh.sub,
						tokens: tokens,
						user: user,
						validity: validity
					};
				} catch (e) {
					throw e;
				}
			}
		})
	],
	callbacks: {
		async jwt({ token, user, account }) {
			// Первичный логин
			if (user && account) {
				console.debug('JWT Initial signin');
				return { ...token, data: user };
			}

			// Access токен жив
			if (Date.now() < token.data.validity.valid_until * 1000) {
				console.debug('Access token is still valid');
				return token;
			}

			// Access истёк, Refresh жив
			if (Date.now() < token.data.validity.refresh_until * 1000) {
				console.debug('Access token is being refreshed');
				return await refreshAccessToken(token);
			}

			// Всё умерло
			console.debug('Both tokens have expired');
			return { ...token, error: 'RefreshTokenExpired' };
		},
		/**
		 * формируем объект session, который попадёт в клиент
		 * ВАЖНО: accessToken и refreshToken мы сюда НЕ кладём
		 */
		async session({ session, token }) {
			return {
				...session,
				user: token.data.user,
				validity: token.data.validity,
				error: token.error
			};
		}
	}
} satisfies NextAuthConfig;
