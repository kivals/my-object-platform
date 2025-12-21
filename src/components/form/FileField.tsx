import { type ChangeEvent, useRef } from 'react';

import { Button } from '@/ui/Button';
import { Icon } from '@/ui/Icon';

import { cn } from '@/utils/cn';

interface FileFieldProps {
	label?: string;
	filename?: string;
	onChange?: (file: File | null) => void;
	className?: string;
	accept?: string;
}

export function FileField({ label, filename, onChange, className, accept }: FileFieldProps) {
	const inputRef = useRef<HTMLInputElement>(null);

	const handleClick = () => inputRef.current?.click();

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0] ?? null;
		onChange?.(file);
	};

	return (
		<div className={cn(className)}>
			{label && <p className='mb-2 font-medium text-h3'>{label}</p>}

			<div className='flex gap-x-3.5 pr-0 items-center justify-between rounded-xl h-16 bg-white px-5 shadow-[0_0_8px_0_rgb(0_0_0_/_22%)]'>
				<div className='flex items-center gap-x-2.5 text-primary overflow-hidden'>
					<Icon className='shrink-0' icon='Paperclip' size={24} />
					<span className='truncate '>{filename || 'Файл не выбран'}</span>
				</div>

				<Button className='h-full' type='button' variant='muted' onClick={handleClick}>
					Изменить
				</Button>
			</div>

			<input
				ref={inputRef}
				type='file'
				className='hidden'
				onChange={handleChange}
				accept={accept}
			/>
		</div>
	);
}
