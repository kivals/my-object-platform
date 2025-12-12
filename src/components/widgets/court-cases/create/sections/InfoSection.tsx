import React from 'react';
import { type Control, Controller, type FieldErrors, type UseFormRegister } from 'react-hook-form';

import { TextField } from '@/components/form/TextField';
import { CalendarSelector } from '@/components/widgets/court-cases/create/calendar/CalendarSelector';
import type { TFormCreateCourtCase } from '@/components/widgets/court-cases/create/validate/schema';
import { COURT_CASE_STATUS_LABELS } from '@/components/widgets/court-cases/labels';

import { OptionGroup } from '@/ui/OptionGroup';

import type { TCourtCaseStatus } from '@/domains/court-cases/api/schema';

interface IInfoSectionProps {
	register: UseFormRegister<TFormCreateCourtCase>;
	errors: FieldErrors<TFormCreateCourtCase>;
	control: Control<TFormCreateCourtCase>;
}

export function InfoSection({ register, errors, control }: IInfoSectionProps) {
	return (
		<div className='flex flex-col gap-6'>
			<TextField
				label='Название дела'
				placeholder='Введите название'
				{...register('courtCase.name')}
				error={errors.courtCase?.name?.message}
			/>

			<TextField
				label='Судебная инстанция'
				placeholder='Например: Лефортовский районный суд'
				{...register('courtCase.instance')}
				error={errors.courtCase?.instance?.message}
			/>

			<CalendarSelector label='Ближайшая дата заседания' />

			<Controller
				name='courtCase.status'
				control={control}
				render={({ field }) => (
					<OptionGroup
						id='courtCase.status'
						title='Статус дела'
						value={field.value as TCourtCaseStatus}
						options={COURT_CASE_STATUS_LABELS}
						onChange={field.onChange}
						classNames='py-4'
					/>
				)}
			/>
		</div>
	);
}
