'use server';

import { AuthError } from 'next-auth';

import { signIn } from '@/auth';
import { handleActionError } from '@/lib/actions/handleActionError';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';

export const loginAction = async (_prevState: IActionState, formData: FormData) => {
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
		if (error instanceof AuthError) {
			switch (error.type) {
				case 'CredentialsSignin':
					return { error: 'Неверные логин или пароль!' };
				default: {
					return { error: 'Ошибка авторизации. Попробуйте позже!' };
				}
			}
		}
		return handleActionError(error, 'Ошибка авторизации. Попробуйте позже!');
	}
};
