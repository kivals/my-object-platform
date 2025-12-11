'use client';

import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { motion } from 'motion/react';

import { cn } from '@/utils/cn';

import type { IClassNames } from '@/types/components/classname.types';

interface OptionGroupProps<T extends string> extends IClassNames {
	options: Record<T, string>;
	value: T;
	areaLabel?: string;
	onChange?: (value: T) => void;
	title?: string;
	id?: string;
}

export function OptionGroup<T extends string>({
	options,
	value,
	areaLabel,
	classNames,
	onChange,
	title,
	id = String(Date.now())
}: OptionGroupProps<T>) {
	const keys = Object.keys(options) as T[];

	const handleValueChange = (nextValue: string) => {
		if (!nextValue || nextValue === value) return;

		onChange?.(nextValue as T);
	};

	return (
		<div className='flex flex-col gap-y-3.5'>
			{title && <span className='font-medium text-h3'>{title}</span>}
			<ToggleGroup.Root
				type='single'
				value={value}
				onValueChange={handleValueChange}
				className={cn(
					'relative inline-flex items-center gap-x-3 px-3 py-2 bg-[#DFDAFF] rounded-[20px] shadow-lg',
					classNames
				)}
				aria-label={areaLabel}
			>
				{keys.map(key => {
					const isActive = value === key;

					return (
						<ToggleGroup.Item
							key={key}
							value={key}
							className={cn(
								'relative flex items-center justify-center px-4 py-2.5 text-[18px] font-bold rounded-[15px] select-none transition-colors',
								isActive ? 'text-white' : 'text-primary hover:text-primary/80'
							)}
						>
							{isActive && (
								<motion.div
									layoutId={`pill-${id}`}
									className='absolute inset-0 bg-primary rounded-[15px]'
									transition={{ type: 'spring', stiffness: 400, damping: 30 }}
								/>
							)}

							<span className='relative z-10'>{options[key]}</span>
						</ToggleGroup.Item>
					);
				})}
			</ToggleGroup.Root>
		</div>
	);
}
