import { CreateCourtCase } from '@/components/widgets/court-cases/create/CreateCourtCase';

export default async function CourtCasesPage({ params }: { params: Promise<{ uuid: string }> }) {
	return <CreateCourtCase />;
}
