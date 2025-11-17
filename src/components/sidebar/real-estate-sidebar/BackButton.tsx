import { useRouter } from 'next/navigation';

import { Icon } from '@/ui/Icon';

export function BackButton() {
	const router = useRouter();

	return (
		<button
			onClick={() => router.back()}
			className='cursor-pointer flex items-center justify-center w-14 h-14 rounded-full bg-[#F2F2F2]'
		>
			<Icon classNames='text-[#868686]' icon='ChevronLeft' size={32} />
		</button>
	);
}
