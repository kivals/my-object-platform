import React, { type ReactNode } from 'react';
import { type UseFieldArrayAppend } from 'react-hook-form';

import type { TFormCreateCourtCase } from '@/components/widgets/court-cases/create/validate/schema';

interface IPartiesSectionProps {
	append: UseFieldArrayAppend<TFormCreateCourtCase, 'caseParties'>;
	rows: ReactNode;
}

export function PartiesSection({ append, rows }: IPartiesSectionProps) {
	return (
		<div>
			<h3 className='text-h3 font-medium text-black/70 mb-3.5'>Информация о сторонах дела</h3>
			{rows}
			<button
				type='button'
				onClick={() => append({ role: 'applicant', fio: '' })}
				className='text-[#8D77FF] hover:opacity-80 text-sm font-medium'
			>
				+ Добавить сторону
			</button>
		</div>
	);
}
