'use client';

import { useGalleryStore } from '@/components/widgets/real-estate-gallery/model/useGalleryStore';
import { MediaPreview } from '@/components/widgets/real-estate-gallery/ui/MediaPreview';
import { MediaThumbnailList } from '@/components/widgets/real-estate-gallery/ui/MediaThumbnailList';

import { cn } from '@/utils/cn';

import type { IClassNames } from '@/types/components/classname.types';

export function GalleryView({ className }: IClassNames) {
	const isEdit = useGalleryStore(s => s.isEdit);

	return (
		<div className={cn(className, isEdit && 'bg-white')}>
			<MediaPreview />

			{isEdit && <div className='mx-auto mt-6 mb-6 bg-[#868686]/50 w-[160px] h-0.5'></div>}

			<MediaThumbnailList />
		</div>
	);
}
