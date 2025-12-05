import { RealEstateSidebarLoader } from '@/components/sidebar/real-estate-sidebar/RealEstateSidebarLoader';
import { TasksBoardWidget } from '@/components/widgets/tasks-board/TasksBoardWidget';

import { getAllTasks } from '@/domains/maintenance/api/api.server';
import type { Uuid } from '@/types/common';

interface ITasksLoaderProps {
	uuid: Uuid;
}

export async function TasksLoader({ uuid }: ITasksLoaderProps) {
	const allTasks = await getAllTasks();
	const realEstateTasks = allTasks?.data.tasks.filter(task => task.realEstateId !== uuid);

	return (
		<div className='flex gap-x-8 min-w-0'>
			<RealEstateSidebarLoader uuid={uuid} />
			<main className='flex-1 min-w-0'>
				<TasksBoardWidget tasks={realEstateTasks ?? []} />
			</main>
		</div>
	);
}
