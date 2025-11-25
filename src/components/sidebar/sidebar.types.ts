import type { TLucideIcons } from '@/types/components/lucide.types';

export interface ISidebarDataItem {
	id: string;
	title: string;
	icon: TLucideIcons;
	link: string;
	isWork: boolean;
}
