import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, useRouter } from 'next/navigation';
import { startTransition, useActionState, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { FormError } from '@/components/form/FormError';
import { TextField } from '@/components/form/TextField';
import { TenantStatusLabels } from '@/components/widgets/tenants-list/TenantItem';
import { TenantSearch } from '@/components/widgets/tenants-list/form/TenantSearch';

import { Button } from '@/ui/Button';
import { OptionGroup } from '@/ui/OptionGroup';
import { SectionCard } from '@/ui/SectionCard';

import { tenantCreateAction } from '@/actions/tenant-create.action';
import { createFormSchema } from '@/domains/tenants/validate/create-form.schema';
import type { TTenantUser } from '@/domains/users/api/schema';
import { REAL_ESTATE_URL } from '@/routes';
import type { Uuid } from '@/types/common';

const initialState = { error: undefined, success: false };

interface ITenantAddFormProps {
	onClose: () => void;
}

export function TenantAddForm({ onClose }: ITenantAddFormProps) {
	const [selectedTenant, setSelectedTenant] = useState<TTenantUser | null>(null);
	const [state, action, isPending] = useActionState(tenantCreateAction, initialState);
	const [tenantError, setTenantError] = useState<string | null>(null);
	const { uuid } = useParams<{ uuid: Uuid }>();
	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: { errors },
		control
	} = useForm<z.infer<typeof createFormSchema>>({
		resolver: zodResolver(createFormSchema),
		defaultValues: {
			tenant: {
				legal_name: '',
				status: 'natural_person'
			},
			//todo временно, для этапа разработки и тестирования
			requisites: {
				bankAccountNumber: '70340000000000000000',
				bic: '660100000',
				beneficiaryBank: 'st',
				correspondentAccount: '22780000000000000000',
				inn: '5384000000',
				kpp: '234623464'
			}
		}
	});

	// возвращаемся на просмотр ПОСЛЕ успешного сохранения
	useEffect(() => {
		//todo есть задержка
		if (state.success) {
			onClose();
			toast.success('Данные успешно сохранены');
			router.push(`${REAL_ESTATE_URL}/${uuid}/tenants`);
			router.refresh();
		}
	}, [state.success]);

	const onSubmit = async (submitData: z.infer<typeof createFormSchema>) => {
		if (!selectedTenant) {
			setTenantError('Сначала выберите арендатора из списка.');
			return;
		}
		setTenantError(null);

		startTransition(() => {
			action({
				uuid: uuid,
				firstName: selectedTenant?.firstName || '',
				lastName: selectedTenant?.lastName || '',
				middleName: selectedTenant?.middleName || '',
				email: selectedTenant?.email || '',
				phone: selectedTenant?.phone || '',
				tenant: {
					status: submitData.tenant.status,
					legal_name: submitData.tenant.legal_name
				},
				requisites: {
					bankAccountNumber: submitData.requisites.bankAccountNumber,
					bic: submitData.requisites.bic,
					correspondentAccount: submitData.requisites.correspondentAccount,
					inn: submitData.requisites.inn,
					kpp: submitData.requisites.kpp,
					beneficiaryBank: submitData.requisites.beneficiaryBank
				}
			});
			state.error = '';
		});
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='space-y-8'>
			<TenantSearch onSelect={setSelectedTenant} />
			{tenantError && <p className='text-sm text-red-600 mt-2'>{tenantError}</p>}
			<SectionCard classNames='px-6 py-5 space-y-4'>
				<div className='flex items-center justify-between gap-4'>
					<h3 className='text-lg font-semibold text-black'>Арендатор</h3>

					{!selectedTenant && (
						<span className='text-sm text-black/50'>Выберите арендатора из списка выше</span>
					)}
				</div>

				<div className='grid grid-cols-3 gap-4'>
					<TextField label='Имя' value={selectedTenant?.firstName ?? ''} disabled />
					<TextField label='Фамилия' value={selectedTenant?.lastName ?? ''} disabled />
					<TextField label='Отчество' value={selectedTenant?.middleName ?? ''} disabled />
					<TextField label='Телефон' type='tel' value={selectedTenant?.phone ?? ''} disabled />
					<TextField label='Email' type='email' value={selectedTenant?.email ?? ''} disabled />
				</div>
			</SectionCard>

			<SectionCard classNames='px-6 py-5 space-y-4'>
				<div>
					<h3 className='mb-2 text-body font-medium'>Тип объекта</h3>
					<Controller
						name='tenant.status'
						control={control}
						render={({ field }) => (
							<OptionGroup
								classNames='self-start'
								options={TenantStatusLabels}
								value={field.value}
								onChange={field.onChange}
							/>
						)}
					/>
					<div className='mt-4'>
						<TextField
							label='Юридическое название'
							{...register('tenant.legal_name')}
							error={errors.tenant?.legal_name?.message}
						/>
					</div>
				</div>
			</SectionCard>

			<SectionCard classNames='px-6 py-5 space-y-4'>
				<h3 className='text-lg font-semibold text-black'>Реквизиты</h3>

				<div className='grid grid-cols-3 gap-4'>
					<TextField
						label='Расчётный счёт'
						{...register('requisites.bankAccountNumber')}
						error={errors.requisites?.bankAccountNumber?.message}
					/>

					<TextField
						label='БИК'
						{...register('requisites.bic')}
						error={errors.requisites?.bic?.message}
					/>

					<TextField
						label='Банк'
						{...register('requisites.beneficiaryBank')}
						error={errors.requisites?.beneficiaryBank?.message}
					/>

					<TextField
						label='Корреспондентский счёт'
						{...register('requisites.correspondentAccount')}
						error={errors.requisites?.correspondentAccount?.message}
					/>

					<TextField
						label='ИНН'
						{...register('requisites.inn')}
						error={errors.requisites?.inn?.message}
					/>

					<TextField
						label='КПП'
						{...register('requisites.kpp')}
						error={errors.requisites?.kpp?.message}
					/>
				</div>
				<FormError classNames='mb-10' message={state.error} />
				<div className='flex flex-col gap-y-7 cursor-pointer'>
					<Button disabled={isPending} type='submit'>
						{isPending ? 'Ожидайте' : 'Сохранить изменения'}
					</Button>
					<Button type='button' variant='transparent' disabled={isPending} onClick={onClose}>
						Отмена
					</Button>
				</div>
			</SectionCard>
		</form>
	);
}
