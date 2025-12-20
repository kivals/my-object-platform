import { NextRequest } from 'next/server';

import { getTenantUsers } from '@/domains/users/api/api.server';
import { handleRouteError, ok } from '@/lib/api/route-utils';

// поиск пользователей с ролью Арендатор по имени
export async function GET(req: NextRequest) {
	try {
		const searchValue = req.nextUrl.searchParams.get('name') ?? undefined;
		const result = await getTenantUsers(searchValue);

		return ok(result);
	} catch (err) {
		return handleRouteError(err, 'SEARCH TENANT USERS failed');
	}
}
