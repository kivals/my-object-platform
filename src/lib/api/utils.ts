const toCamel = (key: string) => key.replace(/[_-][a-z]/g, m => m[1].toUpperCase());

function camelize(value: unknown): any {
	if (Array.isArray(value)) return value.map(camelize);
	if (value && typeof value === 'object' && value.constructor === Object) {
		const out: Record<string, any> = {};
		for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
			out[toCamel(k)] = camelize(v);
		}
		return out;
	}
	return value;
}

export { camelize };
