import {
	COURT_CASE_STATUS_COLORS,
	COURT_CASE_STATUS_LABELS
} from '@/components/widgets/court-cases/labels';

import { Badge } from '@/ui/Badge';
import { DropdownSection } from '@/ui/DropdownSection';

import { cn } from '@/utils/cn';

import type { TCourtCase } from '@/domains/court-cases/api/schema';

interface ICasesListProps {
	cases: TCourtCase[];
}

export function CasesList({ cases }: ICasesListProps) {
	return (
		<ul className='flex flex-1 flex-col gap-y-5'>
			{cases.map(({ courtCaseId, name, status }) => (
				<li key={courtCaseId}>
					<DropdownSection
						visibleContent={
							<div className='grid w-full grid-cols-[minmax(0,1fr)_250px] items-center gap-x-3.5'>
								<span className='font-medium text-h3 truncate'>{name}</span>

								<Badge classNames={cn('justify-center', COURT_CASE_STATUS_COLORS[status])}>
									{COURT_CASE_STATUS_LABELS[status]}
								</Badge>
							</div>
						}
					/>
				</li>
			))}
		</ul>
	);
}
