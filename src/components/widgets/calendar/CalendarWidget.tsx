'use client';

import { addMonths, format, subMonths } from 'date-fns';
import { useState } from 'react';

import { DayEvents } from '@/components/widgets/calendar/DayEvents';
import { CalendarGrid } from '@/components/widgets/calendar/Grid';

import { useCalendar } from '@/hooks/use-calendar';

import type { TMaintenanceItem } from '@/domains/maintenance/api/schema';

interface ICalendarProps {
	events: TMaintenanceItem[];
}

export function CalendarWidget({ events }: ICalendarProps) {
	const [currentMonth, setCurrentMonth] = useState(new Date());
	const { days, eventsMap } = useCalendar(events, currentMonth);
	const [selectedEvents, setSelectedEvents] = useState<TMaintenanceItem[]>(() => {
		const dayKey = format(Date.now(), 'yyyy-MM-dd');
		return eventsMap.get(dayKey) ?? [];
	});

	return (
		<section className='flex gap-y-8 flex-col '>
			<CalendarGrid
				onPrevMonth={() => setCurrentMonth(prev => subMonths(prev, 1))}
				onNextMonth={() => setCurrentMonth(prev => addMonths(prev, 1))}
				currentMonth={currentMonth}
				days={days}
				eventsMap={eventsMap}
				onDayClick={setSelectedEvents}
			/>
			<DayEvents events={selectedEvents ?? []} />
		</section>
	);
}
