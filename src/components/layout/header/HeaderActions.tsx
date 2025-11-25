import { signOut } from 'next-auth/react';

import { NotificationButton } from '@/components/layout/header/NotificationButton';
import { UserMenu } from '@/components/layout/header/UserMenu';

import { cn } from '@/utils/cn';

import { LOGIN_URL } from '@/routes';
import type { IClassNames } from '@/types/components/classname.types';

interface IHeaderActions extends IClassNames {
	userName?: string;
}

export function HeaderActions({ classNames, userName }: IHeaderActions) {
	return (
		<div className={cn('flex items-center gap-x-4', classNames)}>
			<NotificationButton />
			<UserMenu
				classNames='h-12'
				name={userName || 'Неизвестный пользователь'}
				onLogout={() =>
					signOut({
						redirectTo: LOGIN_URL
					})
				}
			/>
		</div>
	);
}
