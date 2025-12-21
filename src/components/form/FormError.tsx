import { OctagonAlert } from 'lucide-react';
import React from 'react';

import { cn } from '@/utils/cn';

import type { IClassNames } from '@/types/components/classname.types';

interface IFormErrorProps extends IClassNames {
	message?: string;
}

export function FormError({ message, className }: IFormErrorProps) {
	if (!message) return null;

	return (
		<div
			className={cn('p-3 rounded-md flex items-center gap-x-2 text-h3', className)}
		>
			<OctagonAlert className='text-red-600 h-8 w-8' />
			<p className="text-red-600 font-medium">{message}</p>
		</div>
	);
}
