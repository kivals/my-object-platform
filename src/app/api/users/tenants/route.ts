import { NextRequest, NextResponse } from 'next/server';

import { getTenantUsers } from '@/domains/users/api/api.server';

export async function GET(req: NextRequest) {
	try {
		const searchValue = req.nextUrl.searchParams.get('name') ?? undefined;
		const result = await getTenantUsers(searchValue);

		return NextResponse.json(result);
	} catch (err) {
		console.error('[SEARCH TENANT USERS ERROR]', err);

		return NextResponse.json({ error: 'SEARCH TENANT USERS failed' }, { status: 500 });
	}
}
