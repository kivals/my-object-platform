'use server';

import { AuthError } from 'next-auth';
import { isRedirectError } from 'next/dist/client/components/redirect-error';

import { signIn } from '@/auth';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';

interface LoginState {
	error?: string;
	success?: boolean;
}

export const loginAction = async (_prevState: LoginState, formData: FormData) => {
	const email = formData.get('email');
	const password = formData.get('password');

	try {
		await signIn('credentials', {
			email,
			password,
			redirectTo: DEFAULT_LOGIN_REDIRECT
		});
		return { success: true };
	} catch (error) {
		// https://github.com/nextauthjs/next-auth/discussions/9389
		if (isRedirectError(error)) throw error;

		if (error instanceof AuthError) {
			switch (error.type) {
				case 'CredentialsSignin':
					return { error: 'Неверные логин или пароль!' };
				default: {
					return { error: 'Ошибка авторизации. Попробуйте позже!' };
				}
			}
		}
		return { error: 'Ошибка авторизации. Попробуйте позже!' };
	}
};
