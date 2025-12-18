'use client';

import { useParams } from 'next/navigation';
import { type ChangeEvent, useState } from 'react';
import { toast } from 'sonner';

import { DetailCourtCase } from '@/components/widgets/court-cases/court-case/DetailCourtCase';
import { DocumentList } from '@/components/widgets/court-cases/court-case/DocumentList';
import {
	COURT_CASE_STATUS_COLORS,
	COURT_CASE_STATUS_LABELS
} from '@/components/widgets/court-cases/labels';

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
	const [isLoadingDetails, setIsLoadingDetails] = useState(false);
	const [isUploading, setIsUploading] = useState(false);
	const { uuid } = useParams<{ uuid: string }>();
	const [courtDetails, setCourtDetails] = useState<TCourtCaseDetails | null>(null);
	const [isError, setIsError] = useState(false);

	async function handleExtendDetails() {
		if (!uuid) return;

		try {
			setIsError(false);
			setIsLoadingDetails(true);
			const response = await getCourtCaseDetails(uuid, courtCase.courtCaseId);
			setCourtDetails(response?.data);
		} catch (err) {
			setIsError(true);
			console.error('[handleGet] Failed:', err);
			toast.error('Ошибка загрузки деталей судебного дела');
		} finally {
			setIsLoadingDetails(false);
		}
	}

	async function handleUpload(e: ChangeEvent<HTMLInputElement>) {
		const file = e.target.files?.[0];
		e.target.value = '';

		if (!file) return;

		try {
			setIsUploading(true);
			const response = await uploadDocument(uuid, courtCase.courtCaseId, file);
			const newDoc = response.documents[0];
			setCourtDetails(prev => {
				if (!prev) return prev;
				return {
					...prev,
					documents: [...(prev.documents ?? []), newDoc]
				};
			});
			toast.success('Документ успешно добавлен');
		} catch (error) {
			console.error('[Court Case] upload error', error);
			toast.error('Ошибка добавления документа');
		} finally {
			setIsUploading(false);
		}
	}

	return (
		<DropdownSection
			needToClose={isError}
			onDropdownClick={handleExtendDetails}
			visibleContent={
				<div
					id={courtCase.courtCaseId}
					className='grid w-full grid-cols-[minmax(0,1fr)_250px] items-center gap-x-3.5'
				>
					<span className='font-medium text-h3 truncate'>{courtCase.name}</span>

					<Badge classNames={cn('justify-center', COURT_CASE_STATUS_COLORS[courtCase.status])}>
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
											classNames='border-2 border-primary/40 bg-[#F4F2FF] border-dashed flex w-[200px] h-[256px] rounded-[15px]'
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
