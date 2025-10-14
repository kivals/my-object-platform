'use client';

import { usePathname } from 'next/navigation';
import { match } from 'path-to-regexp';
import { useState } from 'react';

import { HeaderActions } from '@/components/layout/header/HeaderActions';
import { LogIn } from '@/components/layout/header/LogIn';
import { Logo } from '@/components/layout/header/Logo';

import { Icon } from '@/ui/Icon';

import { useSidebarOpen, useToggleSidebar } from '@/store/use-ui.store';

export function Header() {
	const [isLoggedIn] = useState(false);
	const pathname = usePathname();
	const toggleSidebar = useToggleSidebar();

	return (
		<header className='flex justify-between items-center py-5'>
			<div className='flex items-center gap-x-8'>
				{!!match('/dashboard{/*path}')(pathname) && (
					<div onClick={toggleSidebar} className='cursor-pointer'>
						<Icon classNames='text-primary' icon='Menu' size={32} />
					</div>
				)}
				<Logo />
			</div>
			{isLoggedIn ? <HeaderActions classNames='flex-1 justify-end ' /> : <LogIn />}
		</header>
	);
}
