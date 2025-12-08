import { RealEstateSidebarLoader } from '@/components/sidebar/real-estate-sidebar/RealEstateSidebarLoader';
import { CourtCasesListWidget } from '@/components/widgets/court-cases/court-cases-list/ListWidget';

import { getCourtCasesByRealEstate } from '@/domains/court-cases/api/api.server';
import type { Uuid } from '@/types/common';

interface ICourtCasesLoaderProps {
	uuid: Uuid;
}

export async function CourtCasesLoader({ uuid }: ICourtCasesLoaderProps) {
	const courtCasesResponse = await getCourtCasesByRealEstate(uuid);
	const courtCases = courtCasesResponse?.data.courtCases ?? [];

	return (
		<div className='flex gap-x-8 min-w-0'>
			<RealEstateSidebarLoader uuid={uuid} />
			<main className='flex-1 flex flex-col min-w-0'>
				<CourtCasesListWidget cases={courtCases} />
			</main>
		</div>
	);
}
