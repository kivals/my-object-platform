/**
 * Клиентские функции для работы с файлами,
 * связанными с объектами недвижимости:
 * — загрузка фотографий,
 * — загрузка документов,
 * — удаление файлов.
 *
 * Используются FormData и прямые запросы к REST-эндпоинтам.
 */
import type { DocumentsType } from '@/domains/documents/api/schema';
import type { TRealEstateUploadPhotoDataResponse } from '@/domains/real-estate/api/schema';
import { REAL_ESTATE_API_ROUTES } from '@/domains/real-estate/endpoints/internal';
import type { RealEstateDocumentsType } from '@/domains/real-estate/types';
import { clientApiFetch } from '@/lib/api/client-api-fetch';
import type { Uuid } from '@/types/common';

/**
 * Загружает файл на сервер по-указанному эндпоинту.
 *
 * @param file - Объект файла для загрузки.
 * @param endpoint - Полный URL эндпоинта для загрузки.
 * @returns Ответ сервера в формате JSON.
 * @throws Ошибка, если запрос завершился неудачно.
 * TODO вынести есть повторение в судебных делах
 */
async function uploadFile<T>(file: File, endpoint: string): Promise<T> {
	const form = new FormData();
	form.append('files', file);

	return clientApiFetch<T>(endpoint, {
		method: 'POST',
		body: form
	});
}

/**
 * Загружает фотографию объекта недвижимости.
 *
 * @param realEstateUuid - UUID объекта недвижимости.
 * @param file - Файл фотографии для загрузки.
 * @returns Ответ сервера в формате JSON.
 * @throws Ошибка при неудачном запросе.
 */
export async function uploadPhoto(realEstateUuid: string, file: File) {
	return uploadFile<TRealEstateUploadPhotoDataResponse>(
		file,
		REAL_ESTATE_API_ROUTES.UPLOAD_PHOTO(realEstateUuid, 'photos')
	);
}

/**
 * Загружает документ, связанный с объектом недвижимости.
 *
 * @param realEstateUuid - UUID объекта недвижимости.
 * @param file - Файл документа для загрузки.
 * @param docType - Тип документа (например: договор, акт, паспорт БТИ и т.д.).
 * @returns Ответ сервера в формате JSON.
 * @throws Ошибка при неудачном запросе.
 */
export async function uploadDocument(realEstateUuid: string, file: File, docType: DocumentsType) {
	return uploadFile<undefined>(
		file,
		REAL_ESTATE_API_ROUTES.UPLOAD_DOCUMENT(realEstateUuid, 'documents', docType)
	);
}

/**
 * Удаляет фотографию объекта недвижимости.
 *
 * @param realEstateUuid - UUID объекта недвижимости.
 * @param fileUuid - UUID файла (фотографии), который требуется удалить.
 * @param type - Тип удаляемого файла (например: 'photos' или 'documents').
 * @returns true, если операция удаления выполнена успешно.
 * @throws Ошибка при неудачном запросе.
 */
export async function deleteFile(
	realEstateUuid: string,
	fileUuid: Uuid,
	type: RealEstateDocumentsType
) {
	await clientApiFetch(REAL_ESTATE_API_ROUTES.DELETE_FILE(realEstateUuid, fileUuid, type), {
		method: 'DELETE'
	});

	return true;
}

/**
 * Удаляет объект недвижимости.
 *
 * Выполняет запрос DELETE к эндпоинту удаления объекта недвижимости.
 * Используется на клиенте.
 *
 * @param realEstateUuid UUID объекта недвижимости, который требуется удалить.
 * @returns `true`, если удаление выполнено успешно.
 * @throws {Error} Если сервер вернул неуспешный статус (`res.ok === false`).
 */
export async function deleteRealEstate(realEstateUuid: Uuid) {
	await clientApiFetch(REAL_ESTATE_API_ROUTES.DELETE_REAL_ESTATE(realEstateUuid), {
		method: 'DELETE'
	});

	return true;
}
