'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useParams } from 'next/navigation';
import React from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';

import { TextField } from '@/components/form/TextField';
import { CalendarSelector } from '@/components/widgets/court-cases/create/CalendarSelector';
import {
	type TFormCreateCourtCase,
	createCourtCaseSchema
} from '@/components/widgets/court-cases/create/validate/schema';
import { COURT_CASE_STATUS_LABELS } from '@/components/widgets/court-cases/labels';

import { BackButton } from '@/ui/BackButton';
import { Button } from '@/ui/Button';
import { Icon } from '@/ui/Icon';
import { OptionGroup } from '@/ui/OptionGroup';
import { SectionCard } from '@/ui/SectionCard';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/ui/Select';

import type { TCourtCaseStatus } from '@/domains/court-cases/api/schema';
import { REAL_ESTATE_URL } from '@/routes';

export function CreateCourtCase() {
	const { uuid } = useParams<{ uuid: string }>();
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
		<section>
			<header className='mb-12 flex justify-center items-center relative bg-white rounded-full h-[85px]'>
				<BackButton
					backUrl={`${REAL_ESTATE_URL}/${uuid}`}
					classNames='absolute inset-x-0 left-[15px] top-[50%] -translate-y-1/2 z-10'
				/>
				<h2 className='font-medium text-h2'>Создание судебного дела</h2>
			</header>
			<form onSubmit={handleSubmit(onSubmit)}>
				<SectionCard>
					<div className='grid grid-cols-2 gap-6'>
						{/* Общая информация */}
						<div className='flex flex-col gap-6'>
							<h3 className='text-h3 font-medium text-black/70'>Информация о деле</h3>

							<TextField
								label='Название дела'
								placeholder='Введите название'
								{...register('courtCase.name')}
								error={errors.courtCase?.name?.message}
							/>

							<TextField
								label='Судебная инстанция'
								placeholder='Например: Лефортовский районный суд'
								{...register('courtCase.instance')}
								error={errors.courtCase?.instance?.message}
							/>

							<CalendarSelector label='Ближайшая дата заседания' />

							<Controller
								name='courtCase.status'
								control={control}
								render={({ field }) => (
									<OptionGroup
										id='courtCase.status'
										title='Статус дела'
										value={field.value as TCourtCaseStatus}
										options={COURT_CASE_STATUS_LABELS}
										onChange={field.onChange}
										classNames='py-4'
									/>
								)}
							/>
						</div>
						{/* Судья + стороны */}
						<div className='flex flex-col gap-6'>
							<h3 className='text-h3 font-medium text-black/70'>Информация о сторонах дела</h3>
							<TextField
								label='ФИО судьи'
								placeholder='Введите ФИО'
								{...register('courtCase.judgeFio')}
								error={errors.courtCase?.judgeFio?.message}
							/>

							<TextField
								label='Email суда'
								placeholder='example@mail.ru'
								{...register('courtCase.email')}
								error={errors.courtCase?.email?.message}
							/>

							<TextField
								label='Телефон суда'
								placeholder='+7 (900) 000-00-00'
								{...register('courtCase.phone')}
								error={errors.courtCase?.phone?.message}
							/>

							{fields.map((field, index) => (
								<div
									key={field.id}
									className='flex gap-x-3.5 justify-between p-4 border border-gray-200 rounded-xl'
								>
									<div className='flex-shrink-0 basis-[220px]'>
										<Controller
											name={`caseParties.${index}.role`}
											control={control}
											render={({ field }) => (
												<Select onValueChange={field.onChange} defaultValue={field.value}>
													<SelectTrigger className='ring-primary px-5 py-4 w-full shadow-[0_0_8px_0_rgb(0_0_0_/_22%)] text-h3 rounded-xl border-0'>
														<SelectValue placeholder='Выбор роли' />
													</SelectTrigger>
													<SelectContent>
														<SelectItem value='applicant'>Истец</SelectItem>
														<SelectItem value='respondent'>Ответчик</SelectItem>
													</SelectContent>
												</Select>
											)}
										/>
									</div>

									<div className='flex-1'>
										<TextField
											placeholder='Введите ФИО'
											{...register(`caseParties.${index}.fio`)}
										/>
										{errors.caseParties?.[index]?.fio && (
											<p className='text-red-500 text-sm mt-1'>
												{errors.caseParties[index].fio?.message}
											</p>
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
							))}
							<button
								type='button'
								onClick={() => append({ role: 'applicant', fio: '' })}
								className='text-[#8D77FF] hover:opacity-80 text-sm font-medium'
							>
								+ Добавить сторону
							</button>
						</div>
					</div>
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
		</section>
	);
}
