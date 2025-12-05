import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import dynamic from 'next/dynamic';

import { cn } from '@/utils/cn';

import { TASK_STATUS_LABEL } from './labels';
import type { TMaintenanceItem, TMaintenanceStatus } from '@/domains/maintenance/api/schema';

const TaskItem = dynamic(() => import('./TaskItem').then(mod => mod.TaskItem), { ssr: false });

const TITLE_STATUS_CLASS: Record<TMaintenanceStatus, string> = {
	open: 'text-primary',
	in_progress: 'text-[#FFC32C]',
	ready: 'text-[#27EC00]'
};

interface IColumnProps {
	status: TMaintenanceStatus;
	tasks: TMaintenanceItem[];
	isActive: boolean;
}

export function Column({ status, tasks, isActive }: IColumnProps) {
	const { setNodeRef } = useDroppable({
		id: status,
		data: { column: status }
	});

	return (
		<div className='flex flex-col items-center gap-y-4 h-full'>
			<h2 className={cn('text-h2 font-medium', TITLE_STATUS_CLASS[status])}>
				{TASK_STATUS_LABEL[status]}
			</h2>
			<div
				ref={setNodeRef}
				className={cn(
					`relative z-10 flex-1 min-h-[600px] w-full rounded-[20px] px-2 py-5 flex flex-col gap-y-2 
           overflow-y-auto transition-colors duration-200`,
					isActive ? 'bg-primary/10 border border-primary/40' : 'bg-white border border-transparent'
				)}
			>
				{isActive && (
					<div className='h-12 mb-2 rounded-lg border-2 border-dashed border-primary/50 bg-primary/5 flex items-center justify-center text-xs text-primary/70'>
						Перетащите задачу сюда
					</div>
				)}

				{!isActive && tasks.length === 0 && (
					<div className='h-12 rounded-lg border border-dashed border-black/20 flex items-center justify-center text-black/40'>
						Пока нет задач
					</div>
				)}
				<SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
					{tasks.map(t => (
						<TaskItem key={t.id} task={t} column={status} />
					))}
				</SortableContext>
			</div>
		</div>
	);
}
