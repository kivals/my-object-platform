import { ZodError, type ZodType, z } from 'zod';

import { camelize } from '@/lib/api/utils';
import { getAccessToken } from '@/lib/auth/utils/getAuthJwt.server';

export class ApiError extends Error {
	status: number;

	constructor(message: string, status: number) {
		super(message);
		this.name = 'ApiError';
		this.status = status;
	}
}

export class ApiParseError extends Error {
	constructor(
		public schemaName: string,
		public issues: ZodError
	) {
		super(`Invalid response format for schema: ${schemaName}`);
		this.name = 'ApiParseError';
	}
}

async function apiFetch<T>(endpoint: string, opts: RequestInit = {}): Promise<T> {
	const token = await getAccessToken();
	console.log(endpoint);
	const res = await fetch(endpoint, {
		...opts,
		headers: {
			...(opts.headers || {}),
			'Content-Type': 'application/json',
			...(token ? { Authorization: `Bearer ${token}` } : {})
		},
		cache: 'no-store'
	});

	if (!res.ok) {
		const text = await res.text();
		throw new ApiError(text || 'Ошибка при запросе к backend', res.status);
	}
	const json = await res.json();
	const data = camelize(json);
	return data as T;
}

/**
 * Универсальная версия apiFetch с Zod-валидацией.
 *
 * @param endpoint
 * @param schema — ZodSchema, ожидаемый формат данных
 * @param opts — опции fetch
 */
export async function apiFetchValidated<S extends ZodType>(
	endpoint: string,
	schema: S,
	opts?: RequestInit
): Promise<z.infer<S>> {
	const data = await apiFetch<z.infer<S>>(endpoint, opts);
	try {
		return schema.parse(data);
	} catch (err) {
		if (err instanceof ZodError) {
			throw new ApiParseError(schema.description ?? endpoint, err);
		}
		throw err;
	}
}
