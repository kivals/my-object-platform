'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { startTransition, useActionState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { FormError } from '@/components/form/FormError';
import { TextField } from '@/components/form/TextField';

import { Button } from '@/ui/Button';

import { loginAction } from '@/actions/login.action';
import { LoginSchema } from '@/lib/auth/login.schema';

const initialState = { error: undefined, success: false };

export function LoginForm() {
	const [state, action, isPending] = useActionState(loginAction, initialState);

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<z.infer<typeof LoginSchema>>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: '',
			password: ''
		}
	});

	const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
		const formData = new FormData();
		formData.append('email', data.email);
		formData.append('password', data.password);
		startTransition(() => {
			action(formData);
			state.error = '';
		});
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='w-[600px]'>
			<h1 className='text-h2 font-bold mb-10'>Вход в систему</h1>

			<TextField
				type='email'
				label='Логин'
				placeholder='Введите логин'
				classNames='mb-7'
				error={errors.email?.message}
				{...register('email')}
			/>

			<TextField
				type='password'
				label='Пароль'
				placeholder='Введите пароль'
				classNames='mb-7'
				error={errors.password?.message}
				{...register('password')}
			/>

			<FormError classNames='mb-10' message={state.error} />

			<div className='flex flex-col gap-y-7'>
				<Button disabled={isPending} type='submit'>
					{isPending ? 'Ожидайте' : 'Продолжить'}
				</Button>

				<Button type='button' variant='transparent'>
					Служба поддержки
				</Button>
			</div>
		</form>
	);
}
