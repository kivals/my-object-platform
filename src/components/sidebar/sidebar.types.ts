import type { TRole } from '@/types/common';
import type { TLucideIcons } from '@/types/components/lucide.types';

export interface ISidebarDataItem {
	id: string;
	title: string;
	icon: TLucideIcons;
	link: string;
}

export type TSidebarVariant = TRole | 'objects';
