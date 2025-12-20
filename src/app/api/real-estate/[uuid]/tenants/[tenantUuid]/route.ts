import { NextRequest } from 'next/server';

import { deleteTenantToRealEstate } from '@/domains/tenants/api/api.server';
import { handleRouteError, ok } from '@/lib/api/route-utils';

// Открепление арендатора от объекта
export async function DELETE(
	_: NextRequest,
	{ params }: { params: Promise<{ uuid: string; tenantUuid: string }> }
) {
	try {
		const { uuid, tenantUuid } = await params;

		await deleteTenantToRealEstate(uuid, tenantUuid);

		return ok();
	} catch (err) {
		return handleRouteError(err, 'DELETE_TENANT ERROR');
	}
}
