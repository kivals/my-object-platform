'use client';

import { useCallback, useEffect, useState } from 'react';

import { TextField } from '@/components/form/TextField';
import { useApiAction } from '@/components/widgets/real-estate-edit/hook/useApiAction';

import { useDebounce } from '@/hooks/use-debounce';

import { getTenantUsers } from '@/domains/users/api/api.client';
import type { TTenantUser } from '@/domains/users/api/schema';

const DEBOUNCE_DELAY_MS = 800;

interface Props {
	onSelect: (tenant: TTenantUser) => void;
}

export function TenantSearch({ onSelect }: Props) {
	const [search, setSearch] = useState('');
	const [open, setOpen] = useState(false);
	const [options, setOptions] = useState<TTenantUser[]>([]);
	const debouncedSearch = useDebounce(search, DEBOUNCE_DELAY_MS);

	const { run: searchTenantsAction, isLoading } = useApiAction({
		errorMessage: 'Ошибка загрузки арендаторов'
	});

	const fetchOptions = useCallback(async (query: string) => {
		if (!query.trim()) return;

		await searchTenantsAction(async () => {
			const result = await getTenantUsers(query);
			setOptions(result);
		});
	}, []);

	useEffect(() => {
		fetchOptions(debouncedSearch);
	}, [debouncedSearch, fetchOptions]);

	return (
		<div className='relative w-full'>
			<TextField
				value={search}
				onChange={e => {
					setSearch(e.target.value);
					setOpen(true);
				}}
				placeholder='Начните вводить ФИО арендатора'
			/>

			{open && (
				<div className='absolute left-0 right-0 mt-1 rounded-xl border bg-white shadow-lg z-20 overflow-hidden'>
					{isLoading && (
						<div className='flex items-center justify-center p-4 text-gray-500'>
							<div className='animate-spin h-5 w-5 border-2 border-gray-300 border-t-gray-500 rounded-full' />
						</div>
					)}

					{!isLoading && options.length === 0 && debouncedSearch.trim() && (
						<div className='p-4 text-sm text-gray-500'>Ничего не найдено</div>
					)}

					{!isLoading && options.length > 0 && (
						<ul className='max-h-64 overflow-y-auto'>
							{options.map(item => {
								const fio = `${item.lastName} ${item.firstName} ${item.middleName ?? ''}`.trim();
								return (
									<li
										key={item.id}
										className='px-4 py-2 cursor-pointer hover:bg-gray-100 transition-colors'
										onClick={() => {
											onSelect(item);
											setSearch(fio);
											setOpen(false);
										}}
									>
										<div className='font-medium'>{fio}</div>
										<div className='text-xs text-gray-500'>{item.email}</div>
									</li>
								);
							})}
						</ul>
					)}
				</div>
			)}
		</div>
	);
}
