import { type VariantProps, cva } from 'class-variance-authority';
import type { ComponentProps } from 'react';

import { cn } from '@/utils/cn';

const cardVariants = cva('bg-white', {
	variants: {
		variant: {
			sm: 'rounded-[8px]',
			md: 'rounded-[15px]',
			lg: 'rounded-[20px]',
			xl: 'rounded-[40px]'
		}
	},
	defaultVariants: {
		variant: 'sm'
	}
});

export function Card({
	className,
	variant,
	...props
}: ComponentProps<'div'> & VariantProps<typeof cardVariants>) {
	return <div className={cn(cardVariants({ variant, className }))} {...props} />;
}
