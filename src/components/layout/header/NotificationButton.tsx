import { Bell } from 'lucide-react';

export function NotificationButton() {
	return (
		<div className='group cursor-pointer flex items-center justify-center w-12 h-12 bg-[#b2b2b2]/20 rounded-xl shadow-sm text-white'>
			<Bell
				size={24}
				className='group-hover:text-primary transition group-hover:rotate-6 text-[#666666]'
			/>
		</div>
	);
}
