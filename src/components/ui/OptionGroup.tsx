'use client';

import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { motion } from 'motion/react';
import { useState } from 'react';

import { cn } from '@/utils/cn';

import type { IClassNames } from '@/types/components/classname.types';

interface OptionGroupProps<T extends string> extends IClassNames {
	options: Record<T, string>;
	initial: T;
	areaLabel?: string;
}

export function OptionGroup<T extends string>({
	options,
	initial,
	areaLabel,
	classNames
}: OptionGroupProps<T>) {
	const keys = Object.keys(options) as T[];
	const [selected, setSelected] = useState<T>(initial);

	return (
		<ToggleGroup.Root
			type='single'
			value={selected}
			onValueChange={v => v && setSelected(v as T)}
			className={cn(
				'relative inline-flex items-center gap-x-3 px-3 py-2 bg-[#DFDAFF] rounded-[20px] shadow-lg',
				classNames
			)}
			aria-label={areaLabel}
		>
			{keys.map(key => {
				const isActive = selected === key;

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
								layoutId='pill'
								className='absolute inset-0 bg-primary rounded-[15px]'
								transition={{ type: 'spring', stiffness: 400, damping: 30 }}
							/>
						)}

						<span className='relative z-10'>{options[key]}</span>
					</ToggleGroup.Item>
				);
			})}
		</ToggleGroup.Root>
	);
}
