import { PRIORITY_COLORS } from '@/components/widgets/calendar/labels';

import { cn } from '@/utils/cn';

import type { TMaintenancePriority } from '@/domains/maintenance/api/schema';

interface ICalendarEventProps {
	title: string;
	priority: TMaintenancePriority;
}

export function CalendarEvent({ title, priority }: ICalendarEventProps) {
	return (
		<div
			className={cn(
				'flex items-center gap-x-3.5 w-full px-2 py-1 rounded-lg',
				PRIORITY_COLORS[priority]
			)}
		>
			<span className='truncate font-semibold text-xs'>{title}</span>
		</div>
	);
}
