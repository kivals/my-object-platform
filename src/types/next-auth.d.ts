import type { User } from 'next-auth';

import type { AuthValidity, UserObject } from '@/lib/auth/types';
import type { SignInResponseType } from '@/domains/auth/schema';

type RefreshError = 'RefreshTokenExpired' | 'RefreshAccessTokenError' | null;

declare module 'next-auth' {
	export interface User {
		id: string;
		tokens: SignInResponseType;
		user: UserObject;
		validity: AuthValidity;
	}

	export interface Session {
		user: UserObject;
		validity: AuthValidity;
		error: RefreshError;
	}
}

declare module 'next-auth/jwt' {
	export interface JWT {
		data: User;
		error: RefreshError;
	}
}
