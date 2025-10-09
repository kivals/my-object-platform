import { ChevronLeft } from 'lucide-react';
import { type FormEvent, useState } from 'react';
import { z } from 'zod';

import { LoginInput } from '@/components/landings/auth/forms/inputs/LoginInput';
import { PasswordInput } from '@/components/landings/auth/forms/inputs/PasswordInput';
import { registerSchema } from '@/components/landings/auth/forms/verify-shemas';

import { Button } from '@/ui/Button';

interface IPasswordFormProps {
	onNextStep: () => void;
	goBack: () => void;
}

type TFormErrors = {
	login: string | null;
	password: string | null;
	confirm: string | null;
};

const defaultErrors: TFormErrors = {
	login: null,
	password: null,
	confirm: null
};

export function RegisterForm({ onNextStep, goBack }: IPasswordFormProps) {
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');
	const [confirm, setConfirm] = useState('');
	const [errors, setErrors] = useState<TFormErrors>(defaultErrors);

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setErrors(defaultErrors);

		const resultVerify = registerSchema.safeParse({
			login,
			password,
			confirm
		});
		if (!resultVerify.success) {
			const { fieldErrors } = z.flattenError(resultVerify.error);
			setErrors({
				login: fieldErrors.login?.[0] ?? null,
				password: fieldErrors.password?.[0] ?? null,
				confirm: fieldErrors.confirm?.[0] ?? null // сюда попадёт и супер-рефайн
			});

			return;
		}

		//TODO запрос на пароль
		const response = false;

		if (response) {
			onNextStep();
		}
	};

	return (
		<form onSubmit={onSubmit} className='w-[600px]'>
			<h1 className='flex items-center gap-x-12 text-h2 font-bold mb-8'>
				<div
					onClick={goBack}
					className='cursor-pointer hover:opacity-60 transition-opacity flex justify-center items-center size-12 bg-[#f2f2f2] rounded-full'
				>
					<ChevronLeft className='text-[#868686]' size={32} />
				</div>
				<span>Пройдите регистрацию</span>
			</h1>

			<LoginInput classNames='mb-7' error={errors.login} value={login} onChange={setLogin} />
			<PasswordInput
				classNames='mb-7'
				error={errors.password}
				onChange={setPassword}
				value={password}
			/>
			<PasswordInput
				label='Повторите пароль'
				classNames='mb-7'
				error={errors.confirm}
				onChange={setConfirm}
				value={confirm}
				placeHolder='Повторно введите пароль'
			/>

			<div className='flex flex-col gap-y-7'>
				<Button>Зарегистрироваться</Button>
				<Button variant='transparent'>Служба поддержки</Button>
			</div>
		</form>
	);
}
