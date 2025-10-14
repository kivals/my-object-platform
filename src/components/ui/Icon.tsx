import type { LucideIcon } from 'lucide-react';

import { LUCIDE_ICONS } from '@/components/icons/lucide.icons';

import { cn } from '@/utils/cn';

import type { IClassNames } from '@/types/components/classname.types';
import type { TLucideIcons } from '@/types/components/lucide.types';

interface IconProps extends IClassNames {
	icon: TLucideIcons;
	size: number;
}

export function Icon({ icon, size, classNames }: IconProps) {
	const Icon: LucideIcon = LUCIDE_ICONS[icon];
	if (!Icon) return;

	return <Icon className={cn(classNames)} size={size} />;
}
