import { format } from 'date-fns';
import { ru } from 'date-fns/locale/ru';

import { cn } from '@/utils/cn';
import { formatRent } from '@/utils/money';

import type { TPaymentsSummary } from '@/domains/finance/api/schema';

interface ISummaryWidgetProps {
	summary: TPaymentsSummary;
}

export function PaymentsSummaryWidget({ summary }: ISummaryWidgetProps) {
	return (
		<div className='grid grid-cols-3 gap-5'>
			<SummaryCard
				title='Количество задолженностей'
				bottomClassName='bg-[#FF5454]'
				textClassName='text-[#FF5454]'
				value={String(summary.countOverduePayments)}
			/>

			{summary.nextPaymentDate && (
				<SummaryCard
					title='Дата предстоящего платежа'
					bottomClassName='bg-[#FFC32C]'
					value={format(summary.nextPaymentDate, 'd MMMM yyyy', { locale: ru })}
				/>
			)}

			{summary.nextPaymentAmount && (
				<SummaryCard
					title='Сумма предстоящего платежа'
					bottomClassName='bg-primary'
					value={formatRent(summary.nextPaymentAmount)}
				/>
			)}
		</div>
	);
}

interface ISummaryCardProps {
	title: string;
	value: string;
	bottomClassName?: string;
	textClassName?: string;
}

function SummaryCard({ title, value, bottomClassName, textClassName }: ISummaryCardProps) {
	return (
		<div className='pt-4 drop-shadow-xl flex h-[240px] flex-col justify-center rounded-[40px] bg-white overflow-hidden'>
			<div className='text-h3 text-center'>{title}</div>
			<div className='text-h1 self-center font-medium flex-1 flex justify-center items-center'>
				<span className={cn('text-center', textClassName)}>{value}</span>
			</div>
			<div className={cn('h-4 w-full', bottomClassName)}></div>
		</div>
	);
}
