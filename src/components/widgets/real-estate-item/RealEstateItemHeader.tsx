'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Button } from '@/ui/Button';
import { Icon } from '@/ui/Icon';

export function RealEstateItemHeader() {
	const pathname = usePathname();

	return (
		<div className='flex justify-between items-center mb-5'>
			<h1 className='font-semibold text-h2'>Описание объекта</h1>
			<Button asChild variant='default'>
				<Link href={`${pathname}/edit`}>
					<Icon icon='Pencil' size={19} />
					Редактировать
				</Link>
			</Button>
		</div>
	);
}
