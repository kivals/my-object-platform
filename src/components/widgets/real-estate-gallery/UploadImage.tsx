import type { ChangeEvent } from 'react';

import { Icon } from '@/ui/Icon';

import { cn } from '@/utils/cn';

import type { IClassNames } from '@/types/components/classname.types';

interface IUploadImageProps extends IClassNames {
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function UploadImage({ onChange, classNames }: IUploadImageProps) {
	return (
		<div className={cn('opacity-100 pointer-events-auto', classNames)}>
			<input type='file' id='upload-photo-input' hidden accept='image/*' onChange={onChange} />

			<label htmlFor='upload-photo-input'>
				<div className='flex items-center justify-center h-[75px] w-[75px] bg-[#F2F2F2] rounded-[15px] overflow-hidden cursor-pointer'>
					<Icon icon='Upload' size={24} classNames='text-[#868686]' />
				</div>
			</label>
		</div>
	);
}
