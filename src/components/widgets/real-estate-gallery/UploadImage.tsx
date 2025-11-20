import type { ChangeEvent } from 'react';

import { Icon } from '@/ui/Icon';

interface IUploadImageProps {
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function UploadImage({ onChange }: IUploadImageProps) {
	return (
		<div>
			<input type='file' id='upload-photo-input' hidden accept='image/*' onChange={onChange} />

			<label htmlFor='upload-photo-input'>
				<div className='flex items-center justify-center h-[75px] w-[75px] bg-[#F2F2F2] rounded-[15px] overflow-hidden cursor-pointer'>
					<Icon icon='Upload' size={24} classNames='text-[#868686]' />
				</div>
			</label>
		</div>
	);
}
