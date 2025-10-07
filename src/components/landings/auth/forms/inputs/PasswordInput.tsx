import { PASSWORD_MIN_CHARACTERS } from '@/components/landings/auth/forms/verify-shemas';

import { Input } from '@/ui/Input';
import { Label } from '@/ui/Label';

import type { IClassNames } from '@/types/components/classname.types';

interface IPasswordInputProps extends IClassNames {
	error: string | null;
	value: string;
	onChange: (value: string) => void;
	placeHolder?: string;
	label?: string;
}

export function PasswordInput({
	error,
	classNames,
	value,
	onChange,
	label = 'Пароль',
	placeHolder = 'Введите пароль повторно'
}: IPasswordInputProps) {
	return (
		<div className={classNames}>
			<Label className='mb-2.5' htmlFor='password'>
				{label}
			</Label>
			<Input
				id='password'
				value={value}
				onChange={e => onChange(e.target.value)}
				type='password'
				min={PASSWORD_MIN_CHARACTERS}
				placeholder={placeHolder}
			/>
			{error && <p className='text-sm text-red-600'>{error}</p>}
		</div>
	);
}
