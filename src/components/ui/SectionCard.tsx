import { type ReactNode } from 'react';

import { cn } from '@/utils/cn';

import type { IClassNames } from '@/types/components/classname.types';

export function SectionCard({ children, className }: { children: ReactNode } & IClassNames) {
	return (
		<div
			className={cn(
				'shadow-md flex flex-col gap-y-2 bg-white rounded-[20px] px-12 py-4',
				className
			)}
		>
			{children}
		</div>
	);
}
