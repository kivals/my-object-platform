import { type ReactNode } from 'react';

export function SectionCard({ children }: { children: ReactNode }) {
	return (
		<div className='shadow-md flex flex-col gap-y-2 items-center bg-white rounded-[20px] px-12 py-4'>
			{children}
		</div>
	);
}
