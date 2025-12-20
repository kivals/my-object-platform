import { NextRequest } from 'next/server';

import { getCourtCaseDetailsByRealEstate } from '@/domains/court-cases/api/api.server';
import { badRequest, handleRouteError, ok } from '@/lib/api/route-utils';

// Получение деталей судебного дела
export async function GET(
	_: NextRequest,
	{ params }: { params: Promise<{ uuid: string; courtCaseUuid: string }> }
) {
	try {
		const { uuid, courtCaseUuid } = await params;

		if (!uuid || !courtCaseUuid) {
			return badRequest();
		}

		const result = await getCourtCaseDetailsByRealEstate(uuid, courtCaseUuid);

		return ok(result);
	} catch (err) {
		return handleRouteError(err, 'GET COURT CASE failed');
	}
}
