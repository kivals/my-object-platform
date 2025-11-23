'use client';

import { type ChangeEvent, useEffect, useState } from 'react';

import { MediaPreview } from '@/components/widgets/real-estate-gallery/MediaPreview';
import { MediaThumbnail } from '@/components/widgets/real-estate-gallery/MediaThumbnail';
import { UploadImage } from '@/components/widgets/real-estate-gallery/UploadImage';
import type { IMedia } from '@/components/widgets/real-estate-gallery/types';

import { cn } from '@/utils/cn';
import { DEFAULT_IMAGE_PLACEHOLDER } from '@/utils/constants';

import type { Uuid } from '@/types/common';
import type { IClassNames } from '@/types/components/classname.types';

interface IRealEstateGallery extends IClassNames {
	media: IMedia[];
	active?: Uuid;
	isEdit?: boolean;
	onUpload?: (file: File) => Promise<void>;
	onDelete?: (uuid: string) => void;
	isLoading?: boolean;
}

const defaultMedia: IMedia = {
	uuid: '-1',
	url: DEFAULT_IMAGE_PLACEHOLDER
};

export function RealEstateGallery({
	media,
	active,
	classNames,
	isEdit = false,
	onUpload,
	onDelete,
	isLoading = false
}: IRealEstateGallery) {
	console.log('RealEstateGallery media', media);
	const [activeMedia, setActiveMedia] = useState<IMedia>(
		() => media.find(m => m.uuid === active) || media[0]
	);

	useEffect(() => {
		if (!activeMedia && media.length > 0) {
			setActiveMedia(media[0]);
		}

		if (activeMedia && media.length > 0) {
			const exists = media.some(m => m.uuid === activeMedia.uuid);
			if (!exists) setActiveMedia(media[0]);
		}

		if (media.length === 0) {
			setActiveMedia(defaultMedia);
		}
	}, [media]);

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
			<MediaPreview isLoading={isLoading} url={activeMedia?.url ?? DEFAULT_IMAGE_PLACEHOLDER} />

			{isEdit && <div className='mx-auto mt-6 mb-6 bg-[#868686]/50 w-[160px] h-0.5'></div>}

			{/*список всех картинок*/}
			<div className='flex justify-center gap-x-1.5'>
				{isEdit && !isLoading && <UploadImage onChange={handleUpload} />}
				{activeMedia &&
					media.length > 0 &&
					media.map(item => (
						<MediaThumbnail
							key={item.uuid}
							item={item}
							selected={activeMedia.uuid === item.uuid}
							onSelect={() => setActiveMedia(item)}
							onDelete={onDelete ? () => onDelete(item.uuid) : undefined}
							isEdit={isEdit}
							isLoading={isLoading}
						/>
					))}
			</div>
		</div>
	);
}
