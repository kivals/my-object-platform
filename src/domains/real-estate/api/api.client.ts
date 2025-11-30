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
import { REAL_ESTATE_API_ROUTES } from '@/domains/real-estate/endpoints/internal';
import type { RealEstateDocumentsType } from '@/domains/real-estate/types';
import type { Uuid } from '@/types/common';

/**
 * Загружает файл на сервер по-указанному эндпоинту.
 *
 * @param file - Объект файла для загрузки.
 * @param endpoint - Полный URL эндпоинта для загрузки.
 * @returns Ответ сервера в формате JSON.
 * @throws Ошибка, если запрос завершился неудачно.
 */
async function uploadFile(file: File, endpoint: string) {
	const form = new FormData();
	form.append('files', file);

	const res = await fetch(endpoint, {
		method: 'POST',
		body: form,
		cache: 'no-cache'
	});

	if (!res.ok) {
		throw new Error(await res.text());
	}

	return res.json();
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
	return uploadFile(file, REAL_ESTATE_API_ROUTES.UPLOAD_PHOTO(realEstateUuid, 'photos'));
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
	return uploadFile(
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
export async function deletePhoto(
	realEstateUuid: string,
	fileUuid: Uuid,
	type: RealEstateDocumentsType
) {
	const res = await fetch(REAL_ESTATE_API_ROUTES.DELETE_PHOTO(realEstateUuid, fileUuid, type), {
		method: 'DELETE',
		cache: 'no-cache'
	});

	if (!res.ok) {
		throw new Error(await res.text());
	}

	return true;
}
