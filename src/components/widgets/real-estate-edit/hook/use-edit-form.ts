'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { startTransition, useActionState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { realEstateEditAction } from '@/actions/real-estate-edit.action';
import type { RealEstate } from '@/domains/real-estate/api/schema';
import { RealEstateFormSchema } from '@/domains/real-estate/validate/edit.schema';
import { REAL_ESTATE_URL } from '@/routes';
import type { Uuid } from '@/types/common';

const initialState = { error: undefined, success: false };

interface IUseEditFormOptions {
	data: RealEstate;
	uuid: Uuid;
}

export function useEditForm({ data, uuid }: IUseEditFormOptions) {
	const [state, action, isPending] = useActionState(realEstateEditAction, initialState);
	const router = useRouter();

	const form = useForm<z.infer<typeof RealEstateFormSchema>>({
		resolver: zodResolver(RealEstateFormSchema),
		defaultValues: {
			name: data.name,
			type: data.type,
			area: data.area || 0,
			rentalValue: data.rentalValue || 0,
			description: data.description,
			address: {
				city: data.address.city,
				street: data.address.street,
				building: data.address.building
			}
		}
	});

	// todo избавиться
	// возвращаемся на просмотр ПОСЛЕ успешного сохранения
	useEffect(() => {
		if (state.success) {
			toast.success('Данные успешно сохранены');
			router.push(`${REAL_ESTATE_URL}/${uuid}`);
		}
	}, [state.success, router, uuid]);

	const onSubmit = async (submitData: z.infer<typeof RealEstateFormSchema>) => {
		startTransition(() => {
			action({
				...submitData,
				manager: data.manager,
				uuid: uuid
			});
		});
	};

	return {
		state,
		form,
		onSubmit,
		isPending
	};
}
