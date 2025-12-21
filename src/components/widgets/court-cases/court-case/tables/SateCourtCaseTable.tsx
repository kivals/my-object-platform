import { Fragment } from 'react';

import { sortStatesByDateDesc } from '@/components/widgets/court-cases/court-case/tables/sort-state.utils';

import { SectionCard } from '@/ui/SectionCard';

import { cn } from '@/utils/cn';

import type { TStateCourtCase } from '@/domains/court-cases/api/schema';

interface ISateCourtCaseTableProps {
	data: TStateCourtCase[];
}

export function SateCourtCaseTable({ data }: ISateCourtCaseTableProps) {
	const sortedCases = sortStatesByDateDesc(data);

	return (
		<div className='flex flex-col'>
			<h3 className='text-h3 font-semibold mb-3.5'>Информация о состоянии дела</h3>
			<SectionCard className='flex-1 px-1 shadow-none drop-shadow'>
				<div className='grid grid-cols-2 gap-y-4 '>
					<div className='font-medium text-h3 text-center'>Дата</div>
					<div className='font-medium text-h3 text-center'>Состояние</div>

					{sortedCases.map(({ stateCourtCaseId, state, date }, i) => (
						<Fragment key={stateCourtCaseId}>
							<div className={cn('text-h3 text-center', i % 2 === 1 && 'bg-[#FCFCFC] py-3')}>
								{date}
							</div>
							<div className={cn('text-h3 text-center', i % 2 === 1 && 'bg-[#FCFCFC]  py-3')}>
								{state}
							</div>
						</Fragment>
					))}
				</div>
			</SectionCard>
		</div>
	);
}
