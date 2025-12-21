'use client';

import { Controller } from 'react-hook-form';

import { TextField } from '@/components/form/TextField';
import { useCreateForm } from '@/components/widgets/real-estate-create/hooks/use-create-form';

import { Button } from '@/ui/Button';
import { OptionGroup } from '@/ui/OptionGroup';
import { SectionCard } from '@/ui/SectionCard';
import { Separator } from '@/ui/Separator';

import { REAL_ESTATE_TYPE_LABELS } from '@/domains/real-estate/constants';

export function RealEstateCreateForm() {
	const {
		form: {
			register,
			handleSubmit,
			control,
			formState: { errors }
		},
		onSubmit,
		isPending
	} = useCreateForm();
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className='flex gap-x-6'>
				<div className='w-1/2 flex-1 flex flex-col'>
					<h2 className='mb-4 font-bold text-h3'>Характеристики объекта</h2>
					<SectionCard className='gap-y-7 flex-1 px-8 py-6'>
						<TextField
							type='text'
							label='Название объекта'
							placeholder='Введите название'
							inputClassName='max-w-auto flex-1 placeholder:text-body'
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
										className='self-start'
										options={REAL_ESTATE_TYPE_LABELS}
										value={field.value}
										onChange={field.onChange}
									/>
								)}
							/>
						</div>

						<div className='flex gap-x-3.5 justify-between'>
							<TextField
								type='number'
								label='Арендная стоимость в месяц'
								placeholder='Введите стоимость'
								inputClassName='placeholder:text-body'
								labelClassName='text-body font-medium'
								suffix={() => <span className='font-medium text-h3 text-primary'>RUB</span>}
								error={errors.rentalValue?.message}
								{...register('rentalValue', { valueAsNumber: true })}
							/>

							<TextField
								type='number'
								label='Площадь'
								placeholder='Введите площадь'
								inputClassName='placeholder:text-body'
								labelClassName='text-body font-medium'
								suffix={() => <span className='font-medium text-h3 text-primary'>M²</span>}
								error={errors.area?.message}
								{...register('area', { valueAsNumber: true })}
							/>
						</div>

						<Separator orientation='horizontal' />

						<div className='flex gap-x-3.5'>
							<TextField
								type='text'
								label='Город'
								placeholder='Введите город'
								inputClassName='placeholder:text-body'
								labelClassName='text-body font-medium'
								className='flex-1'
								error={errors.address?.city?.message}
								{...register('address.city')}
							/>

							<TextField
								type='text'
								label='Дом'
								placeholder='Введите номер дома'
								inputClassName='placeholder:text-body'
								labelClassName='text-body font-medium'
								className='flex-1'
								error={errors.address?.building?.message}
								{...register('address.building')}
							/>
						</div>

						<TextField
							type='text'
							label='Улица'
							placeholder='Введите улицу'
							inputClassName='max-w-auto flex-1 placeholder:text-body'
							labelClassName='text-body font-medium'
							error={errors.address?.street?.message}
							{...register('address.street')}
						/>
					</SectionCard>
				</div>
				<div className='w-1/2 flex-1 flex flex-col gap-y-4'>
					<h2 className='font-bold text-h3'>Описание объекта</h2>
					<SectionCard className='flex-1 px-8 py-6'>
						<TextField
							label='Описание объекта'
							placeholder='Введите oписание'
							className='flex-1 flex flex-col'
							inputClassName='placeholder:text-body h-full'
							labelClassName='text-body font-medium'
							multiline
							error={errors.description?.message}
							{...register('description')}
						/>
					</SectionCard>
					<SectionCard>
						<Button
							disabled={isPending}
							type='submit'
							className='bg-[#8D77FF] text-white px-6 py-3 rounded-xl font-medium hover:opacity-90 transition'
						>
							{isPending ? 'Ожидайте' : 'Создать объект недвижимости'}
						</Button>
					</SectionCard>
				</div>
			</div>
		</form>
	);
}
