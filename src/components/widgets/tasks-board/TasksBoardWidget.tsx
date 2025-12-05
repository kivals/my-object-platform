'use client';

import { DndContext, DragOverlay, rectIntersection } from '@dnd-kit/core';
import { toast } from 'sonner';

import { DashboardSectionHeader } from '@/components/DashboardSectionHeader';
import { Column } from '@/components/widgets/tasks-board/Column';
import { TaskItem } from '@/components/widgets/tasks-board/TaskItem';

import { useTasksBoardState } from '@/hooks/use-tasks-board-state';

import { changeTaskStatus } from '@/domains/maintenance/api/api.client';
import type { TMaintenanceItem } from '@/domains/maintenance/api/schema';

interface ITasksBoardWidgetProps {
	tasks: TMaintenanceItem[];
}

export function TasksBoardWidget({ tasks }: ITasksBoardWidgetProps) {
	const { state, activeTask, overColumn, handleDragStart, handleDragEnd, handleDragOver } =
		useTasksBoardState(tasks, {
			onStatusChange: async ({ taskId, to }) => {
				try {
					await changeTaskStatus(taskId, to);
					toast.success('Статус задачи изменен');
				} catch (e) {
					console.error('[updateTaskStatus] error', e);
					// TODO тут нужно:
					// 1) показать тост
					// 2) откатить локальный стейт (если нужно)
				}
			}
		});

	return (
		<section className='flex flex-1 flex-col h-full'>
			<DashboardSectionHeader title='Задачи' />

			<DndContext
				collisionDetection={rectIntersection}
				onDragStart={handleDragStart}
				onDragEnd={handleDragEnd}
				onDragOver={handleDragOver}
			>
				<div className='grid grid-cols-3 flex-1 gap-x-3.5'>
					<Column status={'open'} tasks={state['open']} isActive={overColumn === 'open'} />
					<Column
						status={'in_progress'}
						tasks={state['in_progress']}
						isActive={overColumn === 'in_progress'}
					/>
					<Column status={'ready'} tasks={state['ready']} isActive={overColumn === 'ready'} />
				</div>

				<DragOverlay>
					{activeTask && <TaskItem task={activeTask} column={activeTask.status} />}
				</DragOverlay>
			</DndContext>
		</section>
	);
}
