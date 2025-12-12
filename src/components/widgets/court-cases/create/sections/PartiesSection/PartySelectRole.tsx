import React from 'react';
import { type Control, Controller } from 'react-hook-form';

import type { TFormCreateCourtCase } from '@/components/widgets/court-cases/create/validate/schema';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/ui/Select';

interface IPartySelectRoleProps {
	index: number;
	control: Control<TFormCreateCourtCase>;
}

export function PartySelectRole({ index, control }: IPartySelectRoleProps) {
	return (
		<Controller
			name={`caseParties.${index}.role`}
			control={control}
			render={({ field }) => (
				<Select onValueChange={field.onChange} defaultValue={field.value}>
					<SelectTrigger className='ring-primary px-5 py-4 w-full shadow-[0_0_8px_0_rgb(0_0_0_/_22%)] text-h3 rounded-xl border-0'>
						<SelectValue placeholder='Выбор роли' />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value='applicant'>Истец</SelectItem>
						<SelectItem value='respondent'>Ответчик</SelectItem>
					</SelectContent>
				</Select>
			)}
		/>
	);
}
