import { isRedirectError } from 'next/dist/client/components/redirect-error';

export function handleActionError(error: unknown, message: string) {
	if (isRedirectError(error)) throw error;
	console.error('[ACTION ERROR]', error);
	return { error: message };
}
