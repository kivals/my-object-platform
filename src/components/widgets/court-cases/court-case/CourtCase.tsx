'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

import { DetailCourtCase } from '@/components/widgets/court-cases/court-case/DetailCourtCase';
import {
	COURT_CASE_STATUS_COLORS,
	COURT_CASE_STATUS_LABELS
} from '@/components/widgets/court-cases/labels';

import { Badge } from '@/ui/Badge';
import { DropdownSection } from '@/ui/DropdownSection';
import { Spinner } from '@/ui/Spinner';

import { cn } from '@/utils/cn';

import { getCourtCaseDetails } from '@/domains/court-cases/api/api.client';
import type { TCourtCase, TCourtCaseDetails } from '@/domains/court-cases/api/schema';

interface ICourtCaseProps {
	courtCase: TCourtCase;
}

export function CourtCase({ courtCase }: ICourtCaseProps) {
	const [isLoading, setIsLoading] = useState(false);
	const { uuid } = useParams<{ uuid: string }>();
	const [courtDetails, setCourtDetails] = useState<TCourtCaseDetails | null>(null);
	const [isError, setIsError] = useState(false);

	async function handleExtendDetails() {
		if (!uuid) return;

		try {
			setIsError(false);
			setIsLoading(true);
			const response = await getCourtCaseDetails(uuid, courtCase.courtCaseId);
			setCourtDetails(response?.data);
		} catch (err) {
			setIsError(true);
			console.error('[handleGet] Failed:', err);
			toast.error('Ошибка загрузки деталей судебного дела');
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<DropdownSection
			needToClose={isError}
			onDropdownClick={handleExtendDetails}
			visibleContent={
				<div className='grid w-full grid-cols-[minmax(0,1fr)_250px] items-center gap-x-3.5'>
					<span className='font-medium text-h3 truncate'>{courtCase.name}</span>

					<Badge classNames={cn('justify-center', COURT_CASE_STATUS_COLORS[courtCase.status])}>
						{COURT_CASE_STATUS_LABELS[courtCase.status]}
					</Badge>
				</div>
			}
			dropdownContent={
				isLoading ? (
					<div className='flex gap-x-3.5 items-center text-primary text-h3'>
						Загрузка <Spinner className='size-8' />
					</div>
				) : (
					courtDetails && <DetailCourtCase details={courtDetails} />
				)
			}
		/>
	);
}
