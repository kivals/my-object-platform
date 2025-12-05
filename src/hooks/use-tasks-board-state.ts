import type { DragEndEvent, DragOverEvent, DragStartEvent } from '@dnd-kit/core';
import { useCallback, useState } from 'react';

import type { TMaintenanceItem, TMaintenanceStatus } from '@/domains/maintenance/api/schema';

type ColumnId = TMaintenanceStatus;

interface UseTasksBoardStateOptions {
	onStatusChange?: (params: { taskId: string; to: ColumnId }) => void | Promise<void>;
}

export function useTasksBoardState(tasks: TMaintenanceItem[], options?: UseTasksBoardStateOptions) {
	const [state, setState] = useState<Record<TMaintenanceStatus, TMaintenanceItem[]>>(() => ({
		open: tasks.filter(t => t.status === 'open'),
		in_progress: tasks.filter(t => t.status === 'in_progress'),
		ready: tasks.filter(t => t.status === 'ready')
	}));

	const { onStatusChange } = options ?? {};

	const [activeTask, setActiveTask] = useState<TMaintenanceItem | null>(null);
	const [overColumn, setOverColumn] = useState<ColumnId | null>(null);

	const handleDragStart = useCallback(
		(event: DragStartEvent) => {
			const id = event.active.id;
			const allTasks = [...state.open, ...state.in_progress, ...state.ready];
			const task = allTasks.find(t => t.id === id);
			setActiveTask(task || null);
		},
		[state.open, state.in_progress, state.ready]
	);

	const handleDragOver = useCallback((event: DragOverEvent) => {
		const col = event.over?.data.current?.column as ColumnId | undefined;
		setOverColumn(col ?? null);
	}, []);

	const handleDragEnd = useCallback(
		({ active, over }: DragEndEvent) => {
			setActiveTask(null);
			setOverColumn(null);
			if (!over) return;

			const fromColumn = active.data.current?.column as ColumnId | undefined;
			const toColumn = over.data.current?.column as ColumnId | undefined;

			if (!fromColumn || !toColumn || fromColumn === toColumn) return;

			// локально обновляем стейт (оптимистично)
			setState(prev => {
				const fromTasks = prev[fromColumn];
				const toTasks = prev[toColumn];

				const task = fromTasks.find(t => t.id === active.id);
				if (!task) return prev;

				return {
					...prev,
					[fromColumn]: fromTasks.filter(t => t.id !== active.id),
					[toColumn]: [{ ...task, status: toColumn }, ...toTasks]
				};
			});

			if (onStatusChange) {
				onStatusChange({
					taskId: String(active.id),
					to: toColumn
				});
			}
		},
		[onStatusChange]
	);

	return {
		state,
		activeTask,
		overColumn,
		handleDragStart,
		handleDragEnd,
		handleDragOver
	};
}
