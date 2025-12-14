export function formatDate(date: Date | undefined) {
	if (!date) {
		return '';
	}

	return date.toLocaleDateString('ru-RU', {
		day: '2-digit',
		month: 'long',
		year: 'numeric'
	});
}

export function toDateOnly(date: Date): string {
	return date.toISOString().split('T')[0];
}
