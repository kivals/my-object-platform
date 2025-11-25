import { useRouter } from 'next/navigation';

import { NotificationButton } from '@/components/layout/header/NotificationButton';
import { UserMenu } from '@/components/layout/header/UserMenu';

import { cn } from '@/utils/cn';

import { LOGIN_URL } from '@/routes';
import type { IClassNames } from '@/types/components/classname.types';

interface IHeaderActions extends IClassNames {
	userName?: string;
}

export function HeaderActions({ classNames, userName }: IHeaderActions) {
	const router = useRouter();

	return (
		<div className={cn('flex items-center gap-x-4', classNames)}>
			<NotificationButton />
			<UserMenu
				classNames='h-12'
				name={userName || 'Неизвестный пользователь'}
				onLogout={async () => {
					await fetch('/api/auth/logout', { method: 'DELETE' });
					router.push(LOGIN_URL);
				}}
			/>
		</div>
	);
}
