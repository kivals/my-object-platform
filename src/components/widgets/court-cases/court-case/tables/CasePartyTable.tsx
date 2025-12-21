import { Fragment } from 'react';

import { COURT_CASE_ROLE_LABELS } from '@/components/widgets/court-cases/labels';

import { SectionCard } from '@/ui/SectionCard';

import { cn } from '@/utils/cn';

import type { TCaseParty } from '@/domains/court-cases/api/schema';

interface ICasePartiesTableProps {
	data: TCaseParty[];
}

export function CasePartiesTable({ data }: ICasePartiesTableProps) {
	return (
		<div className='flex flex-col'>
			<h3 className='text-h3 font-semibold mb-3.5'>Стороны</h3>
			<SectionCard className='flex-1 px-1 shadow-none drop-shadow'>
				<div className='grid grid-cols-2 gap-y-4 '>
					<div className='font-medium text-h3 text-center'>Роль</div>
					<div className='font-medium text-h3 text-center'>ФИО</div>

					{data.map(({ casePartyId, role, fio }, i) => (
						<Fragment key={casePartyId}>
							<div className={cn('text-h3 text-center', i % 2 === 1 && 'bg-[#FCFCFC] py-3')}>
								{COURT_CASE_ROLE_LABELS[role]}
							</div>
							<div className={cn('text-h3 text-center', i % 2 === 1 && 'bg-[#FCFCFC]  py-3')}>
								{fio}
							</div>
						</Fragment>
					))}
				</div>
			</SectionCard>
		</div>
	);
}
