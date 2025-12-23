'use client';

import { Provider } from '@/components/widgets/real-estate-gallery/model/provider';
import type { IMedia } from '@/components/widgets/real-estate-gallery/model/types';
import { GalleryView } from '@/components/widgets/real-estate-gallery/ui/GalleryView';

import type { IClassNames } from '@/types/components/classname.types';

interface IRealEstateGallery extends IClassNames {
	media: IMedia[];
	isEdit?: boolean;
}

export function RealEstateGallery({ media, className, isEdit = false }: IRealEstateGallery) {
	return (
		<Provider photos={media} isEdit={isEdit}>
			<GalleryView className={className} />
		</Provider>
	);
}
