import { Suspense } from 'react';

import { CalendarEventsLoader } from '@/components/widgets/calendar/EventsLoader';

export default async function CalendarPage({ params }: { params: Promise<{ uuid: string }> }) {
	const { uuid } = await params;

	return (
		<Suspense fallback={<h1 className='text-h2'>LOADING </h1>}>
			<CalendarEventsLoader uuid={uuid} />
		</Suspense>
	);
}
