const THIN_APOSTROPHE = '’';

export function formatRent(amount: number): string {
	const base = new Intl.NumberFormat('ru-RU').format(amount);
	const withApostrophe = base.replace(/\s/g, THIN_APOSTROPHE);
	return `${withApostrophe} р.`;
}
