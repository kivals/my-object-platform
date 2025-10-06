import Image from 'next/image';

import { AuthForm } from '@/components/landings/auth/AuthForm';
import { Logo } from '@/components/layout/header/Logo';

export function Auth() {
	return (
		<section className='flex w-full'>
			<div className='flex-1 basis-0 flex items-end relative overflow-hidden'>
				<div className='absolute right-0 bottom-[-70px] left-[-150px]'>
					<Image
						className=''
						src='/images/auth/house.png'
						alt='картинка'
						width='1055'
						height='1055'
					/>
				</div>
			</div>
			<div className='flex-1 flex items-center flex-col gap-y-28 basis-0'>
				<Logo classNames='text-h1' iconSize={64} />
				<AuthForm />
			</div>
		</section>
	);
}
