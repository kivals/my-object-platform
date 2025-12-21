import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { format } from 'date-fns';

import { Badge } from '@/ui/Badge';

import { PRIORITY_LABELS } from './labels';
import type {
	TMaintenanceItem,
	TMaintenancePriority,
	TMaintenanceStatus
} from '@/domains/maintenance/api/schema';

const PRIORITY_CLASSES: Record<TMaintenancePriority, string> = {
	1: 'bg-[#FF5454]/20 text-[#FF5454]',
	2: 'bg-[#FFC72C]/20 text-[#FFC72C]',
	3: 'bg-[#3CCB7F]/20 text-[#3CCB7F]'
};

interface ITaskItemProps {
	task: TMaintenanceItem;
	column: TMaintenanceStatus;
}

export function TaskItem({ task, column }: ITaskItemProps) {
	const { setNodeRef, attributes, listeners, transform, transition } = useSortable({
		id: task.id,
		data: { column }
	});

	const style = {
		transform: CSS.Transform.toString(transform),
		transition
	};

	return (
		<div
			ref={setNodeRef}
			style={style}
			{...attributes}
			{...listeners}
			className={'bg-white rounded-xl shadow p-3 border border-black/5 transition '}
		>
			<div className='flex justify-between mb-2'>
				<Badge className={`p-2 ${PRIORITY_CLASSES[task.priority]}`}>
					{PRIORITY_LABELS[task.priority]}
				</Badge>

				<Badge variant='muted' className='p-2'>
					от {format(task.deadline, 'dd.MM.yyyy')}
				</Badge>
			</div>

			<h3 className='text-black font-medium text-h3'>{task.title}</h3>
			<p className='font-light text-body'>{task.description}</p>

			{task.status !== 'ready' && (
				<div className='text-center text-red-500 font-semibold mt-2'>
					до {format(task.deadline, 'dd.MM.yyyy')}
				</div>
			)}
		</div>
	);
}
