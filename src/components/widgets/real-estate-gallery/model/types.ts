import type { createGalleryStore } from '@/components/widgets/real-estate-gallery/model/store';

import type { Uuid } from '@/types/common';

export interface IMedia {
	uuid: Uuid;
	url: string;
}

export type TGalleryStore = ReturnType<typeof createGalleryStore>;
export type TGalleryState = ReturnType<TGalleryStore['getState']>;
