import { useGalleryStore } from '@/components/widgets/real-estate-gallery/model/useGalleryStore';

import { LoadingImage } from '@/ui/LoadingImage';
import { Spinner } from '@/ui/Spinner';

import { DEFAULT_IMAGE_PLACEHOLDER } from '@/utils/constants';

export function MediaPreview() {
	const url = useGalleryStore(s => s.active?.url);
	const isLoading = useGalleryStore(s => s.isLoading);

	return (
		<div className='mb-2 w-full h-[500px] flex items-center justify-center'>
			{isLoading ? (
				<Spinner className='size-96 text-gray-100' />
			) : (
				<LoadingImage
					containerClassName='h-full w-full h-[500px]'
					imageClassName='w-full'
					src={url ?? DEFAULT_IMAGE_PLACEHOLDER}
					fill
					alt=''
				/>
			)}
		</div>
	);
}
