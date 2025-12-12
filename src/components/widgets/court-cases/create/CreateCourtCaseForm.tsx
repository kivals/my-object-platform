import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

import { ContactsSection } from '@/components/widgets/court-cases/create/sections/ContactsSection';
import { InfoSection } from '@/components/widgets/court-cases/create/sections/InfoSection';
import { PartiesSection } from '@/components/widgets/court-cases/create/sections/PartiesSection/PartiesSection';
import { PartyRow } from '@/components/widgets/court-cases/create/sections/PartiesSection/PartyRow';
import {
	type TFormCreateCourtCase,
	createCourtCaseSchema
} from '@/components/widgets/court-cases/create/validate/schema';

import { SectionCard } from '@/ui/SectionCard';

export function CreateCourtCaseForm() {
	const {
		register,
		control,
		handleSubmit,
		formState: { errors }
	} = useForm<TFormCreateCourtCase>({
		resolver: zodResolver(createCourtCaseSchema),
		defaultValues: {
			caseParties: [
				{ role: 'applicant', fio: '' },
				{ role: 'respondent', fio: '' }
			],
			courtCase: {
				name: '',
				instance: '',
				nextHearingDate: '',
				status: 'in_progress',
				judgeFio: '',
				email: '',
				phone: ''
			}
		}
	});

	const { fields, append, remove } = useFieldArray({
		control,
		name: 'caseParties'
	});

	const onSubmit = (data: TFormCreateCourtCase) => {
		console.log('SEND → ', data);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<SectionCard>
				<h3 className='text-h3 font-medium text-black/70 mb-3.5'>Информация о деле</h3>

				<div className='grid grid-cols-2 gap-6 mb-6'>
					<InfoSection register={register} errors={errors} control={control} />
					<ContactsSection register={register} errors={errors} />
				</div>

				<PartiesSection
					append={append}
					rows={fields.map((field, index) => (
						<PartyRow
							errors={errors}
							index={index}
							control={control}
							fields={fields}
							register={register}
							remove={remove}
							key={field.id}
						/>
					))}
				/>
				<div className='pt-4'>
					<button
						type='submit'
						className='bg-[#8D77FF] text-white px-6 py-3 rounded-xl font-medium hover:opacity-90 transition'
					>
						Создать дело
					</button>
				</div>
			</SectionCard>
		</form>
	);
}
