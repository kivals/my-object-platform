'use client';

import { ApiError } from '@/lib/api/api-error';

export async function clientApiFetch<T>(input: RequestInfo, init?: RequestInit): Promise<T> {
	const res = await fetch(input, {
		cache: 'no-cache',
		...init
	});

	const text = await res.text();
	const body = text ? JSON.parse(text) : null;

	if (!res.ok) {
		throw new ApiError(body?.error ?? res.statusText, res.status);
	}

	return body as T;
}
