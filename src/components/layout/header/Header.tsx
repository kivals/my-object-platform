'use client';

import type { Session } from 'next-auth';
import { usePathname } from 'next/navigation';
import { match } from 'path-to-regexp';
import { useEffect, useState } from 'react';

import { Container } from '@/components/layout/Container';
import { HeaderActions } from '@/components/layout/header/HeaderActions';
import { LogIn } from '@/components/layout/header/LogIn';
import { Logo } from '@/components/layout/header/Logo';

import { Icon } from '@/ui/Icon';

import { useToggleSidebar } from '@/store/use-ui.store';

import { cn } from '@/utils/cn';

import { DASHBOARD_URL, REAL_ESTATE_URL } from '@/routes';

interface IHeaderProps {
	session?: Session | null;
}

function shouldShowSidebarToggle(pathname: string) {
	if (!!match(`${REAL_ESTATE_URL}{/*path}/edit`)(pathname)) return false;
	return !!match([`${DASHBOARD_URL}{/*path}`, `${REAL_ESTATE_URL}{/*path}`])(pathname);
}

export function Header({ session }: IHeaderProps) {
	const pathname = usePathname();
	const toggleSidebar = useToggleSidebar();
	const [header, setHeader] = useState(false);

	useEffect(() => {
		const scrollHandler = () => {
			setHeader(window.scrollY > 10);
		};

		window.addEventListener('scroll', scrollHandler);
		scrollHandler();

		return () => window.removeEventListener('scroll', scrollHandler);
	}, []);

	return (
		<header
			className={cn(
				'transition-all py-6 sticky top-0 z-30',
				header && 'bg-white shadow-lg py-2'
			)}
		>
			<Container>
				<div className='flex z-30 justify-between items-center'>
					<div className='flex items-center gap-x-8'>
						{shouldShowSidebarToggle(pathname) && (
							<div onClick={toggleSidebar} className='cursor-pointer'>
								<Icon classNames='text-primary' icon='Menu' size={32} />
							</div>
						)}
						<Logo />
					</div>
					{session ? (
						<HeaderActions userName={session.user.fn} classNames='flex-1 justify-end ' />
					) : (
						<LogIn />
					)}
				</div>
			</Container>
		</header>
	);
}
