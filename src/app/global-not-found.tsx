import type { Metadata } from 'next';
import { Jura } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';

import { Logo } from '@/components/layout/header/Logo';

import { Button } from '@/ui/Button';

import './globals.css';
import { DASHBOARD_URL } from '@/routes';

const jura = Jura({
	variable: '--font-jura',
	subsets: ['latin', 'cyrillic'],
	weight: ['400', '500', '600', '700'],
	display: 'swap'
});

export const metadata: Metadata = {
	title: '404 - Page Not Found',
	description: 'The page you are looking for does not exist.'
};

export default function GlobalNotFound() {
	return (
		<html className={jura.className} lang='ru'>
			<body>
				<main className='min-h-screen flex pt-20'>
					<section className='flex w-full'>
						<div className='flex-1 basis-0 flex items-end relative overflow-hidden'>
							<div className='absolute right-0 bottom-[-70px] left-[-150px]'>
								<Image src='/images/auth/house.png' alt='картинка' width='1055' height='1055' />
							</div>
						</div>
						<div className={'flex-1 flex items-center flex-col gap-y-28 basis-0'}>
							<Logo className='text-h1' iconSize={64} />
							<div className={'flex flex-col items-center py-14 bg-white rounded-xl max-w-[830px]'}>
								<div className='w-full max-w-xl text-center'>
									<p className='text-body text-muted-foreground'>Ошибка</p>

									<h1 className='mt-2 text-6xl font-bold tracking-tight'>404</h1>
									<p className='mt-3 text-lg'>
										Страница не найдена. Возможно, ссылка устарела или вы ошиблись адресом.
									</p>

									<div className='mt-8 flex items-center justify-center gap-3'>
										<Button asChild>
											<Link href={DASHBOARD_URL}>Вернуться на главную</Link>
										</Button>
									</div>

									<div className='mt-10 text-body text-muted-foreground'>
										Если уверены, что это ошибка — сообщите в поддержку.
									</div>
								</div>
							</div>
						</div>
					</section>
				</main>
			</body>
		</html>
	);
}
