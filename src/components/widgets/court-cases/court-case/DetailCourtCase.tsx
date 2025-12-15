import { format } from 'date-fns';
import type { ReactNode } from 'react';

import { CasePartiesTable } from '@/components/widgets/court-cases/court-case/tables/CasePartyTable';
import { SateCourtCaseTable } from '@/components/widgets/court-cases/court-case/tables/SateCourtCaseTable';

import type { TCourtCaseDetails } from '@/domains/court-cases/api/schema';

interface IDetailCourtCaseProps {
	details: TCourtCaseDetails;
	documentList: ReactNode;
}

export function DetailCourtCase({ details, documentList }: IDetailCourtCaseProps) {
	return (
		<div className='py-5'>
			<div className='grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] gap-y-6 gap-x-6 mb-8'>
				<div className='flex flex-col gap-y-1 text-h3'>
					<span className='text-black/50'>Судебная инстанция</span>
					<span className='font-medium'>{details.instance}</span>
				</div>
				<div className='flex flex-col gap-y-1 text-h3'>
					<span className='text-black/50'>Ближайшая дата заседания</span>
					<span className='font-semibold text-primary'>
						{details.nextHearingDate ? format(details.nextHearingDate, 'yyyy-MM-dd') : '----.--.--'}
					</span>
				</div>
				<div />

				<div className='flex flex-col gap-y-1 text-h3'>
					<span className='text-black/50'>Судья</span>
					<span className='font-medium'>{details.judgeFio}</span>
				</div>
				<div className='flex flex-col gap-y-1 text-h3'>
					<span className='text-black/50'>Контактный телефон судьи</span>
					<span className='font-semibold text-primary'>
						<a href={`tel:${details.phone}`}>{details.phone}</a>
					</span>
				</div>
				<div className='text-h3 flex flex-col gap-y-1'>
					<span className='text-black/50'>Почта</span>
					<span className='font-semibold text-primary'>
						<a href={`mailto:${details.email}`}>{details.email}</a>
					</span>
				</div>
			</div>

			<div className='grid grid-cols-2 gap-x-3.5 mb-8'>
				<CasePartiesTable data={details.caseParties} />
				<SateCourtCaseTable data={details.statesCourtCase} />
			</div>

			{documentList}
		</div>
	);
}
