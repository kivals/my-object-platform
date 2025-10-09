import { ChevronLeft } from 'lucide-react';
import { type FormEvent, useState } from 'react';

import { PasswordInput } from '@/components/landings/auth/forms/inputs/PasswordInput';
import { passwordSchema } from '@/components/landings/auth/forms/verify-shemas';

import { Button } from '@/ui/Button';

interface IPasswordFormProps {
	onNextStep: () => void;
	goBack: () => void;
}

export function PasswordForm({ onNextStep, goBack }: IPasswordFormProps) {
	const [password, setPassword] = useState('');
	const [error, setError] = useState<string | null>(null);

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError(null);

		const resultVerify = passwordSchema.safeParse(password);
		if (!resultVerify.success) return setError(resultVerify.error.issues[0].message);

		//TODO запрос на пароль
		const response = true;

		if (response) {
			onNextStep();
		}
	};
	return (
		<form onSubmit={onSubmit} className='w-[600px]'>
			<h1 className='flex items-center gap-x-12 text-h2 font-bold mb-10'>
				<div
					onClick={goBack}
					className='cursor-pointer hover:opacity-60 transition-opacity flex justify-center items-center size-12 bg-[#f2f2f2] rounded-full'
				>
					<ChevronLeft className='text-[#868686]' size={32} />
				</div>
				<span>Добрый день, Александр!</span>
			</h1>

			<PasswordInput classNames='mb-7' error={error} onChange={setPassword} value={password} />

			<div className='flex flex-col gap-y-7'>
				<Button>Войти</Button>
				<Button variant='transparent'>Служба поддержки</Button>
			</div>
		</form>
	);
}
