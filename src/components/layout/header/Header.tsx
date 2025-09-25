'use client';

import { useState } from 'react';

import { HeaderActions } from '@/components/layout/header/HeaderActions';
import { LogIn } from '@/components/layout/header/LogIn';
import { Logo } from '@/components/layout/header/Logo';

export function Header() {
	const [isLoggedIn, setIsLoggedIn] = useState(true);
	return (
		<header className='flex justify-between items-center pl-4 py-5'>
			<Logo />
			{isLoggedIn ? <HeaderActions classNames='flex-1 justify-end ' /> : <LogIn />}
		</header>
	);
}
