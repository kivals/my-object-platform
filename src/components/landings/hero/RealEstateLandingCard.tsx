import { BadgeCheck } from 'lucide-react';
import Image from 'next/image';

import { Badge } from '@/ui/Badge';
import { Card } from '@/ui/Card';

import { cn } from '@/utils/cn';

interface IPropertyCardProps {
	address: string;
	status: string;
	area: string;
	income: string;
	nextPayment: string;
	imageUrl: string;
	size?: 'xs' | 'lg';
}

export function RealEstateLandingCard({
	address,
	status,
	area,
	income,
	nextPayment,
	imageUrl,
	size = 'lg'
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
						<Badge> {area} м²</Badge>
					</div>

					<div>
						<p className='mb-1'>Доход за месяц</p>
						<p className={cn('font-bold', size === 'xs' ? 'text-h2' : 'text-[46px] ')}>
							{income} руб.
						</p>
					</div>

					<div>
						<p className='mb-1'>Ближайший платеж</p>
						<p className={cn('font-bold', size === 'xs' ? 'text-h2' : 'text-[46px] ')}>
							{nextPayment}
						</p>
					</div>
				</div>
				<div className='basis-1/2 relative'>
					<Image
						className={cn('', {
							'absolute -right-18 bottom-0 w-[414px] h-[401px]': size === 'lg',
							'object-contain': size === 'xs'
						})}
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
