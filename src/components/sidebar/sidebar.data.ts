import type { ISidebarDataItem } from '@/components/sidebar/sidebar.types';

export const SIDEBAR_DATA: ISidebarDataItem[] = [
	{
		id: 'main',
		title: 'Главная',
		icon: 'Info',
		link: '/dashboard'
	},
	{
		id: 'docs',
		title: 'Документы',
		icon: 'FileText',
		link: '/dashboard/docs'
	},
	{
		id: 'calendar',
		title: 'Календарь',
		icon: 'Calendar1',
		link: '/dashboard/calendar'
	},
	{
		id: 'tasks',
		title: 'Задачи',
		icon: 'SquareCheckBig',
		link: '/dashboard/tasks'
	},
	{
		id: 'tenant',
		title: 'Арендаторы',
		icon: 'Users',
		link: '/dashboard/tenant'
	},
	{
		id: 'chats',
		title: 'Чаты',
		icon: 'MessagesSquare',
		link: '/dashboard/chats'
	},
	{
		id: 'finance',
		title: 'Финансы',
		icon: 'Coins',
		link: '/dashboard/finance'
	},
	{
		id: 'legal-cases',
		title: 'Судебные дела',
		icon: 'Shield',
		link: '/dashboard/legal-cases'
	}
];
