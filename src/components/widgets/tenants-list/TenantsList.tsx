import { TenantItem } from '@/components/widgets/tenants-list/TenantItem';

import type { TenantsByRealEstateData } from '@/domains/tenants/api/schema';

interface ITenantsListProps {
	data: TenantsByRealEstateData;
}

export function TenantsList({ data }: ITenantsListProps) {
	return (
		<ul className='flex flex-1 flex-col gap-y-5'>
			{data.activeTenants.map(({ tenant, requisitesInn }) => (
				<li key={tenant.tenantId}>
					<TenantItem
						tenantUuid={tenant.tenantId}
						firstName={tenant.firstName}
						lastName={tenant.lastName}
						middleName={tenant.middleName}
						inn={requisitesInn}
						status={tenant.status}
					/>
				</li>
			))}
			{data.inactiveTenants.map(({ tenant, requisitesInn }) => (
				<li key={tenant.tenantId}>
					<TenantItem
						tenantUuid={tenant.tenantId}
						firstName={tenant.firstName}
						lastName={tenant.lastName}
						middleName={tenant.middleName}
						inn={requisitesInn}
						status={tenant.status}
					/>
				</li>
			))}
		</ul>
	);
}
