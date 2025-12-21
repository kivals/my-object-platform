import Link from 'next/link';

import { Button } from '@/ui/Button';

import { DASHBOARD_URL } from '@/routes';

export default function NotFound() {
	return (
		<main className='min-h-[calc(80vh-0px)] flex items-center justify-center px-4'>
			<div className='w-full max-w-xl text-center'>
				<p className='text-body text-muted-foreground'>Ошибка</p>

				<h1 className='mt-2 text-6xl font-bold tracking-tight'>404</h1>
				<p className='mt-3 text-lg'>
					Объект недвижимости не найден. Возможно, ссылка устарела или вы ошиблись адресом.
				</p>

				<div className='mt-8 flex items-center justify-center gap-3'>
					<Button asChild>
						<Link href={DASHBOARD_URL}>Вернуться к списку объектов недвижимости</Link>
					</Button>
				</div>

				<div className='mt-10 text-body text-muted-foreground'>
					Если уверены, что это ошибка — сообщите в поддержку.
				</div>
			</div>
		</main>
	);
}
