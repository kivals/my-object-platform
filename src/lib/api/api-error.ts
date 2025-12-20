import { ZodError } from 'zod';

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