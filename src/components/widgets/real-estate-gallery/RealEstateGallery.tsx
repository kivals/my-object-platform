'use client';

import { type ChangeEvent, useState } from 'react';

import { MediaPreview } from '@/components/widgets/real-estate-gallery/MediaPreview';
import { MediaThumbnail } from '@/components/widgets/real-estate-gallery/MediaThumbnail';
import { UploadImage } from '@/components/widgets/real-estate-gallery/UploadImage';
import type { IMedia } from '@/components/widgets/real-estate-gallery/types';

import { cn } from '@/utils/cn';

import type { Uuid } from '@/types/common';
import type { IClassNames } from '@/types/components/classname.types';

interface IRealEstateGallery extends IClassNames {
	media: IMedia[];
	active?: Uuid;
	isEdit?: boolean;
	onUpload?: (file: File) => Promise<void>;
	onDelete?: (uuid: string) => void;
}

export function RealEstateGallery({
	media,
	active,
	classNames,
	isEdit = false,
	onUpload,
	onDelete
}: IRealEstateGallery) {
	const [activeMedia, setActiveMedia] = useState<IMedia>(
		() => media.find(m => m.uuid === active) || media[0]
	);

	async function handleUpload(e: ChangeEvent<HTMLInputElement>) {
		const file = e.target.files?.[0];
		e.target.value = '';

		if (!file || !onUpload) return;

		try {
			await onUpload(file);
		} catch (error) {
			console.error('[RealEstateGallery] upload error', error);
			// todo тут можно дернуть toast
		}
	}

	return (
		<div className={cn(classNames, isEdit && 'bg-white')}>
			{/*Основное окно просмотра*/}
			<MediaPreview url={activeMedia.url} />

			{isEdit && <div className='mx-auto mt-6 mb-6 bg-[#868686]/50 w-[160px] h-0.5'></div>}

			{/*список всех картинок*/}
			<div className='flex justify-center gap-x-1.5'>
				{isEdit && <UploadImage onChange={handleUpload} />}

				{media.map(item => (
					<MediaThumbnail
						key={item.uuid}
						item={item}
						selected={activeMedia.uuid === item.uuid}
						onSelect={() => setActiveMedia(item)}
						onDelete={onDelete ? () => onDelete(item.uuid) : undefined}
						isEdit={isEdit}
					/>
				))}
			</div>
		</div>
	);
}
