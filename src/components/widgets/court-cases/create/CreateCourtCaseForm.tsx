import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, useRouter } from 'next/navigation';
import React, { startTransition, useActionState, useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { ContactsSection } from '@/components/widgets/court-cases/create/sections/ContactsSection';
import { InfoSection } from '@/components/widgets/court-cases/create/sections/InfoSection';
import { PartiesSection } from '@/components/widgets/court-cases/create/sections/PartiesSection/PartiesSection';
import { PartyRow } from '@/components/widgets/court-cases/create/sections/PartiesSection/PartyRow';
import {
	type TFormCreateCourtCase,
	createCourtCaseSchema
} from '@/components/widgets/court-cases/create/validate/schema';

import { SectionCard } from '@/ui/SectionCard';

import { createCourtCaseAction } from '@/actions/create-court-case.action';
import { REAL_ESTATE_URL } from '@/routes';

const initialState = { error: undefined, success: false };

export function CreateCourtCaseForm() {
	const [state, action, isPending] = useActionState(createCourtCaseAction, initialState);

	const { uuid } = useParams<{ uuid: string }>();
	const router = useRouter();
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
				nextHearingDate: new Date().toISOString(),
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

	// возвращаемся на просмотр ПОСЛЕ успешного сохранения
	useEffect(() => {
		if (state.success) {
			toast.success('Данные успешно сохранены');
			router.push(`${REAL_ESTATE_URL}/${uuid}`);
		} else if (state.error) {
			toast.error('Ошибка создания судебного дела. Проверьте дату заседания');
		}
	}, [state.success, state.error, router, uuid]);

	const onSubmit = async (submitData: TFormCreateCourtCase) => {
		startTransition(() => {
			action({
				uuid: uuid,
				courtCase: {
					...submitData.courtCase
				},
				caseParties: [...submitData.caseParties]
			});
			state.error = '';
		});
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
						disabled={isPending}
						type='submit'
						className='bg-[#8D77FF] text-white px-6 py-3 rounded-xl font-medium hover:opacity-90 transition'
					>
						{isPending ? 'Ожидайте' : 'Создать дело'}
					</button>
				</div>
			</SectionCard>
		</form>
	);
}
