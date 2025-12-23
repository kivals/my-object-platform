import { useContext } from 'react';

import { GalleryContext } from '@/components/widgets/real-estate-gallery/model/provider';
import type { TGalleryStore } from '@/components/widgets/real-estate-gallery/model/types';

export function useGalleryStoreApi(): TGalleryStore {
	const store = useContext(GalleryContext);
	if (!store) {
		throw new Error('RealEstateGalleryProvider is missing');
	}
	return store;
}
