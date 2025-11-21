import { LoadingImage } from '@/ui/LoadingImage';

interface IMediaPreviewProps {
	url: string;
}

export function MediaPreview({ url }: IMediaPreviewProps) {
	return (
		<div className='mb-2 w-full h-[500px]'>
			<LoadingImage
				containerClassName='h-full'
				imageClassName='w-full'
				src={url}
				width={300}
				height={300}
				alt=''
			/>
		</div>
	);
}
