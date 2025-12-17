'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import {
	CreateRealEstateFormSchema,
	type TCreateRealEstateForm
} from '@/components/widgets/real-estate-create/validate/create.schema';

export function useCreateForm() {
	const form = useForm<TCreateRealEstateForm>({
		resolver: zodResolver(CreateRealEstateFormSchema),
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

	const onSubmit = (data: TCreateRealEstateForm) => {
		console.log('submitData', data);
		// сюда потом экшен / mutation
	};

	return {
		form,
		onSubmit
	};
}
