import type { ISidebarDataItem } from '@/components/sidebar/sidebar.types';

import { UserRole } from '@/types/common';

const ADMIN_SIDEBAR_DATA: ISidebarDataItem[] = [
	{ id: 'main', title: 'Главная', icon: 'Info', link: '/dashboard', isWork: true },
	{ id: 'docs', title: 'Документы', icon: 'FileText', link: '', isWork: false },
	{ id: 'calendar', title: 'Календарь', icon: 'Calendar1', link: '#', isWork: false },
	{ id: 'tasks', title: 'Задачи', icon: 'SquareCheckBig', link: '#', isWork: false },
	{ id: 'tenant', title: 'Арендаторы', icon: 'Users', link: '#', isWork: false },
	{ id: 'chats', title: 'Чаты', icon: 'MessagesSquare', link: '#', isWork: false },
	{ id: 'finance', title: 'Финансы', icon: 'Coins', link: '#', isWork: false },
	{ id: 'legal-cases', title: 'Судебные дела', icon: 'Shield', link: '#', isWork: false }
];

const OBJECTS_SIDEBAR_DATA: ISidebarDataItem[] = [
	{ id: 'overview', title: 'Описание объекта', icon: 'Info', link: '', isWork: true },
	{ id: 'documents', title: 'Документы', icon: 'FileText', link: '#', isWork: false },
	{ id: 'tenants', title: 'Арендаторы', icon: 'Users', link: '#', isWork: false },
	{ id: 'finance', title: 'Финансы', icon: 'Coins', link: '#', isWork: false },
	{ id: 'tasks', title: 'Задачи', icon: 'SquareCheckBig', link: '#', isWork: false },
	{ id: 'calendar', title: 'Календарь', icon: 'Calendar1', link: '#', isWork: false },
	{ id: 'cases', title: 'Судебные дела', icon: 'Shield', link: '#', isWork: false },
	{ id: 'video', title: 'Видеопросмотр', icon: 'Eye', link: '#', isWork: false },
	{ id: 'satellite', title: 'Спутник', icon: 'Globe', link: '#', isWork: false }
];

function getAdminSidebarData(): ISidebarDataItem[] {
	return ADMIN_SIDEBAR_DATA;
}

function getObjectSidebarData(uuid?: string): ISidebarDataItem[] {
	return OBJECTS_SIDEBAR_DATA.map(o => ({ ...o, link: `/real-estate/${uuid ?? uuid}/${o.link}` }));
}

function getSidebarData(role: UserRole | 'real-estate', uuid?: string): ISidebarDataItem[] {
	switch (role) {
		case 'admin':
			return getAdminSidebarData();
		case 'real-estate':
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
