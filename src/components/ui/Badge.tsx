import { type VariantProps, cva } from 'class-variance-authority';
import type { LucideIcon } from 'lucide-react';
import type { PropsWithChildren } from 'react';

import { cn } from '@/utils/cn';

import type { IClassNames } from '@/types/components/classname.types';

const badgeVariants = cva(
	'inline-flex items-center font-bold text-h3 gap-x-2.5 rounded-[15px] px-6 py-2.5',
	{
		variants: {
			variant: {
				default: 'bg-[#BCBCBC]/20 text-[#868686]',
				success: 'bg-[#2CFF2C]/20 text-[#27EC00]',
				muted: 'bg-[#E2E2E2]/20 text-black/50'
			}
		},
		defaultVariants: {
			variant: 'default'
		}
	}
);

interface IBadgeProps extends IClassNames {
	Icon?: LucideIcon;
}

export function Badge({
	children,
	Icon,
	variant,
	className
}: PropsWithChildren<IBadgeProps & VariantProps<typeof badgeVariants>>) {
	return (
		<div className={cn(badgeVariants({ variant }), className)}>
			{Icon && <Icon size={20} />}
			{children}
		</div>
	);
}
