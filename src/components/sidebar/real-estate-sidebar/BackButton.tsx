import { useRouter } from 'next/navigation';

import { Icon } from '@/ui/Icon';

import { cn } from '@/utils/cn';

import type { IClassNames } from '@/types/components/classname.types';

export function BackButton({ classNames }: IClassNames) {
	const router = useRouter();

	return (
		<button
			onClick={() => router.back()}
			className={cn(
				'cursor-pointer flex items-center justify-center w-14 h-14 rounded-full bg-[#F2F2F2]',
				classNames
			)}
		>
			<Icon classNames='text-[#868686]' icon='ChevronLeft' size={32} />
		</button>
	);
}
