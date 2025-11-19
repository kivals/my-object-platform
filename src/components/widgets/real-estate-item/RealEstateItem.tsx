import { RealEstateGallery } from '@/components/widgets/real-estate-gallery/RealEstateGallery';
import { RealEstateItemDescription } from '@/components/widgets/real-estate-item/RealEstateItemDescription';
import { RealEstateItemHeader } from '@/components/widgets/real-estate-item/RealEstateItemHeader';
import { RealEstateItemInfo } from '@/components/widgets/real-estate-item/RealEstateItemInfo';

import type { RealEstate } from '@/domains/real-estate/schema';

interface IRealEstateItem {
	data: RealEstate;
}

export function RealEstateItem({ data }: IRealEstateItem) {
	return (
		<section>
			<RealEstateItemHeader />

			<RealEstateGallery classNames='mb-8' media={data.photos.map(p => p.url)} />

			<RealEstateItemInfo type={data.type} rent={'225000'} area={345} />

			<RealEstateItemDescription text={data.description} />
		</section>
	);
}
