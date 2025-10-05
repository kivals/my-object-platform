import { type VariantProps, cva } from 'class-variance-authority';
import type { LucideIcon } from 'lucide-react';
import type { PropsWithChildren } from 'react';

import { cn } from '@/utils/cn';

const badgeVariants = cva(
	'inline-flex items-center font-bold text-h3 gap-x-2.5 rounded-[15px] px-8 py-2.5',
	{
		variants: {
			variant: {
				default: 'bg-[#BCBCBC]/20 text-[#868686]',
				success: 'bg-[#2CFF2C]/20 text-[#27EC00]'
			}
		},
		defaultVariants: {
			variant: 'default'
		}
	}
);

interface IBadgeProps {
	Icon?: LucideIcon;
}

export function Badge({
	children,
	Icon,
	variant
}: PropsWithChildren<IBadgeProps & VariantProps<typeof badgeVariants>>) {
	return (
		<div className={cn(badgeVariants({ variant }))}>
			{Icon && <Icon size={20} />}
			{children}
		</div>
	);
}
