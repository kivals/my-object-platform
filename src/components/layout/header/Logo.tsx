import { Building2 } from 'lucide-react';

import { cn } from '@/utils/cn';

import type { IClassNames } from '@/types/components/classname.types';

interface ILogoProps extends IClassNames {
	iconSize?: number;
}

export function Logo({ classNames, iconSize = 28 }: ILogoProps) {
	return (
		<div className={cn('text-logo select-none flex gap-x-3 items-center leading-none', classNames)}>
			<Building2 className='text-primary' size={iconSize} />
			<p className='font-semibold'>
				Мой <span className='text-primary'>Объект</span>
			</p>
		</div>
	);
}
