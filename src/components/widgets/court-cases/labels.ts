import type { TCourtCaseStatus } from '@/domains/court-cases/api/schema';

export const COURT_CASE_STATUS_LABELS: Record<TCourtCaseStatus, string> = {
	won: 'Выиграно',
	lost: 'Проиграно',
	in_progress: 'В процессе',
	stayed: 'Приостановлено'
};

export const COURT_CASE_STATUS_COLORS: Record<TCourtCaseStatus, string> = {
	won: 'bg-emerald-100 text-emerald-800 border border-emerald-200',
	lost: 'bg-rose-100 text-rose-800 border border-rose-200',
	in_progress: 'bg-sky-100 text-sky-800 border border-sky-200',
	stayed: 'bg-amber-100 text-amber-800 border border-amber-200'
} as const;
