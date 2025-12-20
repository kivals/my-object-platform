import { unstable_rethrow } from 'next/navigation';

import type { TCreateRealEstateForm } from '@/components/widgets/real-estate-create/validate/create.schema';

import {
	type RealEstate,
	type RealEstateType,
	type RealEstateUpdate,
	type TRealEstateCreateResponse,
	type TRealEstateUploadPhotoDataResponse,
	realEstateCreateResponseSchema,
	realEstateItemSchema,
	realEstateListSchema,
	realEstateUploadPhotoResponseSchema
} from '@/domains/real-estate/api/schema';
import { REAL_ESTATE_ENDPOINTS } from '@/domains/real-estate/endpoints/external';
import type { RealEstateDocumentsType } from '@/domains/real-estate/types';
import { apiFetch, apiFetchValidated } from '@/lib/api/api-fetch.server';
import type { Uuid } from '@/types/common';

/**
 * Запрашивает список объектов недвижимости.
 * @param type Тип недвижимости.
 * @returns Массив объектов недвижимости, прошедших валидацию схемой.
 */
export async function getRealEstateList(type: RealEstateType): Promise<RealEstate[]> {
	try {
		const { data } = await apiFetchValidated(REAL_ESTATE_ENDPOINTS.GET_ALL, realEstateListSchema, {
			method: 'GET',
			query: {
				type
			}
		});
		return data.realEstateProperties;
	} catch (e) {
		unstable_rethrow(e);
		console.error('[getRealEstateList]', e);
		return [];
	}
}

/**
 * Запрашивает объект недвижимости по uuid.
 * @param uuid Идентификатор недвижимости.
 * @returns Массив объектов недвижимости, прошедших валидацию схемой.
 */
export async function getRealEstateByUuid(uuid: string): Promise<RealEstate | null> {
	if (!uuid) return null;

	try {
		const { data } = await apiFetchValidated(
			REAL_ESTATE_ENDPOINTS.GET_BY_UUID(uuid),
			realEstateItemSchema,
			{
				method: 'GET'
			}
		);

		return data;
	} catch (e) {
		unstable_rethrow(e);
		console.error('[getRealEstateItem]', e);
		return null;
	}
}

/**
 * Запускает редактирование объекта недвижимости
 * @param uuid Идентификатор недвижимости.
 * @param sendData Новые данные
 */
export async function editRealEstateByUuid(
	uuid: string,
	sendData: RealEstateUpdate
): Promise<RealEstate | null> {
	if (!uuid) return null;

	try {
		const { data } = await apiFetchValidated(
			REAL_ESTATE_ENDPOINTS.PUT_BY_UUID(uuid),
			realEstateItemSchema,
			{
				method: 'PUT',
				body: JSON.stringify(sendData)
			}
		);

		return data;
	} catch (e) {
		unstable_rethrow(e);
		console.error('[getRealEstateItem]', e);
		return null;
	}
}

/**
 * Создаёт объект недвижимости.
 * @param sendData Данные для создания объекта недвижимости.
 * @returns Ответ сервера, прошедший валидацию схемой.
 */
export async function createRealEstate(
	sendData: TCreateRealEstateForm
): Promise<TRealEstateCreateResponse> {
	try {
		return await apiFetchValidated(
			REAL_ESTATE_ENDPOINTS.CREATE_REAL_ESTATE,
			realEstateCreateResponseSchema,
			{
				method: 'POST',
				body: JSON.stringify(sendData)
			}
		);
	} catch (e) {
		unstable_rethrow(e);
		console.error('[createRealEstate]', e);
		throw e;
	}
}

export async function attachPhoto(
	uuid: Uuid,
	formData: FormData
): Promise<TRealEstateUploadPhotoDataResponse> {
	const endpoint = REAL_ESTATE_ENDPOINTS.POST_PHOTO(uuid);

	try {
		const res = await apiFetchValidated(endpoint, realEstateUploadPhotoResponseSchema, {
			method: 'POST',
			body: formData
		});

		return res.data;
	} catch (e) {
		unstable_rethrow(e);
		console.error('[attachPhotoRealEstate]', e);
		throw e;
	}
}

export async function deleteRealEstate(uuid: Uuid): Promise<undefined> {
	const endpoint = REAL_ESTATE_ENDPOINTS.DELETE_REAL_ESTATE(uuid);

	try {
		await apiFetch(endpoint, {
			method: 'DELETE'
		});
	} catch (e) {
		unstable_rethrow(e);
		console.error('[deleteRealEstate]', e);
		throw e;
	}
}

export async function deleteFile(
	uuid: Uuid,
	fileUuid: Uuid,
	type: RealEstateDocumentsType
): Promise<undefined> {
	const endpoint = REAL_ESTATE_ENDPOINTS.DELETE_FILE(uuid, fileUuid, type);

	try {
		await apiFetch(endpoint, {
			method: 'DELETE'
		});
	} catch (e) {
		unstable_rethrow(e);
		console.error('[delete file by real estate]', e);
		throw e;
	}
}
