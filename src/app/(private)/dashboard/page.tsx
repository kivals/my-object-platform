import { RealEstateListWidget } from '@/components/widgets/real-estate-list/server/RealEstateListWidget';

import type { RealEstateType } from '@/domains/real-estate/api/schema';

interface PageProps {
	searchParams: Promise<{ type?: RealEstateType }>;
}

export default async function DashboardEntry({ searchParams }: PageProps) {
	const params = await searchParams;
	const { type } = params;

	return (
		<section>
			<RealEstateListWidget type={type ?? 'house'} />
		</section>
	);
}
