import type { TDocumentStatus } from '@/domains/documents/types';

export const DOCUMENT_STATUS: Record<TDocumentStatus, string> = {
	active: 'Действующий',
	completed: 'Закончен'
} as const;

export const ALLOW_DOCUMENT_TYPES = '.pdf,.doc,.docx,.odt,.zip';
