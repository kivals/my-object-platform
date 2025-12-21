'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { startTransition, useActionState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import {
	type TCreateRealEstateForm,
	createRealEstateFormSchema
} from '@/components/widgets/real-estate-create/validate/create.schema';

import { realEstateCreateAction } from '@/actions/real-estate-create.action';
import { ACTION_INITIAL_STATE } from '@/lib/actions/initialState';
import { REAL_ESTATE_URL } from '@/routes';

//TODO возможно стоит использовать этот хук для всех запросов на экшен
export function useCreateForm() {
	const [state, action, isPending] = useActionState(realEstateCreateAction, ACTION_INITIAL_STATE);
	const router = useRouter();

	const form = useForm<TCreateRealEstateForm>({
		resolver: zodResolver(createRealEstateFormSchema),
		defaultValues: {
			name: '',
			type: 'house',
			area: null,
			rentalValue: null,
			description: '',
			manager: '3fa85f64-5717-4562-b3fc-2c963f66af88', // TODO
			address: {
				city: '',
				street: '',
				building: ''
			}
		}
	});

	// todo избавиться
	useEffect(() => {
		if (state.success && state.payload) {
			const newRealEstateUuid = state.payload.realEstateUuid;
			toast.success('Объект недвижимости успешно создан. Теперь вы можете добавить фото');
			router.push(`${REAL_ESTATE_URL}/${newRealEstateUuid}/edit`);
		} else if (state.error) {
			toast.error('Ошибка создания недвижимости');
		}
	}, [state.success, state.error, router]);

	const onSubmit = (data: TCreateRealEstateForm) => {
		startTransition(() => {
			action(data);
		});
	};

	return {
		form,
		onSubmit,
		isPending
	};
}
