import { addDays, endOfMonth, endOfWeek, format, startOfMonth, startOfWeek } from 'date-fns';

import type { TMaintenanceItem } from '@/domains/maintenance/api/schema';

export function useCalendar(events: TMaintenanceItem[], currentMonth: Date) {
	const monthStart = startOfMonth(currentMonth);
	const monthEnd = endOfMonth(monthStart);

	const gridStart = startOfWeek(monthStart, { weekStartsOn: 1 });
	const gridEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });

	const days: Date[] = [];
	for (let day = gridStart; day <= gridEnd; day = addDays(day, 1)) {
		days.push(day);
	}

	const eventsMap = new Map<string, TMaintenanceItem[]>();
	events.forEach(e => {
		const date = format(e.deadline, 'yyyy-MM-dd');
		if (!eventsMap.has(date)) eventsMap.set(date, []);
		eventsMap.get(date)?.push(e);
	});

	return { days, eventsMap };
}
