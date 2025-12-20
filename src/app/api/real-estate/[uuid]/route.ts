import { NextRequest } from 'next/server';

import { deleteRealEstate } from '@/domains/real-estate/api/api.server';
import { handleRouteError, ok } from '@/lib/api/route-utils';

// Удаление объекта недвижимости
export async function DELETE(_: NextRequest, { params }: { params: Promise<{ uuid: string }> }) {
	try {
		const { uuid } = await params;
		await deleteRealEstate(uuid);
		return ok();
	} catch (err) {
		return handleRouteError(err, '[DELETE REAL ESTATE ERROR]');
	}
}
