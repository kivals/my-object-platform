'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Button } from '@/ui/Button';

export function CreateCourtCaseButton() {
	const pathname = usePathname();
	return (
		<Button asChild>
			<Link href={`${pathname}/create`}>Создание судебного дела</Link>
		</Button>
	);
}
