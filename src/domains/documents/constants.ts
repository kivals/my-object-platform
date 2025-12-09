import type { DocumentsType } from '@/domains/documents/api/schema';
import type { TDocumentStatus } from '@/domains/documents/types';

export const DOCUMENT_STATUS_LABEL: Record<TDocumentStatus, string> = {
	active: 'Действующий',
	completed: 'Завершенный'
} as const;

export const DOCUMENT_TYPE_LABEL: Record<Exclude<DocumentsType, 'court'>, string> = {
	contracts: 'Договор',
	invoices: 'Счет',
	acts: 'Акт'
} as const;

export const ALLOW_DOCUMENT_TYPES = '.pdf,.doc,.docx,.odt,.zip';
