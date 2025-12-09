import { NextRequest, NextResponse } from 'next/server';

import { courtCaseDetailsResponseSchema } from '@/domains/court-cases/api/schema';
import { COURT_CASES } from '@/domains/court-cases/endpoints/external';
import { apiFetchValidated } from '@/lib/api/api-fetch.server';
import { getAuthTokens } from '@/lib/auth/utils/getAuthJwt.server';

//todo проверить работу когда протухнет access token
export async function GET(
	_: NextRequest,
	{ params }: { params: Promise<{ uuid: string; courtCaseUuid: string }> }
) {
	try {
		const { uuid, courtCaseUuid } = await params;

		const tokens = await getAuthTokens();
		const endpoint = COURT_CASES.GET_COURT_CASE_DETAIL_BY_REAL_ESTATE_UUID(uuid, courtCaseUuid);

		if (!tokens) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		const result = await apiFetchValidated(endpoint, courtCaseDetailsResponseSchema, {
			method: 'GET'
		});

		return NextResponse.json(result);
	} catch (err) {
		console.error('[GET COURT CASE ERROR]', err);
		return NextResponse.json({ error: 'GET COURT CASE failed' }, { status: 500 });
	}
}
