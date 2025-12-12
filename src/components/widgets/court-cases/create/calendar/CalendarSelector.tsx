'use client';

import { ru } from 'date-fns/locale/ru';
import * as React from 'react';

import { Button } from '@/ui/Button';
import { Icon } from '@/ui/Icon';
import { Input } from '@/ui/Input';
import { Label } from '@/ui/Label';
import { Calendar } from '@/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/ui/popover';

function formatDate(date: Date | undefined) {
	if (!date) {
		return '';
	}

	return date.toLocaleDateString('ru-RU', {
		day: '2-digit',
		month: 'long',
		year: 'numeric'
	});
}

function isValidDate(date: Date | undefined) {
	if (!date) {
		return false;
	}
	return !isNaN(date.getTime());
}

const START_YEAR = 2000;
const TO_YEAR = new Date().getFullYear() + 5;

interface ICalendarSelectorProps {
	label?: string;
}

export function CalendarSelector({ label }: ICalendarSelectorProps) {
	const [open, setOpen] = React.useState(false);
	const [date, setDate] = React.useState<Date | undefined>(new Date());
	const [month, setMonth] = React.useState<Date | undefined>(date);
	const [value, setValue] = React.useState(formatDate(date));

	return (
		<div className='flex flex-col gap-3'>
			{label && <Label htmlFor='date'>{label}</Label>}
			<div className='relative flex gap-2'>
				<Input
					id='date'
					value={value}
					placeholder='Июнь 01, 2025'
					className='bg-background pr-10'
					onChange={e => {
						const date = new Date(e.target.value);
						setValue(e.target.value);
						if (isValidDate(date)) {
							setDate(date);
							setMonth(date);
						}
					}}
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
							onSelect={date => {
								setDate(date);
								setValue(formatDate(date));
								setOpen(false);
							}}
						/>
					</PopoverContent>
				</Popover>
			</div>
		</div>
	);
}
