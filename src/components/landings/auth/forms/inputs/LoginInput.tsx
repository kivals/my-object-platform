import { LOGIN_MIN_CHARACTERS } from '@/components/landings/auth/forms/verify-shemas';

import { Input } from '@/ui/Input';
import { Label } from '@/ui/Label';

import type { IClassNames } from '@/types/components/classname.types';

interface ILoginInputProps extends IClassNames {
	error: string | null;
	value: string;
	onChange: (value: string) => void;
}

export function LoginInput({ error, classNames, value, onChange }: ILoginInputProps) {
	return (
		<div className={classNames}>
			<Label className='mb-2.5' htmlFor='login'>
				Логин
			</Label>
			<Input
				id='login'
				type='email'
				value={value}
				onChange={e => onChange(e.target.value)}
				placeholder='Введите логин'
				min={LOGIN_MIN_CHARACTERS}
			/>
			{error && <p className='text-sm text-red-600'>{error}</p>}
		</div>
	);
}
