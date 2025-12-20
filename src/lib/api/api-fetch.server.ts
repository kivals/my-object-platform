import camelize from 'camelize-ts';
import { ZodError, type ZodType, z } from 'zod';

import { authRefresh } from '@/domains/auth/actions';
import { ApiError, ApiParseError } from '@/lib/api/api-error';
import { getAuthTokens } from '@/lib/auth/utils/getAuthJwt.server';

export async function apiFetch<T>(
	endpoint: string,
	opts: RequestInit & {
		query?: Record<string, string>;
	} = {},
	isAuth = true
): Promise<T> {
	let tokens = null;

	if (isAuth) {
		tokens = await getAuthTokens();
		if (!tokens) {
			throw new ApiError('Unauthorized', 401);
		}
	}

	if (opts.query) {
		const params = new URLSearchParams(opts.query).toString();
		endpoint += endpoint.includes('?') ? '&' + params : '?' + params;
	}

	const isFormData = opts.body instanceof FormData;

	async function doFetch(currentToken?: string): Promise<Response> {
		return fetch(endpoint, {
			...opts,
			headers: {
				...(opts.headers || {}),
				...(currentToken ? { Authorization: `Bearer ${currentToken}` } : {}),
				...(!isFormData ? { 'Content-Type': 'application/json' } : {})
			},
			cache: 'no-store'
		});
	}

	let res = await doFetch(tokens?.accessToken);

	if (res.status === 401 && tokens && isAuth) {
		console.debug('Status 401. Need to Refresh');
		try {
			const newServerTokens = await authRefresh(tokens.refreshToken);
			if (!newServerTokens?.refreshToken) throw new Error();
			res = await doFetch(newServerTokens.refreshToken);
		} catch {
			throw new ApiError('Unauthorized (refresh failed)', 401);
		}
	}

	if (!res.ok) {
		const text = await res.text();
		throw new ApiError(text || 'Ошибка при запросе к backend', res.status);
	}
	// иногда приходит ответ от сервера пустой
	const text = await res.text();
	const json = text ? JSON.parse(text) : null;

	const data = camelize(json);
	return data as T;
}

/**
 * Универсальная версия apiFetch с Zod-валидацией.
 *
 * @param endpoint
 * @param schema — ZodSchema, ожидаемый формат данных
 * @param fetchOptions — опции fetch
 * @param isAuth - определяет нужно ли добавлять в запрос заголовок Bearer
 */
export async function apiFetchValidated<S extends ZodType>(
	endpoint: string,
	schema: S,
	fetchOptions?: RequestInit & { query?: Record<string, string> },
	isAuth: boolean = true
): Promise<z.infer<S>> {
	const data = await apiFetch<z.infer<S>>(endpoint, fetchOptions, isAuth);
	try {
		return schema.parse(data);
	} catch (err) {
		if (err instanceof ZodError) {
			throw new ApiParseError(schema.description ?? endpoint, err);
		}
		throw err;
	}
}
