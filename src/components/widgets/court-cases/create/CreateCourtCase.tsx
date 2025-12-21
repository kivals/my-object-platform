'use client';

import { useParams } from 'next/navigation';
import React from 'react';

import { CreateCourtCaseForm } from '@/components/widgets/court-cases/create/CreateCourtCaseForm';

import { BackButton } from '@/ui/BackButton';

import { REAL_ESTATE_URL } from '@/routes';

export function CreateCourtCase() {
	const { uuid } = useParams<{ uuid: string }>();

	return (
		<section>
			<header className='mb-6 flex justify-center items-center relative bg-white rounded-full h-[85px]'>
				<BackButton
					backUrl={`${REAL_ESTATE_URL}/${uuid}`}
					className='absolute inset-x-0 left-[15px] top-[50%] -translate-y-1/2 z-10'
				/>
				<h2 className='font-medium text-h2'>Создание судебного дела</h2>
			</header>
			<CreateCourtCaseForm />
		</section>
	);
}
