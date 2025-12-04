import { format, isSameMonth, isToday } from 'date-fns';
import { useState } from 'react';

import { CalendarCell } from '@/components/widgets/calendar/Cell';
import { CalendarHeader } from '@/components/widgets/calendar/Header';

import type { TMaintenanceItem } from '@/domains/maintenance/api/schema';

interface ICalendarGridProps {
	onDayClick: (events: TMaintenanceItem[]) => void;
	days: Date[];
	eventsMap: Map<string, TMaintenanceItem[]>;
	currentMonth: Date;
	onNextMonth: () => void;
	onPrevMonth: () => void;
}

export function CalendarGrid({
	onDayClick,
	days,
	eventsMap,
	currentMonth,
	onPrevMonth,
	onNextMonth
}: ICalendarGridProps) {
	const [selectedDayKey, setSelectedDayKey] = useState(() => format(Date.now(), 'yyyy-MM-dd'));
	return (
		<div className='w-full'>
			<CalendarHeader currentMonth={currentMonth} onPrev={onPrevMonth} onNext={onNextMonth} />

			<div className='grid grid-cols-7 gap-2 auto-rows-[minmax(6rem,1fr)]'>
				{days.map(day => {
					const dayKey = format(day, 'yyyy-MM-dd');
					const eventsForDay = eventsMap.get(dayKey) ?? [];

					return (
						<CalendarCell
							key={dayKey}
							onClick={() => {
								setSelectedDayKey(dayKey);
								onDayClick(eventsForDay);
							}}
							isSelected={selectedDayKey === dayKey}
							day={day}
							events={eventsForDay}
							isToday={isToday(day)}
							isCurrent={isSameMonth(day, currentMonth)}
						/>
					);
				})}
			</div>
		</div>
	);
}
