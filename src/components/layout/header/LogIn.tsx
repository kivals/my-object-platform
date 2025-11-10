import Link from 'next/link';

import { Button } from '@/ui/Button';

import { LOGIN_URL } from '@/routes';

export function LogIn() {
	return (
		<Button variant='muted'>
			<Link href={LOGIN_URL}>Войти</Link>
		</Button>
	);
}
