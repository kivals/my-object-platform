import { HeaderProfile } from '@/components/layout/header/HeaderProfile';
import { NotificationButton } from '@/components/layout/header/NotificationButton';

import { cn } from '@/utils/cn';

import type { IClassNames } from '@/types/components/classname.types';

export function HeaderActions({ classNames }: IClassNames) {
	return (
		<div className={cn('flex gap-x-4', classNames)}>
			<NotificationButton />
			<HeaderProfile />
		</div>
	);
}
