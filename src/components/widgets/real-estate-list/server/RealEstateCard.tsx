import { BadgeCheck } from 'lucide-react';

import { Badge } from '@/ui/Badge';
import { Card } from '@/ui/Card';
import { LoadingImage } from '@/ui/LoadingImage';

import { cn } from '@/utils/cn';

import type { RealEstate } from '@/domains/real-estate/api/schema';

interface IPropertyCardProps {
	data: RealEstate;
	size?: 'xs' | 'lg';
}

export function RealEstateCard({ data, size = 'lg' }: IPropertyCardProps) {
	const { address, photos } = data;

	const titlePhoto = photos[0]?.url || '/images/property-card.png';
	const street = `${address.street}, ${address.building}, ${address.city}`;

	return (
		<Card variant='xl' className='px-8 py-7 drop-shadow-lg min-h-[320px]'>
			<div className='text-h3 flex gap-x-3.5'>
				<div className='basis-1/2 font-medium flex flex-col gap-y-7 '>
					<div className='flex flex-col gap-y-3'>
						<div className={cn('font-bold', size === 'xs' ? 'text-h2' : 'text-[46px] ')}>
							{data.name}
						</div>
						<div className='text-small font-bold text-xs text-[#868686]'>{street}</div>
					</div>

					<div className='flex gap-x-1.5'>
						<Badge Icon={BadgeCheck} variant='success'>
							{'нет данных'}
						</Badge>
						<Badge> {data.area} м2</Badge>
					</div>

					<div>
						<p className='mb-1'>Доход за месяц</p>
						<p className={cn('font-bold', size === 'xs' ? 'text-h2' : 'text-[46px] ')}>
							{'нет данных'}
						</p>
					</div>

					<div>
						<p className='mb-1'>Ближайший платеж</p>
						<p className={cn('font-bold', size === 'xs' ? 'text-h2' : 'text-[46px] ')}>
							{'нет данных'}
						</p>
					</div>
				</div>
				<div className='basis-1/2 flex justify-center items-center'>
					<LoadingImage
						imageClassName='w-full rounded-[20px] max-h-[300px]'
						containerClassName='w-full'
						src={titlePhoto}
						alt='Картинка'
						width={350}
						height={350}
					/>
				</div>
			</div>
		</Card>
	);
}
