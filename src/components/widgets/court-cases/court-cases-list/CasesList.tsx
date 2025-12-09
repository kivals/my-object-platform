import { CourtCase } from '@/components/widgets/court-cases/court-case/CourtCase';

import type { TCourtCase } from '@/domains/court-cases/api/schema';

interface ICasesListProps {
	cases: TCourtCase[];
}

export function CasesList({ cases }: ICasesListProps) {
	return (
		<ul className='flex flex-1 flex-col gap-y-5'>
			{cases.map(courtCase => (
				<li key={courtCase.courtCaseId}>
					<CourtCase courtCase={courtCase} />
				</li>
			))}
		</ul>
	);
}
