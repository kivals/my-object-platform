import { DashboardSectionHeader } from '@/components/DashboardSectionHeader';
import { CasesList } from '@/components/widgets/court-cases/court-cases-list/CasesList';
import { CreateCourtCaseButton } from '@/components/widgets/court-cases/court-cases-list/CreateButton';

import { cn } from '@/utils/cn';

import type { TCourtCase } from '@/domains/court-cases/api/schema';

interface ICourtCasesListProps {
	cases: TCourtCase[];
}

export function CourtCasesListWidget({ cases }: ICourtCasesListProps) {
	return (
		<section className='flex flex-1 flex-col'>
			<DashboardSectionHeader title='Судебные дела'>
				<CreateCourtCaseButton />
			</DashboardSectionHeader>
			<div className={cn('flex-1 flex items-start', cases.length === 0 && 'items-center')}>
				{cases.length > 0 ? (
					<CasesList cases={cases} />
				) : (
					<h2 className='flex-1 text-center text-primary font-semibold text-h2'>
						Судебных дел нет
					</h2>
				)}
			</div>
		</section>
	);
}
