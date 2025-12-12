import React from 'react';
import type { FieldErrors, UseFormRegister } from 'react-hook-form';

import { TextField } from '@/components/form/TextField';
import type { TFormCreateCourtCase } from '@/components/widgets/court-cases/create/validate/schema';

interface IContactsSectionProps {
	register: UseFormRegister<TFormCreateCourtCase>;
	errors: FieldErrors<TFormCreateCourtCase>;
}

export function ContactsSection({ register, errors }: IContactsSectionProps) {
	return (
		<div className='flex flex-col gap-6'>
			<TextField
				label='ФИО судьи'
				placeholder='Введите ФИО'
				{...register('courtCase.judgeFio')}
				error={errors.courtCase?.judgeFio?.message}
			/>

			<TextField
				label='Email суда'
				placeholder='example@mail.ru'
				{...register('courtCase.email')}
				error={errors.courtCase?.email?.message}
			/>

			<TextField
				label='Телефон суда'
				placeholder='+7 (900) 000-00-00'
				{...register('courtCase.phone')}
				error={errors.courtCase?.phone?.message}
			/>
		</div>
	);
}
