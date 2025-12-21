'use client';

import type { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';

import { Badge } from '@/ui/Badge';

import { cn } from '@/utils/cn';
import { formatRent } from '@/utils/money';

import type { TPayment, TPaymentState } from '@/domains/finance/api/schema';
import { PAYMENT_STATE_LABELS } from '@/domains/finance/constants';

export const PAYMENT_STATE_COLORS: Record<TPaymentState, string> = {
	paid: 'bg-[#27EC00]/20 text-[#27EC00]',
	waiting: 'bg-[#FFF5D6] text-[#FFC32C]',
	overdue: 'bg-[#FF5454]/20 text-[#FF5454]'
} as const;

export const columns: ColumnDef<TPayment>[] = [
	{
		id: 'index',
		header: () => <div className='text-center font-medium'>#</div>,
		cell: ({ row }) => {
			const value = row.index + 1 > 9 ? String(row.index + 1) : `0${row.index + 1}`;
			return <div className='text-center'>{value}</div>;
		},
		enableSorting: false,
		enableColumnFilter: false
	},
	{
		accessorKey: 'paymentDate',
		header: () => <div className='font-medium'>Дата</div>,
		cell: ({ row }) => {
			const formattedDate = format(row.getValue('paymentDate'), 'yyyy-MM-dd');
			return <div className='text-center'>{formattedDate}</div>;
		}
	},
	{
		accessorKey: 'unknown_field',
		header: () => <div className='font-medium'>Плательщик</div>,
		cell: () => {
			return <div className='text-center text-primary font-semibold'>ИП Сидоров А.В</div>;
		}
	},
	{
		accessorKey: 'amount',
		header: 'Сумма',
		cell: ({ row }) => {
			const value = row.getValue('amount') as number;
			return <div className='text-center'>{formatRent(value)}</div>;
		}
	},
	{
		accessorKey: 'state',
		header: () => <div className='font-medium'>Статус</div>,
		cell: ({ row }) => {
			const state = row.getValue('state') as TPaymentState;
			const classes = PAYMENT_STATE_COLORS[state];

			return (
				<div className='flex justify-center'>
					<Badge variant='success' className={cn('w-[180px] justify-center', classes)}>
						{PAYMENT_STATE_LABELS[state]}
					</Badge>
				</div>
			);
		}
	}
];
