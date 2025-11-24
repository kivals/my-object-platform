import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { startTransition, useActionState, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { FormError } from '@/components/form/FormError';
import { TextField } from '@/components/form/TextField';

import { Button } from '@/ui/Button';
import { OptionGroup } from '@/ui/OptionGroup';
import { SectionCard } from '@/ui/SectionCard';
import { Separator } from '@/ui/Separator';

import { realEstateEditAction } from '@/actions/real-estate-edit.action';
import type { RealEstate } from '@/domains/real-estate/api/schema';
import { REAL_ESTATE_TYPE_LABELS } from '@/domains/real-estate/constants';
import { RealEstateFormSchema } from '@/domains/real-estate/validate/edit.schema';
import { REAL_ESTATE_URL } from '@/routes';
import type { Uuid } from '@/types/common';

interface IRealEstateEditFormProps {
	data: RealEstate;
	uuid: Uuid;
}

const initialState = { error: undefined, success: false };

export function RealEstateEditForm({ data, uuid }: IRealEstateEditFormProps) {
	const [state, action, isPending] = useActionState(realEstateEditAction, initialState);
	const router = useRouter();
	const {
		register,
		handleSubmit,
		formState: { errors },
		control,
		reset
	} = useForm<z.infer<typeof RealEstateFormSchema>>({
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

	// возвращаемся на просмотр ПОСЛЕ успешного сохранения
	useEffect(() => {
		if (state.success) {
			router.push(`${REAL_ESTATE_URL}/${uuid}`);
		}
	}, [state.success, router, uuid]);

	const onSubmit = async (submitData: z.infer<typeof RealEstateFormSchema>) => {
		startTransition(() => {
			action({
				name: submitData.name,
				type: submitData.type,
				area: submitData.area,
				rentalValue: submitData.rentalValue,
				description: submitData.description,
				manager: data.manager,
				uuid: uuid,
				address: submitData.address
			});
			state.error = '';
		});
	};
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<SectionCard classNames='gap-y-7 flex-1 px-8'>
				<TextField
					type='text'
					label='Название объекта'
					placeholder='Введите название'
					inputClassName='placeholder:text-body'
					labelClassName='text-body font-medium'
					error={errors.name?.message}
					{...register('name')}
				/>

				<div>
					<h3 className='mb-2 text-body font-medium'>Тип объекта</h3>
					<Controller
						name='type'
						control={control}
						render={({ field }) => (
							<OptionGroup
								options={REAL_ESTATE_TYPE_LABELS}
								value={field.value}
								onChange={field.onChange}
							/>
						)}
					/>
				</div>

				<div className='flex justify-between'>
					<TextField
						type='number'
						label='Арендная стоимость в месяц'
						placeholder='Введите стоимость'
						inputClassName='max-w-[200px] placeholder:text-body'
						labelClassName='text-body font-medium'
						error={errors.rentalValue?.message}
						{...register('rentalValue', { valueAsNumber: true })}
						suffix={() => <span className='font-medium text-h3 text-primary'>RUB</span>}
					/>

					<TextField
						type='number'
						label='Площадь'
						placeholder='Введите площадь'
						inputClassName='max-w-[200px] placeholder:text-body'
						labelClassName='text-body font-medium'
						error={errors.area?.message}
						{...register('area', { valueAsNumber: true })}
						suffix={() => <span className='font-medium text-h3 text-primary'>М2</span>}
					/>
				</div>

				<Separator orientation='horizontal' />

				<div className=' flex justify-between'>
					<TextField
						type='text'
						label='Город'
						placeholder='Введите город'
						inputClassName='placeholder:text-body'
						labelClassName='text-body font-medium'
						error={errors.address?.city?.message}
						{...register('address.city')}
					/>

					<TextField
						type='text'
						label='Улица'
						placeholder='Введите улицу'
						inputClassName='placeholder:text-body'
						labelClassName='text-body font-medium'
						error={errors.address?.street?.message}
						{...register('address.street')}
					/>
				</div>

				<TextField
					type='text'
					label='Дом'
					placeholder='Введите номер дома'
					inputClassName='placeholder:text-body max-w-[200px]'
					labelClassName='text-body font-medium'
					error={errors.address?.building?.message}
					{...register('address.building')}
				/>

				<Separator orientation='horizontal' />

				<TextField
					label='Описание объекта'
					placeholder='Введите oписание'
					inputClassName='placeholder:text-body'
					labelClassName='text-body font-medium'
					error={errors.description?.message}
					{...register('description')}
					multiline
				/>

				<FormError classNames='mb-10' message={state.error} />

				<Separator orientation='horizontal' />

				<div className='flex flex-col gap-y-7 cursor-pointer'>
					<Button disabled={isPending} type='submit'>
						{isPending ? 'Ожидайте' : 'Сохранить изменения'}
					</Button>
					<Button type='button' variant='transparent' disabled={isPending} onClick={() => reset()}>
						Сбросить
					</Button>
				</div>
			</SectionCard>
		</form>
	);
}
