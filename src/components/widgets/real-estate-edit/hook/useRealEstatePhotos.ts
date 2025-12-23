import { useApiAction } from '@/components/widgets/real-estate-edit/hook/useApiAction';

import { deleteFile, uploadPhoto } from '@/domains/real-estate/api/api.client';
import type { Uuid } from '@/types/common';
import { useGalleryStoreApi } from '@/components/widgets/real-estate-gallery';

export function useRealEstatePhotos(realEstateUuid: Uuid) {
	const store = useGalleryStoreApi();

	const { run: deleteAction } = useApiAction({
		successMessage: 'Фотография успешно удалена',
		errorMessage: 'Ошибка удаления фотографии'
	});

	const { run: uploadAction } = useApiAction({
		successMessage: 'Фотография успешно добавлена!',
		errorMessage: 'Ошибка загрузки фотографии'
	});

	const { setLoading, addPhoto, removePhoto } = store.getState();

	async function handleUpload(file: File) {
		await uploadAction(async () => {
			setLoading(true);
			try {
				const json = await uploadPhoto(realEstateUuid, file);
				addPhoto({
					url: json.photos[0].url,
					uuid: json.photos[0].photoUuid
				});
			} finally {
				setLoading(false);
			}
		});
	}

	async function handleDelete(uuid: Uuid) {
		await deleteAction(async () => {
			setLoading(true);
			try {
				await deleteFile(realEstateUuid, uuid, 'photos');
				removePhoto(uuid);
			} finally {
				setLoading(false);
			}
		});
	}

	return {
		handleUpload,
		handleDelete
	};
}
