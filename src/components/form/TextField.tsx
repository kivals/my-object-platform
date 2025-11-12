import { type InputHTMLAttributes, forwardRef } from 'react';

import { Input } from '@/ui/Input';
import { Label } from '@/ui/Label';

import type { IClassNames } from '@/types/components/classname.types';

interface TextFieldProps extends IClassNames, InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	error?: string;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
	({ label, error, classNames, type = 'text', ...props }, ref) => {
		return (
			<div className={classNames}>
				{label && (
					<Label className='mb-2.5' htmlFor={props.id || props.name}>
						{label}
					</Label>
				)}

				<Input
					ref={ref}
					id={props.id || props.name}
					type={type}
					aria-invalid={!!error}
					{...props}
				/>

				{error && <p className='mt-2 text-sm text-red-600'>{error}</p>}
			</div>
		);
	}
);

TextField.displayName = 'TextField';
