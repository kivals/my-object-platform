import { createStore } from 'zustand/vanilla';

import type { IMedia } from '@/components/widgets/real-estate-gallery/model/types';

import type { Uuid } from '@/types/common';

type TGalleryState = {
	photos: IMedia[];
	active: IMedia;
	isLoading: boolean;
	isEdit: boolean;

	setPhotos: (photos: IMedia[]) => void;
	setActive: (media: IMedia) => void;
	setLoading: (v: boolean) => void;
	setIsEdit: (v: boolean) => void;

	addPhoto: (photo: IMedia) => void;
	removePhoto: (uuid: Uuid) => void;
};

export const createGalleryStore = (initialPhotos: IMedia[], isEdit: boolean) =>
	createStore<TGalleryState>(set => ({
		photos: initialPhotos,
		active: initialPhotos[0],
		isLoading: false,
		isEdit: isEdit,

		setPhotos: (photos: IMedia[]) =>
			set({
				photos,
				active: photos[0]
			}),

		setActive: (media: IMedia) => set({ active: media }),

		setLoading: (v: boolean) => set({ isLoading: v }),

		setIsEdit: (v: boolean) => set({ isEdit: v }),

		addPhoto: (photo: IMedia) =>
			set(state => ({
				photos: [...state.photos, photo],
				active: photo
			})),

		removePhoto: (uuid: Uuid) =>
			set(state => {
				const photos = state.photos.filter(p => p.uuid !== uuid);
				return {
					photos,
					active: photos[0]
				};
			})
	}));
