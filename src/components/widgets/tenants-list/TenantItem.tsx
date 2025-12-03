'use client';

import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

import { Badge } from '@/ui/Badge';
import { Button } from '@/ui/Button';
import { Icon } from '@/ui/Icon';
import { SectionCard } from '@/ui/SectionCard';
import { Separator } from '@/ui/Separator';
import { Spinner } from '@/ui/Spinner';

import { cn } from '@/utils/cn';

import { deleteTenant } from '@/domains/tenants/api/api.client';
import type { TenantStatus } from '@/domains/tenants/validate/status.schema';
import { REAL_ESTATE_URL } from '@/routes';
import type { Uuid } from '@/types/common';

interface ITenantItemProps {
	tenantUuid: Uuid;
	firstName: string;
	lastName: string;
	middleName?: string;
	inn: string;
	status: TenantStatus;
	isActive: boolean;
}

//TODO вынести
export const TenantStatusLabels: Record<TenantStatus, string> = {
	natural_person: 'Физ. лицо',
	sole_proprietor: 'ИП',
	'self-employed': 'Самозанятый',
	limited_liability_company: 'ООО',
	'public_joint-stock_company': 'ПАО',
	'non-public_joint-stock_company': 'АО'
};

export function TenantItem({
	tenantUuid,
	firstName,
	lastName,
	middleName,
	inn,
	status,
	isActive
}: ITenantItemProps) {
	const [isOpen, setIsOpen] = useState(false);
	const contentRef = useRef<HTMLDivElement>(null);
	const [isLoading, setIsLoading] = useState(false);
	const { uuid } = useParams<{ uuid: string }>();
	const router = useRouter();

	//todo useOptimistic чтобы не ждать ответ от сервера
	async function handleDelete() {
		if (!uuid) return;

		try {
			setIsLoading(true);
			await deleteTenant(uuid, tenantUuid);

			//TODO hack, нужно выяснить почему не сработал router.refresh();
			router.push(`${REAL_ESTATE_URL}/${uuid}/tenants`);
			toast.success('Арендатель успешно откреплен');
		} catch (err) {
			console.error('[handleDelete] Failed:', err);
			toast.error('Ошибка открепления арендателя');
		} finally {
			setIsLoading(false);
			setIsOpen(false);
		}
	}

	useEffect(() => {
		if (contentRef.current) {
			const h = contentRef.current.scrollHeight;
			contentRef.current.parentElement?.style.setProperty('--target-height', `${h}px`);
		}
	}, [isOpen]);

	const fullName = middleName
		? `${lastName} ${firstName.charAt(0)}. ${middleName.charAt(0)}.`
		: `${lastName} ${firstName.charAt(0)}.`;

	return (
		<SectionCard classNames='px-0 py-0'>
			<div>
				<SectionCard classNames='shadow-xs'>
					<div
						className='cursor-pointer flex gap-x-3.5 justify-between items-center'
						onClick={() => setIsOpen(o => !o)}
					>
						<div className='flex flex-1 gap-x-3.5 items-center justify-between'>
							<div className='flex-1 flex gap-x-3.5 items-center'>
								<div className='font-medium text-h3'>
									{TenantStatusLabels[status]} {fullName}
								</div>
								<div className='h-6'>
									<Separator orientation='vertical' />
								</div>
								<span className='text-black/20 font-medium text-h3'>ИНН {inn}</span>
							</div>
							<Badge variant={isActive ? 'success' : 'muted'}>
								{isActive ? 'Действующий' : 'Не активен'}
							</Badge>
						</div>
						<div>
							<Icon
								classNames={cn('rotate-0 transition', isOpen && 'rotate-180')}
								icon='ChevronDown'
								size={24}
							/>
						</div>
					</div>
				</SectionCard>
				<SectionCard
					classNames={cn(
						'overflow-hidden transition-all duration-500 ease-in-out py-0 shadow-none bg-transparent',
						isOpen ? 'animate-expand' : 'animate-collapse'
					)}
				>
					<div ref={contentRef} className='flex justify-between gap-x-7 py-5 bg-transparent'>
						<div className='flex gap-x-7'>
							<div className='flex flex-col gap-y-2.5 text-h3'>
								<span className='text-black/50 font-normal'>Контактный телефон</span>
								<span className='font-medium'>
									<a href='tel:+7 (954) 123-45-67'>+7 (954) 123-45-67</a>
								</span>
							</div>
							<div className='flex flex-col gap-y-2.5 text-h3'>
								<span className='text-black/50 font-normal'>Почта</span>
								<span className='font-medium'>
									<a href='mailto:sidorov@mail.ru'>sidorov@mail.ru</a>
								</span>
							</div>
						</div>

						{isActive && (
							<Button
								className={cn(
									'py-1 px-5 text-sm flex justify-between cursor-pointer',
									isLoading && 'pointer-events-none'
								)}
								onClick={handleDelete}
								variant='attention'
								disabled={isLoading}
							>
								Открепить арендателя
								{isLoading ? <Spinner className='size-5' /> : <Icon icon='Trash2' size={20} />}
							</Button>
						)}
					</div>
				</SectionCard>
			</div>
		</SectionCard>
	);
}
