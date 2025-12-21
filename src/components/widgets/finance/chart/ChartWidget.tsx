'use client';

import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import { buildMonthlyPaymentsChartData } from '@/components/widgets/finance/chart/chartDataBuilder';

import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/ui/Chart';
import { SectionCard } from '@/ui/SectionCard';

import { formatRent } from '@/utils/money';

import type { TPayment } from '@/domains/finance/api/schema';

interface IChartWidgetProps {
	payments: TPayment[];
}

const chartConfig = {
	amount: {
		label: 'Сумма'
	}
} satisfies ChartConfig;

export function PaymentsChartWidget({ payments }: IChartWidgetProps) {
	const preparedChartData = buildMonthlyPaymentsChartData(payments);

	return (
		<SectionCard className='p-2'>
			<ChartContainer config={chartConfig} className='h-[300px] w-full'>
				<BarChart accessibilityLayer data={preparedChartData}>
					<CartesianGrid vertical={false} />
					<XAxis
						dataKey='month'
						tickLine={false}
						tickMargin={10}
						axisLine={false}
						tickFormatter={value => value.slice(0, 3)}
					/>
					<ChartTooltip content={<ChartTooltipContent valueFormatter={formatRent} />} />
					<Bar
						dataKey='amount'
						fill='#e1ddff'
						radius={4}
						activeBar={{ fill: 'var(--color-primary)' }}
					/>
				</BarChart>
			</ChartContainer>
		</SectionCard>
	);
}
