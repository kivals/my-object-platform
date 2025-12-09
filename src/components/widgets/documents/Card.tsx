'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

import { DocumentEdit } from '@/components/widgets/documents/DocumentEdit';
import { FileCard } from '@/components/widgets/documents/FileCard';

import { Badge } from '@/ui/Badge';

import type { DocumentsType } from '@/domains/documents/api/schema';
import { deleteFile } from '@/domains/real-estate/api/api.client';
import { REAL_ESTATE_URL } from '@/routes';
import type { Uuid } from '@/types/common';

interface IDocumentItemProps {
	documentUuid: Uuid;
	isCompleted: boolean;
	name: string;
	url: string;
	documentType: DocumentsType;
}

export function DocumentCard({
	name,
	isCompleted,
	url,
	documentType,
	documentUuid
}: IDocumentItemProps) {
	const label = isCompleted ? 'Завершенный' : 'Действующий';
	const [isEdit, setIsEdit] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const { uuid } = useParams<{ uuid: string }>();
	const router = useRouter();

	//todo useOptimistic чтобы не ждать ответ от сервера
	async function handleDelete() {
		if (!uuid || !documentUuid) return;

		try {
			setIsLoading(true);
			await deleteFile(uuid, documentUuid, 'documents');

			//TODO hack, нужно выяснить почему не сработал router.refresh();
			router.push(`${REAL_ESTATE_URL}/${uuid}/documents`);
		} catch (err) {
			console.error('[handleDelete] Failed:', err);
			toast.error('Ошибка удаления документа');
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<>
			<FileCard
				name={name}
				onClick={() => setIsEdit(true)}
				classNameContainer={isCompleted ? 'bg-[#F2F2F2]' : 'bg-[#2CFF2C]/10'}
				classNameIcon={isCompleted ? 'text-[#717171]/50' : 'text-[#27EC00]'}
				url={url}
				badge={
					<Badge
						classNames='self-start rounded-[8px] px-3 py-1.5 text-[12px]'
						variant={isCompleted ? 'muted' : 'success'}
					>
						{label}
					</Badge>
				}
			/>
			{isEdit && (
				<DocumentEdit
					documentUuid={documentUuid}
					name={name}
					onClose={() => {
						setIsEdit(false);
					}}
					isOpen={isEdit}
					isCompleted={isCompleted}
					documentType={documentType}
					onDelete={handleDelete}
					isLoading={isLoading}
				/>
			)}
		</>
	);
}
