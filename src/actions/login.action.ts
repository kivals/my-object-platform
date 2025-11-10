'use server';

import { AuthError } from 'next-auth';

import { signIn } from '@/auth';
import { LoginSchema } from '@/lib/validation/schemas';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';

interface LoginState {
	error?: string;
	success?: boolean;
}

export const loginAction = async (_prevState: LoginState, formData: FormData) => {
	const data = {
		email: formData.get('email'),
		password: formData.get('password')
	};

	const validatedData = LoginSchema.parse(data);

	if (!validatedData) {
		return { error: 'Введены некорректные данные' };
	}

	const { email, password } = validatedData;

	try {
		await signIn('credentials', {
			email: email,
			password: password,
			redirectTo: DEFAULT_LOGIN_REDIRECT
		});
		return { success: false };
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
		throw error;
	}
};
