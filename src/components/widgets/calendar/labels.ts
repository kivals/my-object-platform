import type { TMaintenancePriority, TMaintenanceStatus } from '@/domains/maintenance/api/schema';

export const PRIORITY_COLORS: Record<TMaintenancePriority, string> = {
	1: 'bg-red-500 text-white',
	2: 'bg-amber-400 text-black',
	3: 'bg-green-500 text-white'
};

export const STATUS_COLOR_CLASSES: Record<TMaintenanceStatus, string> = {
	open: 'bg-sky-600 text-white',
	in_progress: 'bg-indigo-500 text-white',
	ready: 'bg-slate-400 text-black'
};
