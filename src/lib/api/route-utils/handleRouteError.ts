import { NextResponse } from 'next/server';

import { ApiError } from '@/lib/api/api-error';

export function handleRouteError(err: unknown, fallback = 'Internal error') {
	console.error('[ROUTE ERROR]', err);
	if (err instanceof ApiError && err.status === 401) {
		return NextResponse.json({ error: err.message }, { status: 401 });
	}
	return NextResponse.json({ error: fallback }, { status: 500 });
}
