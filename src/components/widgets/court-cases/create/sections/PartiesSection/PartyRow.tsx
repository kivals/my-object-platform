import React from 'react';
import {
	type Control,
	type FieldArrayWithId,
	type FieldErrors,
	type UseFieldArrayRemove,
	type UseFormRegister
} from 'react-hook-form';

import { TextField } from '@/components/form/TextField';
import { PartySelectRole } from '@/components/widgets/court-cases/create/sections/PartiesSection/PartySelectRole';
import type { TFormCreateCourtCase } from '@/components/widgets/court-cases/create/validate/schema';

import { Button } from '@/ui/Button';
import { Icon } from '@/ui/Icon';

interface IPartyRowProps {
	fields: FieldArrayWithId<TFormCreateCourtCase, 'caseParties', 'id'>[];
	remove: UseFieldArrayRemove;
	register: UseFormRegister<TFormCreateCourtCase>;
	control: Control<TFormCreateCourtCase>;
	errors: FieldErrors<TFormCreateCourtCase>;
	index: number;
}

export function PartyRow({ index, register, fields, errors, remove, control }: IPartyRowProps) {
	return (
		<div className='flex gap-x-3.5 justify-between p-4 border border-gray-200 rounded-xl'>
			<div className='flex-shrink-0 basis-[220px]'>
				<PartySelectRole index={index} control={control} />
			</div>

			<div className='flex-1'>
				<TextField placeholder='Введите ФИО' {...register(`caseParties.${index}.fio`)} />
				{errors.caseParties?.[index]?.fio && (
					<p className='text-red-500 text-sm mt-1'>{errors.caseParties[index].fio?.message}</p>
				)}
			</div>

			{fields.length > 2 && (
				<Button
					type='button'
					variant='ghost'
					className='text-red-500 text-sm p-1'
					onClick={() => remove(index)}
				>
					<Icon icon='Trash2' classNames='text-red-500 h-full' size={26} />
				</Button>
			)}
		</div>
	);
}
