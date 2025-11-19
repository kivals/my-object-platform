import React from 'react';

import { SectionCard } from '@/components/widgets/real-estate-item/SectionCard';

interface IRealEstateItemDescription {
	text: string;
}

export function RealEstateItemDescription({ text }: IRealEstateItemDescription) {
	return (
		<div>
			<SectionCard classNames='item-center'>
				<p className='leading-relaxed whitespace-pre-line'>{text}</p>
			</SectionCard>
		</div>
	);
}
