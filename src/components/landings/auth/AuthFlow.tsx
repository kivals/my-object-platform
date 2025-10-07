'use client';

import Image from 'next/image';
import { useState } from 'react';

import { LoginForm } from '@/components/landings/auth/forms/LoginForm';
import { PasswordForm } from '@/components/landings/auth/forms/PasswordForm';
import { RegisterForm } from '@/components/landings/auth/forms/RegisterForm';
import { Logo } from '@/components/layout/header/Logo';

import { cn } from '@/utils/cn';

type TStep = 'login' | 'password' | 'register';

export function AuthFlow() {
	const [step, setStep] = useState<TStep>('login');

	const handlerIdentity = () => {
		//TODO запрос на индентификацию
		const isIdentity = true;

		if (isIdentity) return setStep('password');

		return setStep('register');
	};

	return (
		<section className='flex w-full'>
			<div className='flex-1 basis-0 flex items-end relative overflow-hidden'>
				<div className='absolute right-0 bottom-[-70px] left-[-150px]'>
					<Image src='/images/auth/house.png' alt='картинка' width='1055' height='1055' />
				</div>
			</div>
			<div
				className={cn(
					'flex-1 flex items-center flex-col gap-y-28 basis-0',
					step === 'register' && 'gap-y-7'
				)}
			>
				<Logo classNames='text-h1' iconSize={64} />
				<div
					className={cn(
						'flex flex-col items-center py-14 px-20 bg-white rounded-xl max-w-[830px]',
						step === 'register' && 'py-8'
					)}
				>
					{step === 'login' && (
						<LoginForm onNextStep={handlerIdentity} onRegisterStep={() => setStep('register')} />
					)}

					{step === 'password' && (
						<PasswordForm
							onNextStep={() => console.log('Пользователь авторизирован')}
							goBack={() => setStep('login')}
						/>
					)}

					{step === 'register' && (
						<RegisterForm
							onNextStep={() => console.log('Пользователь зарегистрирован')}
							goBack={() => setStep('login')}
						/>
					)}
				</div>
			</div>
		</section>
	);
}
