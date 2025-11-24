'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { TextField } from '@/components/form/TextField';
import { RealEstateGallery } from '@/components/widgets/real-estate-gallery/RealEstateGallery';

import { BackButton } from '@/ui/BackButton';
import { OptionGroup } from '@/ui/OptionGroup';
import { SectionCard } from '@/ui/SectionCard';

import { deletePhoto, uploadPhoto } from '@/domains/real-estate/api/api.client';
import type { RealEstate, RealEstatePhoto } from '@/domains/real-estate/api/schema';
import { REAL_ESTATE_TYPE_LABELS } from '@/domains/real-estate/constants';
import { UpdateSchema } from '@/domains/real-estate/validate/edit.schema';
import { REAL_ESTATE_URL } from '@/routes';
import type { Uuid } from '@/types/common';

interface IRealEstateEditProps {
	data: RealEstate;
	uuid: Uuid;
}

export function RealEstateEdit({ data, uuid }: IRealEstateEditProps) {
	const [photos, setPhotos] = useState<RealEstatePhoto[]>(data.photos);
	const [isLoading, setIsLoading] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<z.infer<typeof UpdateSchema>>({
		resolver: zodResolver(UpdateSchema),
		defaultValues: {
			name: data.name,
			type: 'house',
			area: data.area || 0,
			rentalValue: data.rentalValue || 0,
			description: data.description || ''
		}
	});

	async function handleUpload(file: File) {
		try {
			setIsLoading(true);
			const json = await uploadPhoto(data.realEstateUuid, file, 'photos');
			const newPhoto = json.photos?.[0];
			setPhotos(prev => [...prev, newPhoto]);
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
				<BackButton
					backUrl={`${REAL_ESTATE_URL}/${uuid}`}
					classNames='absolute inset-x-0 left-[15px] top-[50%] -translate-y-1/2 z-10'
				/>
				<h2 className='font-medium text-h2'>Редактирование объекта</h2>
			</header>

			<div className='flex gap-x-6'>
				<div className='flex-1 flex flex-col'>
					<h2 className='mb-4 font-bold text-h3'>Характеристики объекта</h2>
					<SectionCard classNames='gap-y-7 flex-1 px-8'>
						<TextField
							type='text'
							label='Название объекта'
							placeholder='Введите название'
							inputClassName='placeholder:text-body'
							labelClassName='text-body font-medium'
							error={errors.name?.message}
							{...register('name')}
						/>

						<div>
							<h3 className='mb-2 text-body font-medium'>Тип объекта</h3>
							<OptionGroup options={REAL_ESTATE_TYPE_LABELS} value={data.type} />
						</div>

						<TextField
							type='number'
							label='Арендная стоимость в месяц'
							placeholder='Введите стоимость'
							inputClassName='max-w-[245px] placeholder:text-body'
							labelClassName='text-body font-medium'
							error={errors.rentalValue?.message}
							{...register('rentalValue')}
							suffix={() => <span className='font-medium text-h3 text-primary'>RUB</span>}
						/>

						<TextField
							type='number'
							label='Площадь'
							placeholder='Введите площадь'
							inputClassName='max-w-[245px] placeholder:text-body'
							labelClassName='text-body font-medium'
							error={errors.area?.message}
							{...register('area')}
							suffix={() => <span className='font-medium text-h3 text-primary'>М2</span>}
						/>

						<TextField
							label='Описание объекта'
							placeholder='Введите oписание'
							inputClassName='placeholder:text-body'
							labelClassName='text-body font-medium'
							error={errors.description?.message}
							{...register('description')}
							multiline
						/>
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
