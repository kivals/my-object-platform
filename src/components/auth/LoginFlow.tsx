import Image from 'next/image';

import { LoginForm } from '@/components/auth/LoginForm';
import { Logo } from '@/components/layout/header/Logo';

export function LoginFlow() {
	return (
		<section className='flex w-full'>
			<div className='flex-1 basis-0 flex items-end relative overflow-hidden'>
				<div className='absolute right-0 bottom-[-70px] left-[-150px]'>
					<Image src='/images/auth/house.png' alt='картинка' width='1055' height='1055' />
				</div>
			</div>
			<div className={'flex-1 flex items-center flex-col gap-y-28 basis-0'}>
				<Logo className='text-h1' iconSize={64} />
				<div className={'flex flex-col items-center py-14 px-20 bg-white rounded-xl max-w-[830px]'}>
					<LoginForm />
				</div>
			</div>
		</section>
	);
}
