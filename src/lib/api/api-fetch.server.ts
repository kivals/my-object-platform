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

async function apiFetch<T>(path: string, opts: RequestInit = {}, serverUrl?: string): Promise<T> {
	const token = await getAccessToken();
	const baseUrl = serverUrl || process.env.PYTHON_API_URL;

	const res = await fetch(`${baseUrl}${path}`, {
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
 * @param path — endpoint (например, '/properties')
 * @param schema — ZodSchema, ожидаемый формат данных
 * @param opts — опции fetch
 * @param serverUrl - Url сервера
 */
export async function apiFetchValidated<S extends ZodType>(
	path: string,
	schema: S,
	opts?: RequestInit,
	serverUrl?: string
): Promise<z.infer<S>> {
	const data = await apiFetch<z.infer<S>>(path, opts, serverUrl);
	try {
		return schema.parse(data);
	} catch (err) {
		if (err instanceof ZodError) {
			throw new ApiParseError(schema.description ?? path, err);
		}
		throw err;
	}
}
