import { format } from 'date-fns';
import { ru } from 'date-fns/locale/ru';

import { Button } from '@/ui/Button';
import { Icon } from '@/ui/Icon';

interface ICalendarHeaderProps {
	currentMonth: Date;
	onPrev: () => void;
	onNext: () => void;
}

export function CalendarHeader({ currentMonth, onPrev, onNext }: ICalendarHeaderProps) {
	return (
		<div className='flex flex-col gap-y-5 mb-4'>
			<h2 className='text-h2 font-semibold'>Календарь</h2>
			<div className='flex items-center gap-x-3'>
				<div className='flex gap-x-1.5 text-h3 font-medium capitalize'>
					<span className='min-w-[115px]'>{format(currentMonth, 'LLLL', { locale: ru })}</span>
					<span>{format(currentMonth, 'yyyy', { locale: ru })}</span>
				</div>

				<Button variant='default' onClick={onPrev} className='py-2 px-4 cursor-pointer'>
					<Icon icon='ChevronLeft' size={20} />
				</Button>

				<Button onClick={onNext} className='py-2 px-4 cursor-pointer'>
					<Icon classNames='rotate-180' icon='ChevronLeft' size={20} />
				</Button>
			</div>
		</div>
	);
}
