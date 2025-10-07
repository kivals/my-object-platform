import { type FormEvent, useState } from 'react';

import { LoginInput } from '@/components/landings/auth/forms/inputs/LoginInput';
import { LOGIN_MIN_CHARACTERS, loginSchema } from '@/components/landings/auth/forms/verify-shemas';

import { Button } from '@/ui/Button';

interface ILoginFormProps {
	onNextStep: () => void;
	onRegisterStep: () => void;
}

export function LoginForm({ onNextStep, onRegisterStep }: ILoginFormProps) {
	const [login, setLogin] = useState('');
	const [error, setError] = useState<string | null>(null);

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError(null);

		const resultVerify = loginSchema.safeParse(login);
		if (!resultVerify.success) return setError(resultVerify.error.issues[0].message);

		onNextStep();
	};

	return (
		<form onSubmit={onSubmit} className='w-[600px]'>
			<h1 className='text-h2 font-bold mb-10'>Вход или регистрация</h1>

			<LoginInput classNames='mb-7' error={error} value={login} onChange={setLogin} />

			<div className='flex flex-col gap-y-7'>
				<Button disabled={!login || login.length < LOGIN_MIN_CHARACTERS}>Продолжить</Button>
				<Button onClick={onRegisterStep}>Зарегистрироваться</Button>
				<Button variant='transparent'>Служба поддержки</Button>
			</div>
		</form>
	);
}
