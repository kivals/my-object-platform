import Link from 'next/link';

import { Button } from '@/ui/Button';
import { Icon } from '@/ui/Icon';

export function TenantsHeader() {
	return (
		<div className='flex justify-between items-center mb-5'>
			<h1 className='font-semibold text-h2'>Арендаторы</h1>
			<div className='flex gap-x-3.5'>
				<Button asChild variant='muted'>
					<Link href='#'>
						<Icon icon='Pencil' size={19} />
						Редактировать
					</Link>
				</Button>
				<Button asChild variant='default'>
					<Link href='#'>Добавить</Link>
				</Button>
			</div>
		</div>
	);
}
