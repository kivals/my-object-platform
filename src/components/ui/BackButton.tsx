'use client';

import { useRouter } from 'next/navigation';

import { Icon } from '@/ui/Icon';

import { cn } from '@/utils/cn';

import type { IClassNames } from '@/types/components/classname.types';

interface IBackButtonProps extends IClassNames {
	backUrl: string;
}

export function BackButton({ className, backUrl }: IBackButtonProps) {
	const router = useRouter();

	return (
		<button
			onClick={() => router.push(backUrl)}
			className={cn(
				'cursor-pointer flex items-center justify-center w-14 h-14 rounded-full bg-[#F2F2F2]',
				className
			)}
		>
			<Icon className='text-[#868686]' icon='ChevronLeft' size={32} />
		</button>
	);
}
