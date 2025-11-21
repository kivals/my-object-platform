import { LoadingImage } from '@/ui/LoadingImage';

interface IMediaPreviewProps {
	url: string;
}

export function MediaPreview({ url }: IMediaPreviewProps) {
	return (
		<div className='mb-2 w-full h-[500px]'>
			<LoadingImage
				containerClassName='h-full h-[500px]'
				imageClassName='w-full object-contain'
				src={url}
				fill
				alt=''
			/>
		</div>
	);
}
