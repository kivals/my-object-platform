import Link from 'next/link';

import { Button } from '@/ui/Button';

import { PAGES } from '@/config/page.config';

export function LogIn() {
	return (
		<Button variant='muted'>
			<Link href={PAGES.AUTH}>Войти</Link>
		</Button>
	);
}
