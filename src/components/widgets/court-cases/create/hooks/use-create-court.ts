import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { startTransition, useActionState, useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import {
	type TFormCreateCourtCase,
	createCourtCaseSchema
} from '@/components/widgets/court-cases/create/validate/schema';

import { createCourtCaseAction } from '@/actions/create-court-case.action';
import { ACTION_INITIAL_STATE } from '@/lib/actions/initialState';
import { REAL_ESTATE_URL } from '@/routes';
import type { Uuid } from '@/types/common';

interface IUseCreateCourtOptions {
	uuid: Uuid;
}

export function useCreateCourt({ uuid }: IUseCreateCourtOptions) {
	const [state, action, isPending] = useActionState(createCourtCaseAction, ACTION_INITIAL_STATE);

	const router = useRouter();

	const form = useForm<TFormCreateCourtCase>({
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

	const fieldsForm = useFieldArray({
		control: form.control,
		name: 'caseParties'
	});

	// возвращаемся на просмотр ПОСЛЕ успешного сохранения
	useEffect(() => {
		if (state.success) {
			toast.success('Данные успешно сохранены');
			router.push(`${REAL_ESTATE_URL}/${uuid}/court-cases`);
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
		});
	};

	return {
		form,
		fieldsForm,
		onSubmit,
		isPending
	};
}
