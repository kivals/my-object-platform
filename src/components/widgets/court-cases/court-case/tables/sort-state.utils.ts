import type { TStateCourtCase } from '@/domains/court-cases/api/schema';

export function sortStatesByDateDesc(states: TStateCourtCase[]): TStateCourtCase[] {
	return [...states].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
