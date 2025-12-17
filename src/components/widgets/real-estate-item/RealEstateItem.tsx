'use client';

import Link from 'next/link';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

import { DashboardSectionHeader } from '@/components/DashboardSectionHeader';
import { RealEstateGallery } from '@/components/widgets/real-estate-gallery/RealEstateGallery';
import { RealEstateItemDescription } from '@/components/widgets/real-estate-item/RealEstateItemDescription';
import { RealEstateItemInfo } from '@/components/widgets/real-estate-item/RealEstateItemInfo';

import { Button } from '@/ui/Button';
import { Icon } from '@/ui/Icon';

import { cn } from '@/utils/cn';

import { deleteRealEstate } from '@/domains/real-estate/api/api.client';
import type { RealEstate } from '@/domains/real-estate/api/schema';
import { DASHBOARD_URL } from '@/routes';

interface IRealEstateItem {
	data: RealEstate;
}

export function RealEstateItem({ data }: IRealEstateItem) {
	const pathname = usePathname();
	const [isLoading, setIsLoading] = useState(false);
	const { uuid } = useParams<{ uuid: string }>();
	const router = useRouter();

	//todo useOptimistic чтобы не ждать ответ от сервера
	async function handleDelete() {
		if (!uuid) return;

		try {
			setIsLoading(true);
			await deleteRealEstate(uuid);
			router.push(`${DASHBOARD_URL}`);
			toast.success('Карточка объекта успешно удалена');
		} catch (err) {
			console.error('[handleDelete] Failed:', err);
			toast.error('Ошибка удаления карточки объекта');
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<section>
			<DashboardSectionHeader title='Описание объекта'>
				<Button
					disabled={isLoading}
					className={cn(isLoading && 'pointer-events-none')}
					asChild
					variant='default'
				>
					{isLoading ? (
						'Ожидайте'
					) : (
						<Link href={`${pathname}/edit`}>
							<Icon icon='Pencil' size={19} />
							Редактировать
						</Link>
					)}
				</Button>
			</DashboardSectionHeader>

			<RealEstateGallery
				classNames='mb-8'
				media={data.photos.map(p => ({
					uuid: p.photoUuid,
					url: p.url
				}))}
			/>

			<RealEstateItemInfo type={data.type} rent={data.rentalValue} area={data.area} />

			<RealEstateItemDescription text={data.description} />

			<Button
				onClick={handleDelete}
				className='flex mt-4 items-center gap-x-3.5 ml-auto'
				variant='attention'
				disabled={isLoading}
			>
				{isLoading ? 'Ожидайте' : 'Удалить объект недвижимости'}
				<Icon icon='Trash2' size={24} />
			</Button>
		</section>
	);
}
