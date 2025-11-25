import { usePathname } from 'next/navigation';
import { match } from 'path-to-regexp';

import { SidebarLink } from '@/components/sidebar/SidebarLink';
import type { ISidebarDataItem } from '@/components/sidebar/sidebar.types';

interface ISidebarMenuProps {
	menu: ISidebarDataItem[];
}

export function SidebarMenu({ menu }: ISidebarMenuProps) {
	const pathname = usePathname();

	return (
		<nav>
			<ul className='flex flex-col gap-y-9'>
				{menu.map(({ id, link, icon, title, isWork }) => (
					<li key={id}>
						<SidebarLink
							isWork={isWork}
							isActive={!!match(pathname)(link)}
							link={link}
							icon={icon}
							title={title}
						/>
					</li>
				))}
			</ul>
		</nav>
	);
}
