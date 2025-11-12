import type { ISidebarDataItem } from '@/components/sidebar/sidebar.types';

import { UserRole } from '@/types/common';

const ADMIN_SIDEBAR_DATA: ISidebarDataItem[] = [
	{ id: 'main', title: 'Главная', icon: 'Info', link: '/dashboard' },
	{ id: 'docs', title: 'Документы', icon: 'FileText', link: '/dashboard/docs' },
	{ id: 'calendar', title: 'Календарь', icon: 'Calendar1', link: '/dashboard/calendar' },
	{ id: 'tasks', title: 'Задачи', icon: 'SquareCheckBig', link: '/dashboard/tasks' },
	{ id: 'tenant', title: 'Арендаторы', icon: 'Users', link: '/dashboard/tenant' },
	{ id: 'chats', title: 'Чаты', icon: 'MessagesSquare', link: '/dashboard/chats' },
	{ id: 'finance', title: 'Финансы', icon: 'Coins', link: '/dashboard/finance' },
	{ id: 'legal-cases', title: 'Судебные дела', icon: 'Shield', link: '/dashboard/legal-cases' }
];

const OBJECTS_SIDEBAR_DATA: ISidebarDataItem[] = [
	{ id: 'overview', title: 'Описание объекта', icon: 'Info', link: '.' },
	{ id: 'documents', title: 'Документы', icon: 'FileText', link: 'docs' },
	{ id: 'tenants', title: 'Арендаторы', icon: 'Users', link: 'tenants' },
	{ id: 'finance', title: 'Финансы', icon: 'Coins', link: 'finance' },
	{ id: 'tasks', title: 'Задачи', icon: 'SquareCheckBig', link: 'tasks' },
	{ id: 'calendar', title: 'Календарь', icon: 'Calendar1', link: 'calendar' },
	{ id: 'cases', title: 'Судебные дела', icon: 'Shield', link: 'cases' },
	{ id: 'video', title: 'Видеопросмотр', icon: 'Eye', link: 'video' },
	{ id: 'satellite', title: 'Спутник', icon: 'Globe', link: 'satellite' }
];

function getAdminSidebarData(): ISidebarDataItem[] {
	return ADMIN_SIDEBAR_DATA;
}

function getObjectSidebarData(uuid?: string): ISidebarDataItem[] {
	return OBJECTS_SIDEBAR_DATA.map(o => ({ ...o, link: `/objects/${uuid ?? uuid}/${o.link}` }));
}

function getSidebarData(role: UserRole | 'objects', uuid?: string): ISidebarDataItem[] {
	switch (role) {
		case 'admin':
			return getAdminSidebarData();
		case 'objects':
			return getObjectSidebarData(uuid);
		case 'manager':
			//TODO
			return OBJECTS_SIDEBAR_DATA;
		default:
			//TODO
			return OBJECTS_SIDEBAR_DATA;
	}
}

export { getSidebarData };
