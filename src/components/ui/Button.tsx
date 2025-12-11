import { Slot } from '@radix-ui/react-slot';
import { type VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/utils/cn';

const buttonVariants = cva(
	'inline-flex text-h3 font-bold items-center justify-center gap-2 whitespace-nowrap rounded-xl text-text transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none shrink-0 outline-none focus-visible:border-ring focus-visible:ring-primary/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
	{
		variants: {
			variant: {
				default: 'bg-primary text-white hover:bg-primary/80',
				muted: 'bg-primary/20 text-primary hover:bg-primary/40',
				transparent: 'bg-transparent text-primary hover:text-primary/80 cursor-pointer',
				attention: 'bg-red-500 text-white hover:text-white/80 cursor-pointer',
				ghost: 'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50'
			},
			size: {
				default: 'py-3.5 px-9',
				icon: 'size-9'
			}
		},
		defaultVariants: {
			variant: 'default',
			size: 'default'
		}
	}
);

function Button({
	className,
	variant,
	size,
	asChild = false,
	...props
}: React.ComponentProps<'button'> &
	VariantProps<typeof buttonVariants> & {
		asChild?: boolean;
	}) {
	const Comp = asChild ? Slot : 'button';
	return (
		<Comp
			data-slot='button'
			className={cn(buttonVariants({ variant, size, className }))}
			{...props}
		/>
	);
}

export { Button, buttonVariants };
