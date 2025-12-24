'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

import { useConfirm } from '@/components/confirm';
import { DocumentEdit } from '@/components/widgets/documents/DocumentEdit';
import { FileCard } from '@/components/widgets/documents/FileCard';
import { DocumentEditForm } from '@/components/widgets/documents/upload/EditForm';
import { useApiAction } from '@/components/widgets/real-estate-edit/hook/useApiAction';

import { Badge } from '@/ui/Badge';

import type { DocumentsType } from '@/domains/documents/api/schema';
import type { TDocumentStatus } from '@/domains/documents/types';
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
	const status: TDocumentStatus = !isCompleted ? 'active' : 'completed';
	const { uuid } = useParams<{ uuid: string }>();
	const router = useRouter();
	const confirm = useConfirm();

	const [isEdit, setIsEdit] = useState(false);

	const { run: deleteAction, isLoading } = useApiAction({
		successMessage: 'Документ успешно удален',
		errorMessage: 'Ошибка удаления документа'
	});

	async function handleDelete() {
		if (!uuid || !documentUuid) return;

		await deleteAction(async () => {
			const ok = await confirm({
				title: 'Удалить документ?',
				description: 'Это действие нельзя отменить',
				confirmText: 'Удалить',
				cancelText: 'Отмена'
			});

			if (!ok) return false;

			await deleteFile(uuid, documentUuid, 'documents');
			router.push(`${REAL_ESTATE_URL}/${uuid}/documents`);
		});
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
						className='self-start rounded-[8px] px-3 py-1.5 text-[12px]'
						variant={isCompleted ? 'muted' : 'success'}
					>
						{label}
					</Badge>
				}
			/>
			{isEdit && (
				<DocumentEdit
					onClose={() => {
						setIsEdit(false);
					}}
					isOpen={isEdit}
					documentType={documentType}
					formBodyComp={
						<DocumentEditForm
							name={name}
							documentType={documentType}
							status={status}
							onClose={() => {
								setIsEdit(false);
							}}
							onDelete={handleDelete}
							isLoading={isLoading}
							documentUuid={documentUuid}
						/>
					}
				/>
			)}
		</>
	);
}
