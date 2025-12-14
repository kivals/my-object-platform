'use client';

import { ru } from 'date-fns/locale/ru';
import * as React from 'react';

import { START_YEAR, TO_YEAR } from '@/components/widgets/court-cases/create/calendar/constants';
import { formatDate, toDateOnly } from '@/components/widgets/court-cases/create/calendar/utils';

import { Button } from '@/ui/Button';
import { Icon } from '@/ui/Icon';
import { Input } from '@/ui/Input';
import { Label } from '@/ui/Label';
import { Calendar } from '@/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/ui/popover';

interface ICalendarSelectorProps {
	label?: string;
	value: string | null;
	onChange: (value: string | null) => void;
}

export function CalendarSelector({ label, value, onChange }: ICalendarSelectorProps) {
	const date = value ? new Date(value) : undefined;

	const [open, setOpen] = React.useState(false);
	const [month, setMonth] = React.useState<Date | undefined>(date);

	return (
		<div className='flex flex-col gap-3'>
			{label && <Label htmlFor='date'>{label}</Label>}
			<div className='relative flex gap-2'>
				<Input
					id='date'
					value={date ? formatDate(date) : ''}
					readOnly
					placeholder='Июнь 01, 2025'
					className='bg-background pr-10'
					onKeyDown={e => {
						if (e.key === 'ArrowDown') {
							e.preventDefault();
							setOpen(true);
						}
					}}
				/>
				<Popover open={open} onOpenChange={setOpen}>
					<PopoverTrigger asChild>
						<Button
							id='date-picker'
							variant='ghost'
							className='cursor-pointer p-4 bg-primary/10 absolute right-2 top-2 bottom-2'
						>
							<>
								<Icon icon='Calendar1' classNames='text-primary' size={36} />
								<span className='sr-only'>Select date</span>
							</>
						</Button>
					</PopoverTrigger>
					<PopoverContent
						className='w-auto overflow-hidden p-0'
						align='end'
						alignOffset={-8}
						sideOffset={10}
					>
						<Calendar
							mode='single'
							selected={date}
							captionLayout='dropdown'
							month={month}
							locale={ru}
							onMonthChange={setMonth}
							startMonth={new Date(START_YEAR, 0)}
							endMonth={new Date(TO_YEAR, 0)}
							onSelect={selected => {
								onChange(selected ? toDateOnly(selected) : null);
								setOpen(false);
							}}
						/>
					</PopoverContent>
				</Popover>
			</div>
		</div>
	);
}
