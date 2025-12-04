import {
	PRIORITY_COLORS,
	STATUS_COLOR_CLASSES,
	STATUS_LABEL
} from '@/components/widgets/calendar/labels';

import { Badge } from '@/ui/Badge';
import { SectionCard } from '@/ui/SectionCard';

import { cn } from '@/utils/cn';

import type { TMaintenanceItem } from '@/domains/maintenance/api/schema';

interface ICalendarDayEventsProps {
	events: TMaintenanceItem[];
}

export function DayEvents({ events }: ICalendarDayEventsProps) {
	return (
		<SectionCard classNames='p-2 min-h-[300px]'>
			<h3 className='font-medium text-h3'>Задачи на выбранный день</h3>
			<div className='flex flex-1 flex-col justify-center'>
				{events.length > 0 ? (
					<div className='flex flex-wrap gap-3.5'>
						{events.map(({ id, status, priority, title }: TMaintenanceItem) => (
							<SectionCard
								key={id}
								classNames={cn(
									'p-3 justify-center flex flex-col justify-between items-center aspect-square w-[200px] shadow-none',
									PRIORITY_COLORS[priority]
								)}
							>
								<span className='text-center'>{title}</span>
								<Badge classNames={cn('text-primary text-sm', STATUS_COLOR_CLASSES[status])}>
									{STATUS_LABEL[status]}
								</Badge>
							</SectionCard>
						))}
					</div>
				) : (
					<span className='text-center text-primary font-semibold text-h3'>Задач нет</span>
				)}
			</div>
		</SectionCard>
	);
}
