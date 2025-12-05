import { Suspense } from 'react';

import { BoardSkeleton } from '@/components/widgets/tasks-board/BoardSkeleton';
import { TasksLoader } from '@/components/widgets/tasks-board/TasksLoader';

export default async function TasksBoardPage({ params }: { params: Promise<{ uuid: string }> }) {
	const { uuid } = await params;

	return (
		<Suspense fallback={<BoardSkeleton />}>
			<TasksLoader uuid={uuid} />
		</Suspense>
	);
}
