import { NextRequest } from 'next/server';

import { deleteFile } from '@/domains/real-estate/api/api.server';
import type { RealEstateDocumentsType } from '@/domains/real-estate/types';
import { badRequest, handleRouteError, ok } from '@/lib/api/route-utils';

// удаление фото + удаление документа
export async function DELETE(
	req: NextRequest,
	{ params }: { params: Promise<{ uuid: string; fileUuid: string }> }
) {
	try {
		const { uuid, fileUuid } = await params;

		const type = req.nextUrl.searchParams.get('type') as RealEstateDocumentsType;

		if (!type) return badRequest();

		await deleteFile(uuid, fileUuid, type);

		return ok();
	} catch (err) {
		return handleRouteError(err, '[FILE DELETE ERROR]');
	}
}
