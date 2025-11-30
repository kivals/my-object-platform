import Link from 'next/link';

import { Badge } from '@/ui/Badge';
import { Icon } from '@/ui/Icon';

import { cn } from '@/utils/cn';

interface IDocumentItemProps {
	isCompleted: boolean;
	name: string;
	url: string;
}

export function DocumentItem({ name, isCompleted, url }: IDocumentItemProps) {
	const label = isCompleted ? 'Завершенный' : 'Действующий';

	return (
		<div
			className={cn(
				'flex flex-col justify-between relative w-[200px] h-[256px] px-2 py-3 rounded-[15px] ',
				isCompleted ? 'bg-[#F2F2F2]' : 'bg-[#2CFF2C]/10'
			)}
		>
			<div className='flex items-center justify-between'>
				<Badge
					classNames='self-start rounded-[8px] px-3 py-1.5 text-[12px]'
					variant={isCompleted ? 'muted' : 'success'}
				>
					{label}
				</Badge>
				<Link href={url}>
					<Icon classNames='text-[#868686]' icon='Download' size={25} />
				</Link>
			</div>

			<Icon
				classNames={cn(
					'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
					isCompleted ? 'text-[#717171]/50' : 'text-[#27EC00]'
				)}
				icon='FileTextIcon'
				size={85}
				strokeWidth={1}
			/>
			<span className='truncate text-wrap text-body font-medium'>{name}</span>
		</div>
	);
}
