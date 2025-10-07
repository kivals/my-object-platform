import { BadgeCheck } from 'lucide-react';
import Image from 'next/image';

import { Badge } from '@/ui/Badge';
import { Card } from '@/ui/Card';

interface IPropertyCardProps {
	address: string;
	status: string;
	area: string;
	income: string;
	nextPayment: string;
	imageUrl: string;
}

export function PropertyCard({
	address,
	status,
	area,
	income,
	nextPayment,
	imageUrl
}: IPropertyCardProps) {
	return (
		<Card variant='xl' className='px-8 py-7 drop-shadow-lg'>
			<div className='text-h3 flex'>
				<div className='basis-1/2 font-medium flex flex-col gap-y-7 '>
					<div className=''>{address}</div>

					<div className='flex gap-x-1.5'>
						<Badge Icon={BadgeCheck} variant='success'>
							{status}
						</Badge>
						<Badge> {area} м2</Badge>
					</div>

					<div>
						<p className='mb-1'>Доход за месяц</p>
						<p className='text-[46px] font-bold'>{income} руб.</p>
					</div>

					<div>
						<p className='mb-1'>Ближайший платеж</p>
						<p className='text-[46px] font-bold'>{nextPayment}</p>
					</div>
				</div>
				<div className='basis-1/2 relative'>
					<Image
						className='absolute -right-18 bottom-0 w-[414px] h-[401px]'
						src={imageUrl}
						width={350}
						height={350}
						alt='Картинка'
					/>
				</div>
			</div>
		</Card>
	);
}
