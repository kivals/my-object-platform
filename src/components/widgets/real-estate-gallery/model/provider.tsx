'use client';

import { type ReactNode, createContext, useRef } from 'react';

import { createGalleryStore } from '@/components/widgets/real-estate-gallery/model/store';
import type { IMedia, TGalleryStore } from '@/components/widgets/real-estate-gallery/model/types';

export const GalleryContext = createContext<TGalleryStore | null>(null);

interface IProviderProps {
	children: ReactNode;
	photos: IMedia[];
	isEdit: boolean;
}

export function Provider({ children, photos, isEdit }: IProviderProps) {
	const storeRef = useRef<TGalleryStore | null>(null);

	if (!storeRef.current) {
		storeRef.current = createGalleryStore(photos, isEdit);
	}

	return <GalleryContext.Provider value={storeRef.current}>{children}</GalleryContext.Provider>;
}
