'use client';

import Link from 'next/link';
import { useParams, usePathname, useRouter } from 'next/navigation';

import { DashboardSectionHeader } from '@/components/DashboardSectionHeader';
import { useApiAction } from '@/components/widgets/real-estate-edit/hook/useApiAction';
import { RealEstateGallery } from '@/components/widgets/real-estate-gallery';
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

//todo ущербное название компонента
export function RealEstateItem({ data }: IRealEstateItem) {
	const pathname = usePathname();
	const { uuid } = useParams<{ uuid: string }>();
	const router = useRouter();

	const preparedPhotos = data.photos.map(p => ({
		uuid: p.photoUuid,
		url: p.url
	}));

	const { run: deleteAction, isLoading: isDeleting } = useApiAction({
		successMessage: 'Карточка объекта успешно удалена',
		errorMessage: 'Ошибка удаления карточки объекта'
	});

	async function handleDelete() {
		await deleteAction(async () => {
			await deleteRealEstate(uuid);
			router.push(`${DASHBOARD_URL}`);
		});
	}

	return (
		<section>
			<DashboardSectionHeader title='Описание объекта'>
				<Button
					disabled={isDeleting}
					className={cn(isDeleting && 'pointer-events-none')}
					asChild
					variant='default'
				>
					{isDeleting ? (
						'Ожидайте'
					) : (
						<Link href={`${pathname}/edit`}>
							<Icon icon='Pencil' size={19} />
							Редактировать
						</Link>
					)}
				</Button>
			</DashboardSectionHeader>

			<RealEstateGallery className='mb-8' media={preparedPhotos} />

			<RealEstateItemInfo type={data.type} rent={data.rentalValue} area={data.area} />

			<RealEstateItemDescription text={data.description} />

			<Button
				onClick={handleDelete}
				className='flex mt-4 items-center gap-x-3.5 ml-auto'
				variant='attention'
				disabled={isDeleting}
			>
				{isDeleting ? 'Ожидайте' : 'Удалить объект недвижимости'}
				<Icon icon='Trash2' size={24} />
			</Button>
		</section>
	);
}
