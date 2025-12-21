import { Icon } from '@/ui/Icon';
import { SectionCard } from '@/ui/SectionCard';

import type { RealEstateType } from '@/domains/real-estate/api/schema';
import { REAL_ESTATE_TYPE_LABELS } from '@/domains/real-estate/constants';

interface IRealEstateItemProps {
	type: RealEstateType;
	rent: number;
	area: number;
}

export function RealEstateItemInfo({ type, rent, area }: IRealEstateItemProps) {
	return (
		<div className='flex gap-x-6 mb-8'>
			<SectionCard className='item-center'>
				<span>Тип объекта</span>
				<span className='text-h2 font-medium flex items-end gap-x-3.5'>
					<Icon icon='Building' size={32} />
					{REAL_ESTATE_TYPE_LABELS[type]}
				</span>
			</SectionCard>

			<SectionCard className='item-center'>
				<span>Аренда, р./мес.</span>
				<span className='text-h2 font-medium flex items-end gap-x-3.5'>{rent}</span>
			</SectionCard>

			<SectionCard className='item-center'>
				<span>Площадь</span>
				<span className='text-h2 font-medium flex items-end gap-x-3.5'>{area} м²</span>
			</SectionCard>
		</div>
	);
}
