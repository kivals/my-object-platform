import { type InputHTMLAttributes, type ReactNode, type Ref, forwardRef } from 'react';

import { Input } from '@/ui/Input';
import { Label } from '@/ui/Label';
import { Textarea } from '@/ui/Textarea';

import { cn } from '@/utils/cn';

import type { IClassNames } from '@/types/components/classname.types';

interface TextFieldProps
	extends IClassNames,
		InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
	label?: string;
	error?: string;
	labelClassName?: string;
	inputClassName?: string;
	suffix?: () => ReactNode;
	multiline?: boolean;
}

export const TextField = forwardRef<HTMLInputElement | HTMLTextAreaElement, TextFieldProps>(
	(
		{
			label,
			suffix,
			multiline,
			inputClassName,
			labelClassName,
			error,
			classNames,
			type = 'text',
			...props
		},
		ref
	) => {
		return (
			<div className={classNames}>
				{label && (
					<Label className={cn('mb-2.5', labelClassName)} htmlFor={props.id || props.name}>
						{label}
					</Label>
				)}
				<div className=' flex-1 flex gap-x-4 items-center'>
					{multiline ? (
						<Textarea
							className={cn(inputClassName)}
							ref={ref as Ref<HTMLTextAreaElement>}
							id={props.id || props.name}
							aria-invalid={!!error}
							{...props}
						/>
					) : (
						<Input
							className={cn(inputClassName)}
							ref={ref as Ref<HTMLInputElement>}
							id={props.id || props.name}
							type={type}
							aria-invalid={!!error}
							{...props}
						/>
					)}
					{suffix && suffix()}
				</div>

				{error && <p className='mt-2 text-sm text-red-600'>{error}</p>}
			</div>
		);
	}
);

TextField.displayName = 'TextField';
