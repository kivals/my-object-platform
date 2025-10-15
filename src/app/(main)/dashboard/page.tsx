import { Suspense } from 'react';

import { ObjectsList } from '@/components/widgets/objects-list/ObjectsList';

export default function DashboardPage() {
	return (
		<section>
			<Suspense fallback={<div>Loading...</div>}>
				<ObjectsList />
			</Suspense>
		</section>
	);
}
