import { HeaderProfile } from '@/components/layout/header/HeaderProfile';
import { NotificationButton } from '@/components/layout/header/NotificationButton';

import { cn } from '@/utils/cn';

import type { IClassNames } from '@/types/components/classname.types';

interface IHeaderActions extends IClassNames {
	userName?: string;
}

export function HeaderActions({ classNames, userName }: IHeaderActions) {
	return (
		<div className={cn('flex items-center gap-x-4', classNames)}>
			<NotificationButton />
			<HeaderProfile name={userName || 'Неизвестный пользователь'} />
		</div>
	);
}
