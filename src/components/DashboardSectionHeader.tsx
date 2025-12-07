import type { ReactNode } from 'react';

interface IDashboardSectionHeaderProps {
	title: string;
	children?: ReactNode;
}

export function DashboardSectionHeader({ title, children }: IDashboardSectionHeaderProps) {
	return (
		<div className='flex justify-between items-center mb-5'>
			<h1 className='font-semibold text-h1'>{title}</h1>
			{children && <div className='flex gap-x-3.5'>{children}</div>}
		</div>
	);
}
