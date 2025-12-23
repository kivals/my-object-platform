import type { IMedia } from '@/components/widgets/real-estate-gallery/model/types';
import { useGalleryStore } from '@/components/widgets/real-estate-gallery/model/useGalleryStore';

import { Icon } from '@/ui/Icon';
import { LoadingImage } from '@/ui/LoadingImage';

import { cn } from '@/utils/cn';

interface IMediaThumbnailProps {
	item: IMedia;
	selected: boolean;
	onSelect: () => void;
	onDelete?: () => void;
	isEdit?: boolean;
	isLoading?: boolean;
}

export function MediaThumbnail({
	item,
	selected,
	onSelect,
	onDelete,
	isEdit
}: IMediaThumbnailProps) {
	const isLoading = useGalleryStore(s => s.isLoading);

	return (
		<div
			onClick={onSelect}
			className={cn('relative rounded-[15px]', isLoading && 'pointer-events-none opacity-60')}
		>
			{isEdit && onDelete && (
				<button
					onClick={e => {
						e.stopPropagation();
						onDelete();
					}}
					className='cursor-pointer h-6 w-6 rounded-full bg-[#FF5454] absolute -right-2 -top-2
                     flex justify-center items-center text-white z-40'
				>
					<Icon icon='X' size={15} />
				</button>
			)}

			<div
				className={cn(
					'absolute inset-0 transition-opacity z-10 bg-background',
					selected ? 'opacity-0' : 'opacity-50'
				)}
			/>

			<LoadingImage
				containerClassName='rounded-[15px]'
				imageClassName='size-[75px]'
				width={75}
				height={75}
				src={item.url}
				alt=''
			/>
		</div>
	);
}
