import { useState } from 'react';

import { useApiAction } from '@/components/widgets/real-estate-edit/hook/useApiAction';

import { deleteFile, uploadPhoto } from '@/domains/real-estate/api/api.client';
import type { RealEstatePhoto } from '@/domains/real-estate/api/schema';
import type { Uuid } from '@/types/common';

interface TUseRealEstatePhotosParams {
	realEstateUuid: Uuid;
	photos: RealEstatePhoto[];
}

export function useRealEstatePhotos({ photos, realEstateUuid }: TUseRealEstatePhotosParams) {
	const [localPhotos, setLocalPhotos] = useState<RealEstatePhoto[]>(photos);

	const { run: deleteAction, isLoading: deleteIsLoading } = useApiAction({
		successMessage: 'Фотография успешно удалена',
		errorMessage: 'Ошибка удаления фотографии'
	});

	const { run: uploadAction, isLoading: uploadIsLoading } = useApiAction({
		successMessage: 'Фотография успешно добавлена!',
		errorMessage: 'Ошибка загрузки фотографии'
	});

	//todo useOptimistic чтобы не ждать ответ от сервера
	async function handleUpload(file: File) {
		await uploadAction(async () => {
			const json = await uploadPhoto(realEstateUuid, file);
			const newPhoto = json.photos[0];
			setLocalPhotos(prev => [...prev, newPhoto]);
		});
	}

	//todo useOptimistic чтобы не ждать ответ от сервера
	async function handleDelete(uuid: Uuid) {
		await deleteAction(async () => {
			await deleteFile(realEstateUuid, uuid, 'photos');
			setLocalPhotos(prev => prev.filter(p => p.photoUuid !== uuid));
		});
	}

	return {
		photos: localPhotos,
		handleUpload,
		handleDelete,
		isLoading: deleteIsLoading || uploadIsLoading
	};
}
