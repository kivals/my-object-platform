import type { ComponentProps } from 'react';

import { cn } from '@/utils/cn';

function Input({ className, type, ...props }: ComponentProps<'input'>) {
	return (
		<input
			onWheel={e => {
				if (type === 'number') e.currentTarget.blur();
			}}
			type={type}
			data-slot='input'
			className={cn(
				'placeholder:text-muted-foreground text-h3 h-16 w-full min-w-0 rounded-xl bg-transparent px-5 py-4 text-base shadow-[0_0_8px_0_rgb(0_0_0_/_22%)] transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
				'focus-visible:border-red-800 focus-visible:ring-primary focus-visible:ring-[2px]',
				'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
				className
			)}
			{...props}
		/>
	);
}

export { Input };
