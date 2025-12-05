import type { TMaintenanceStatus } from '@/domains/maintenance/api/schema';

export const TASK_STATUS_LABEL: Record<TMaintenanceStatus, string> = {
	open: 'Открыто',
	in_progress: 'В работе',
	ready: 'Готово'
};

export const PRIORITY_LABELS: Record<1 | 2 | 3, string> = {
	1: 'Срочно',
	2: 'Важно',
	3: 'Планово'
};
