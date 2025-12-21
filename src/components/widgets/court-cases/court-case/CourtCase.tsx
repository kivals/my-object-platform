'use client';

import { useParams } from 'next/navigation';
import { type ChangeEvent, useState } from 'react';

import { DetailCourtCase } from '@/components/widgets/court-cases/court-case/DetailCourtCase';
import { DocumentList } from '@/components/widgets/court-cases/court-case/DocumentList';
import {
	COURT_CASE_STATUS_COLORS,
	COURT_CASE_STATUS_LABELS
} from '@/components/widgets/court-cases/labels';
import { useApiAction } from '@/components/widgets/real-estate-edit/hook/useApiAction';

import { Badge } from '@/ui/Badge';
import { DropdownSection } from '@/ui/DropdownSection';
import { Spinner } from '@/ui/Spinner';
import { UploadFileCard } from '@/ui/UploadFileCard';

import { cn } from '@/utils/cn';
import { ACCEPT_DOCUMENTS } from '@/utils/file-formats';

import { getCourtCaseDetails, uploadDocument } from '@/domains/court-cases/api/api.client';
import type { TCourtCase, TCourtCaseDetails } from '@/domains/court-cases/api/schema';

interface ICourtCaseProps {
	courtCase: TCourtCase;
}

export function CourtCase({ courtCase }: ICourtCaseProps) {
	const { uuid } = useParams<{ uuid: string }>();
	const [courtDetails, setCourtDetails] = useState<TCourtCaseDetails | null>(null);
	const {
		run: getDetailsAction,
		isLoading: isLoadingDetails,
		isError: IsErrorDetails
	} = useApiAction({
		errorMessage: 'Ошибка загрузки деталей судебного дела'
	});

	const { run: uploadAction, isLoading: isUploading } = useApiAction({
		successMessage: 'Документ успешно добавлен',
		errorMessage: 'Ошибка добавления документа'
	});

	async function handleExtendDetails() {
		if (!uuid) return;

		await getDetailsAction(async () => {
			const details = await getCourtCaseDetails(uuid, courtCase.courtCaseId);
			setCourtDetails(details);
		});
	}

	//todo useOptimistic чтобы не ждать ответ от сервера
	async function handleUpload(e: ChangeEvent<HTMLInputElement>) {
		await uploadAction(async () => {
			const file = e.target.files?.[0];
			e.target.value = '';

			if (!file) return;

			const response = await uploadDocument(uuid, courtCase.courtCaseId, file);
			const newDoc = response.documents[0];

			setCourtDetails(prev => {
				if (!prev) return prev;
				return {
					...prev,
					documents: [...(prev.documents ?? []), newDoc]
				};
			});
		});
	}

	return (
		<DropdownSection
			needToClose={IsErrorDetails}
			onDropdownClick={handleExtendDetails}
			visibleContent={
				<div
					id={courtCase.courtCaseId}
					className='grid w-full grid-cols-[minmax(0,1fr)_250px] items-center gap-x-3.5'
				>
					<span className='font-medium text-h3 truncate'>{courtCase.name}</span>

					<Badge className={cn('justify-center', COURT_CASE_STATUS_COLORS[courtCase.status])}>
						{COURT_CASE_STATUS_LABELS[courtCase.status]}
					</Badge>
				</div>
			}
			dropdownContent={
				isLoadingDetails ? (
					<div className='flex gap-x-3.5 items-center text-primary text-h3'>
						Загрузка <Spinner className='size-8' />
					</div>
				) : (
					courtDetails && (
						<DetailCourtCase
							details={courtDetails}
							documentList={
								<DocumentList
									documents={courtDetails.documents}
									uploadFileCard={
										<UploadFileCard
											isLoading={isUploading}
											className='border-2 border-primary/40 bg-[#F4F2FF] border-dashed flex w-[200px] h-[256px] rounded-[15px]'
											onChange={handleUpload}
											acceptFileFormat={ACCEPT_DOCUMENTS}
										/>
									}
								/>
							}
						/>
					)
				)
			}
		/>
	);
}
