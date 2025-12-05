import { RealEstateSidebarLoader } from '@/components/sidebar/real-estate-sidebar/RealEstateSidebarLoader';
import { CalendarWidget } from '@/components/widgets/calendar/CalendarWidget';

import { getAllTasks } from '@/domains/maintenance/api/api.server';
import type { Uuid } from '@/types/common';

interface ICalendarEventsLoaderProps {
	uuid: Uuid;
}

export async function CalendarEventsLoader({ uuid }: ICalendarEventsLoaderProps) {
	const allTasks = await getAllTasks();
	const realEstateTasks = allTasks?.data.tasks.filter(task => task.realEstateId !== uuid);

	return (
		<div className='flex gap-x-8 min-w-0'>
			<RealEstateSidebarLoader uuid={uuid} />
			<main className='flex-1 min-w-0'>
				<CalendarWidget events={realEstateTasks ?? []} />
			</main>
		</div>
	);
}
