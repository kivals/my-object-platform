'use client';

import { useEffect, useRef, useState } from 'react';

import { Icon } from '@/ui/Icon';
import { SectionCard } from '@/ui/SectionCard';
import { Separator } from '@/ui/Separator';

import { cn } from '@/utils/cn';

import type { TenantStatus } from '@/domains/tenants/api/schema';

interface ITenantItemProps {
	firstName: string;
	lastName: string;
	middleName?: string;
	inn: string;
	status: TenantStatus;
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

export function TenantItem({ firstName, lastName, middleName, inn, status }: ITenantItemProps) {
	const [isOpen, setIsOpen] = useState(false);
	const contentRef = useRef<HTMLDivElement>(null);

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
						className='cursor-pointer flex justify-between items-center'
						onClick={() => setIsOpen(o => !o)}
					>
						<div className='flex gap-x-3.5 items-center'>
							<div className='font-medium text-h3'>
								{TenantStatusLabels[status]} {fullName}
							</div>
							<div className='h-6'>
								<Separator orientation='vertical' />
							</div>
							<span className='text-black/20 font-medium text-h3'>ИНН {inn}</span>
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
					<div ref={contentRef} className='flex flex-row gap-x-7 py-5 bg-transparent'>
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
				</SectionCard>
			</div>
		</SectionCard>
	);
}
