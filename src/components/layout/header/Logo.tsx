import { Building2 } from 'lucide-react';

export function Logo() {
	return (
		<div className='flex gap-x-3 items-center leading-none'>
			<Building2 className='text-primary' size={28} />
			<p className='font-semibold text-logo'>
				Мой <span className='text-primary'>Объект</span>
			</p>
		</div>
	);
}
