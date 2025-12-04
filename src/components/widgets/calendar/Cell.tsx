import { format } from 'date-fns';

import { CalendarEvent } from '@/components/widgets/calendar/Event';

import { cn } from '@/utils/cn';

import type { TMaintenanceItem } from '@/domains/maintenance/api/schema';

function getBorderClass(isSelected: boolean, isToday: boolean) {
	if (isSelected) return 'border-2 border-gray-400';
	if (isToday) return 'border-2 border-red-400';
	return 'border-2 border-transparent';
}

interface ICalendarCellProps {
	day: Date;
	events: TMaintenanceItem[];
	isCurrent: boolean;
	isToday: boolean;
	onClick: () => void;
	isSelected: boolean;
}

export function CalendarCell({
	day,
	events,
	isCurrent,
	isToday,
	onClick,
	isSelected
}: ICalendarCellProps) {
	const formatted = format(day, 'd');

	return (
		<div
			onClick={onClick}
			className={cn(
				'h-full min-h-24 bg-white drop-shadow-sm aspect-square rounded-[10px] p-1 flex flex-col gap-y-2.5 items-start relative transition overflow-y-auto scrollbar-none',
				!isCurrent && 'text-black/20',
				getBorderClass(isSelected, isToday)
			)}
		>
			<p
				className={cn(
					'size-8 flex justify-center items-center rounded-full text-h3 font-medium',
					isToday && 'bg-[#FF5454] text-white'
				)}
			>
				{formatted}
			</p>

			<div className='flex flex-col gap-1 w-full'>
				{events.map(ev => (
					<CalendarEvent key={ev.id} {...ev} />
				))}
			</div>
		</div>
	);
}
