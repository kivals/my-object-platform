import { LoadingImage } from '@/ui/LoadingImage';
import { Spinner } from '@/ui/Spinner';

interface IMediaPreviewProps {
	url: string;
	isLoading?: boolean;
}

export function MediaPreview({ url, isLoading = false }: IMediaPreviewProps) {
	return (
		<div className='mb-2 w-full h-[500px] flex items-center justify-center'>
			{isLoading ? (
				<Spinner className='size-96 text-gray-100' />
			) : (
				<LoadingImage
					containerClassName='h-full w-full h-[500px]'
					imageClassName='w-full object-contain'
					src={url}
					fill
					alt=''
				/>
			)}
		</div>
	);
}
