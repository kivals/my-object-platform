import type { ChangeEvent } from 'react';

import { Icon } from '@/ui/Icon';
import { Spinner } from '@/ui/Spinner';

import { cn } from '@/utils/cn';

import type { IClassNames } from '@/types/components/classname.types';

interface IUploadImageProps extends IClassNames {
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
	acceptFileFormat: string;
	isLoading?: boolean;
}

export function UploadFileCard({
	onChange,
	classNames,
	acceptFileFormat,
	isLoading = false
}: IUploadImageProps) {
	return (
		<div
			className={cn(
				'opacity-100 pointer-events-auto',
				classNames,
				isLoading && 'opacity-50 pointer-events-none'
			)}
		>
			<input
				type='file'
				id='upload-file-input'
				hidden
				accept={acceptFileFormat}
				onChange={onChange}
			/>

			<label className='flex-1' htmlFor='upload-file-input'>
				<div className='flex items-center justify-center min-w-[75px] w-full h-full bg-[#F2F2F2] rounded-[15px] overflow-hidden cursor-pointer'>
					{isLoading ? (
						<Spinner className='size-12 text-[#868686]' />
					) : (
						<Icon icon='Upload' size={24} classNames='text-[#868686]' />
					)}
				</div>
			</label>
		</div>
	);
}
