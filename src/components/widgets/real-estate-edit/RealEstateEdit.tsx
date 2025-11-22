'use client';

import { useState } from 'react';

import { RealEstateGallery } from '@/components/widgets/real-estate-gallery/RealEstateGallery';

import { BackButton } from '@/ui/BackButton';
import { Input } from '@/ui/Input';
import { OptionGroup } from '@/ui/OptionGroup';
import { SectionCard } from '@/ui/SectionCard';
import { Textarea } from '@/ui/Textarea';

import { deletePhoto, uploadPhoto } from '@/domains/real-estate/api/api.client';
import { REAL_ESTATE_TYPE_LABELS } from '@/domains/real-estate/constants';
import type { RealEstate, RealEstatePhoto } from '@/domains/real-estate/schema';
import type { Uuid } from '@/types/common';

interface IRealEstateEditProps {
	data: RealEstate;
}

export function RealEstateEdit({ data }: IRealEstateEditProps) {
	const [photos, setPhotos] = useState<RealEstatePhoto[]>(data.photos);
	const [isLoading, setIsLoading] = useState(false);

	async function handleUpload(file: File) {
		try {
			setIsLoading(true);
			const json = await uploadPhoto(data.realEstateUuid, file, 'photos');
			const newPhoto = json.photos?.[0];
			setPhotos(prev => [newPhoto, ...prev]);
		} catch (err) {
			// показать тост/ошибку
			console.error('[handleUpload] Failed:', err);
		} finally {
			setIsLoading(false);
		}
	}

	//todo useOptimistic чтобы не ждать ответ от сервера
	async function handleDelete(uuid: Uuid) {
		try {
			setIsLoading(true);
			await deletePhoto(data.realEstateUuid, uuid, 'photos');
			setPhotos(prev => prev.filter(p => p.photoUuid !== uuid));
		} catch (err) {
			// показать тост/ошибку
			console.error('[handleDelete] Failed:', err);
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<section>
			<header className='mb-12 flex justify-center items-center relative bg-white rounded-full h-[85px]'>
				<BackButton classNames='absolute inset-x-0 left-[15px] top-[50%] -translate-y-1/2 z-10' />
				<h2 className='font-medium text-h2'>Редактирование объекта</h2>
			</header>

			<div className='flex gap-x-6'>
				<div className='flex-1 flex flex-col'>
					<h2 className='mb-4 font-bold text-h3'>Характеристики объекта</h2>
					<SectionCard classNames='gap-y-7 flex-1 px-8'>
						<div>
							<h3 className='mb-3.5 text-body font-medium'>Название объекта недвижимости</h3>
							<div className='flex gap-x-4 items-center '>
								<Input value={data.name} className='' />
							</div>
						</div>

						<div>
							<h3 className='mb-3.5 text-body font-medium'>Тип объекта</h3>
							<OptionGroup options={REAL_ESTATE_TYPE_LABELS} value={data.type} />
						</div>

						<div>
							<h3 className='mb-3.5 text-body font-medium'>Арендная стоимость в месяц</h3>
							<div className='flex gap-x-4 items-center '>
								<Input value={data.rentalValue || 0} className='max-w-[245px]' type='number' />
								<span className='font-medium text-h3 text-primary'>RUB</span>
							</div>
						</div>

						<div>
							<h3 className='mb-3.5 text-body font-medium'>Площадь</h3>
							<div className='flex gap-x-4 items-center '>
								<Input value={data.area} className='max-w-[245px]' type='number' />
								<span className='font-medium text-h3 text-primary'>М2</span>
							</div>
						</div>

						<div>
							<h3 className='mb-3.5 text-body font-medium'>Описание объекта</h3>
							<div className='flex gap-x-4 items-center '>
								<Textarea defaultValue={data.description} />
							</div>
						</div>
					</SectionCard>
				</div>
				<div className='flex-1'>
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
