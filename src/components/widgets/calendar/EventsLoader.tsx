import { RealEstateSidebar } from '@/components/sidebar/real-estate-sidebar/RealEstateSidebar';
import { Calendar } from '@/components/widgets/calendar/Calendar';

import { getAllTasks } from '@/domains/maintenance/api/api.server';
import { getRealEstateByUuid } from '@/domains/real-estate/api/api.server';
import { REAL_ESTATE_TYPE_LABELS } from '@/domains/real-estate/constants';
import type { Uuid } from '@/types/common';

interface ICalendarEventsLoaderProps {
	uuid: Uuid;
}

export async function CalendarEventsLoader({ uuid }: ICalendarEventsLoaderProps) {
	//todo тоже самое делается и в RealEstateItemLoader. или в стор или вынести в компонент RealEstateSidebar
	const realEstate = await getRealEstateByUuid(uuid);
	const addressLine = `${realEstate?.address.street}, ${realEstate?.address.building}, ${realEstate?.address.city}`;

	const allTasks = await getAllTasks();
	const realEstateTasks = allTasks?.data.tasks.filter(task => task.realEstateId !== uuid);

	return (
		<div className='flex gap-x-8 min-w-0'>
			<RealEstateSidebar
				typeLabel={REAL_ESTATE_TYPE_LABELS[realEstate?.type || 'house']}
				uuid={uuid}
				address={addressLine}
				area={realEstate?.area}
			/>
			<main className='flex-1 min-w-0'>
				<Calendar events={realEstateTasks ?? []} />
			</main>
		</div>
	);
}
