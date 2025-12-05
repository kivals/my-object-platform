import { Suspense } from 'react';

import { CalendarSkeleton } from '@/components/widgets/calendar/CalendarSkeleton';
import { CalendarEventsLoader } from '@/components/widgets/calendar/EventsLoader';

export default async function CalendarPage({ params }: { params: Promise<{ uuid: string }> }) {
	const { uuid } = await params;

	return (
		<Suspense fallback={<CalendarSkeleton />}>
			<CalendarEventsLoader uuid={uuid} />
		</Suspense>
	);
}
