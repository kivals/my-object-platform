import { REAL_ESTATE_API_ROUTES } from '@/domains/real-estate/endpoints/internal';
import type { RealEstateDocumentsType } from '@/domains/real-estate/types';
import type { Uuid } from '@/types/common';

export async function uploadPhoto(
	realEstateUuid: string,
	file: File,
	type: RealEstateDocumentsType
) {
	const form = new FormData();
	form.append('files', file);

	const res = await fetch(REAL_ESTATE_API_ROUTES.UPLOAD_PHOTO(realEstateUuid, type), {
		method: 'POST',
		body: form,
		cache: 'no-cache'
	});

	if (!res.ok) {
		throw new Error(await res.text());
	}

	return res.json();
}

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
