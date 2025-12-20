'use client';

import { RealEstateEditForm } from '@/components/widgets/real-estate-edit/RealEstateEditForm';
import { useRealEstatePhotos } from '@/components/widgets/real-estate-edit/hook/useRealEstatePhotos';
import { RealEstateGallery } from '@/components/widgets/real-estate-gallery/RealEstateGallery';

import { BackButton } from '@/ui/BackButton';
import { SectionCard } from '@/ui/SectionCard';

import type { RealEstate } from '@/domains/real-estate/api/schema';
import { REAL_ESTATE_URL } from '@/routes';
import type { Uuid } from '@/types/common';

//todo uuid тут нужно пропсом получать?
interface IRealEstateEditProps {
	data: RealEstate;
	uuid: Uuid;
}

export function RealEstateEdit({ data, uuid }: IRealEstateEditProps) {
	const { photos, handleUpload, handleDelete, isLoading } = useRealEstatePhotos({
		photos: data.photos,
		realEstateUuid: data.realEstateUuid
	});

	return (
		<section>
			<header className='mb-12 flex justify-center items-center relative bg-white rounded-full h-[85px]'>
				<BackButton
					backUrl={`${REAL_ESTATE_URL}/${uuid}`}
					classNames='absolute inset-x-0 left-[15px] top-[50%] -translate-y-1/2 z-10'
				/>
				<h2 className='font-medium text-h2'>Редактирование объекта</h2>
			</header>

			<div className='flex gap-x-6'>
				<div className='w-1/2 flex-1 flex flex-col'>
					<h2 className='mb-4 font-bold text-h3'>Характеристики объекта</h2>
					<RealEstateEditForm uuid={uuid} data={data} />
				</div>
				<div className='w-1/2 flex-1'>
					<h2 className='mb-4 font-bold text-h3'>Фотографии объекта</h2>
					<SectionCard classNames='pt-0 px-0'>
						<RealEstateGallery
							onUpload={handleUpload}
							onDelete={handleDelete}
							media={photos.map(m => ({
								uuid: m.photoUuid,
								url: m.url
							}))}
							isEdit={true}
							isLoading={isLoading}
						/>
					</SectionCard>
				</div>
			</div>
		</section>
	);
}
