import { isRedirectError } from 'next/dist/client/components/redirect-error';
import { redirect } from 'next/navigation';

import { ApiError } from '@/lib/api/api-error';
import { LOGIN_URL } from '@/routes';

export function handleActionError(error: unknown, message: string) {
	if (error instanceof ApiError && error.status === 401) {
		redirect(LOGIN_URL);
	}
	// https://github.com/nextauthjs/next-auth/discussions/9389
	if (isRedirectError(error)) throw error;
	console.error('[ACTION ERROR]', error);
	return { error: message };
}
