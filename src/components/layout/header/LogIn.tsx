import Link from 'next/link';

import { Button } from '@/ui/Button';

export function LogIn() {
	return (
		<Button variant='muted'>
			<Link href='/auth'>Войти</Link>
		</Button>
	);
}
