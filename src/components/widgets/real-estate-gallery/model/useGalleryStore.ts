import { useContext } from 'react';
import { useStore } from 'zustand/react';

import { GalleryContext } from '@/components/widgets/real-estate-gallery/model/provider';
import type {
	TGalleryState,
	TGalleryStore
} from '@/components/widgets/real-estate-gallery/model/types';

export function useGalleryStore<T>(selector: (s: TGalleryState) => T): T {
	const store = useContext(GalleryContext);
	if (!store) {
		throw new Error('RealEstateGalleryProvider is missing');
	}

	return useStore(store, selector);
}

export function useGalleryStoreApi(): TGalleryStore {
	const store = useContext(GalleryContext);
	if (!store) {
		throw new Error('RealEstateGalleryProvider is missing');
	}
	return store;
}
