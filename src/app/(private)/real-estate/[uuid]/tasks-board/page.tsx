import { Suspense } from 'react';

import { TasksLoader } from '@/components/widgets/tasks-board/TasksLoader';

export default async function TasksBoardPage({ params }: { params: Promise<{ uuid: string }> }) {
	const { uuid } = await params;

	return (
		<Suspense fallback={<h1>LOADING</h1>}>
			<TasksLoader uuid={uuid} />
		</Suspense>
	);
}
