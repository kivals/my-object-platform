import { Controller } from 'react-hook-form';

import { FormError } from '@/components/form/FormError';
import { TextField } from '@/components/form/TextField';
import { useEditForm } from '@/components/widgets/real-estate-edit/hook/use-edit-form';

import { Button } from '@/ui/Button';
import { OptionGroup } from '@/ui/OptionGroup';
import { SectionCard } from '@/ui/SectionCard';
import { Separator } from '@/ui/Separator';

import type { RealEstate } from '@/domains/real-estate/api/schema';
import { REAL_ESTATE_TYPE_LABELS } from '@/domains/real-estate/constants';
import type { Uuid } from '@/types/common';

interface IRealEstateEditFormProps {
	data: RealEstate;
	uuid: Uuid;
}

export function RealEstateEditForm({ data, uuid }: IRealEstateEditFormProps) {
	const {
		state,
		form: {
			register,
			handleSubmit,
			control,
			formState: { errors },
			reset
		},
		onSubmit,
		isPending
	} = useEditForm({ data, uuid });

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
								classNames='self-start'
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
						suffix={() => <span className='font-medium text-h3 text-primary'>м²</span>}
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
