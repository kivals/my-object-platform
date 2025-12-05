'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { DashboardSectionHeader } from '@/components/DashboardSectionHeader';
import { RealEstateGallery } from '@/components/widgets/real-estate-gallery/RealEstateGallery';
import { RealEstateItemDescription } from '@/components/widgets/real-estate-item/RealEstateItemDescription';
import { RealEstateItemInfo } from '@/components/widgets/real-estate-item/RealEstateItemInfo';

import { Button } from '@/ui/Button';
import { Icon } from '@/ui/Icon';

import type { RealEstate } from '@/domains/real-estate/api/schema';

interface IRealEstateItem {
	data: RealEstate;
}

export function RealEstateItem({ data }: IRealEstateItem) {
	const pathname = usePathname();

	return (
		<section>
			<DashboardSectionHeader title='Описание объекта'>
				<Button asChild variant='default'>
					<Link href={`${pathname}/edit`}>
						<Icon icon='Pencil' size={19} />
						Редактировать
					</Link>
				</Button>
			</DashboardSectionHeader>

			<RealEstateGallery
				classNames='mb-8'
				media={data.photos.map(p => ({
					uuid: p.photoUuid,
					url: p.url
				}))}
			/>

			<RealEstateItemInfo type={data.type} rent={data.rentalValue} area={data.area} />

			<RealEstateItemDescription text={data.description} />
		</section>
	);
}
