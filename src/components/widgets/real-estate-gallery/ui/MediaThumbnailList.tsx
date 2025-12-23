import { useParams } from 'next/navigation';
import type { ChangeEvent } from 'react';

import { useRealEstatePhotos } from '@/components/widgets/real-estate-edit/hook/useRealEstatePhotos';
import { useGalleryStore } from '@/components/widgets/real-estate-gallery/model/useGalleryStore';
import { MediaThumbnail } from '@/components/widgets/real-estate-gallery/ui/MediaThumbnail';

import { UploadFileCard } from '@/ui/UploadFileCard';

import { cn } from '@/utils/cn';
import { ACCEPT_PHOTOS } from '@/utils/file-formats';

export function MediaThumbnailList() {
	const { uuid } = useParams<{ uuid: string }>();

	const photos = useGalleryStore(s => s.photos);
	const active = useGalleryStore(s => s.active);
	const setActive = useGalleryStore(s => s.setActive);
	const isLoading = useGalleryStore(s => s.isLoading);
	const isEdit = useGalleryStore(s => s.isEdit);

	const { handleUpload, handleDelete } = useRealEstatePhotos(uuid);

	async function onUpload(e: ChangeEvent<HTMLInputElement>) {
		const file = e.target.files?.[0];
		e.target.value = '';
		if (!file) return;

		await handleUpload(file);
	}

	return (
		<div className='flex justify-center gap-x-1.5'>
			{isEdit && (
				<UploadFileCard
					className={cn(isLoading && 'opacity-0 pointer-events-none')}
					onChange={onUpload}
					acceptFileFormat={ACCEPT_PHOTOS}
				/>
			)}
			{photos.map(item => (
				<MediaThumbnail
					key={item.uuid}
					item={item}
					selected={active?.uuid === item.uuid}
					onSelect={() => setActive(item)}
					onDelete={isEdit ? () => handleDelete(item.uuid) : undefined}
					isEdit={isEdit}
				/>
			))}
		</div>
	);
}
