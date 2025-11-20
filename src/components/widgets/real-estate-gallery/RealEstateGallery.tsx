'use client';

import { type ChangeEvent, useState } from 'react';

import { UploadImage } from '@/components/widgets/real-estate-gallery/UploadImage';

import { Icon } from '@/ui/Icon';
import { LoadingImage } from '@/ui/LoadingImage';

import { cn } from '@/utils/cn';

import type { Uuid } from '@/types/common';
import type { IClassNames } from '@/types/components/classname.types';

interface IMedia {
	uuid: Uuid;
	url: string;
}

interface IRealEstateGallery extends IClassNames {
	media: IMedia[];
	active?: Uuid;
	isEdit?: boolean;
	onUpload?: (file: File) => Promise<void>;
	onDelete?: (uuid: string) => void;
}

export function RealEstateGallery({
	media,
	active,
	classNames,
	isEdit = false,
	onUpload,
	onDelete
}: IRealEstateGallery) {
	const [activeMedia, setActiveMedia] = useState<IMedia>(
		() => media.find(m => m.uuid === active) || media[0]
	);

	async function handleUpload(e: ChangeEvent<HTMLInputElement>) {
		const file = e.target.files?.[0];

		if (file && onUpload) {
			try {
				await onUpload(file);
			} finally {
				e.target.value = '';
			}
		} else {
			e.target.value = '';
		}
	}

	return (
		<div className={cn(classNames, isEdit && 'bg-white')}>
			{/*Основное окно просмотра*/}
			<div className='mb-2 w-full h-[500px]'>
				<LoadingImage
					containerClassName='h-full'
					imageClassName='w-full'
					src={activeMedia.url}
					width='300'
					height='300'
					alt=''
				/>
			</div>

			{isEdit && <div className='mx-auto mt-6 mb-6 bg-[#868686]/50 w-[160px] h-0.5'></div>}

			{/*список всех картинок*/}
			<div className='flex justify-center gap-x-1.5'>
				{isEdit && <UploadImage onChange={handleUpload} />}
				{media.map((item, index) => (
					<div
						onClick={() => {
							console.log('HOSTING');
							setActiveMedia(item);
						}}
						className='relative rounded-[15px] cursor-pointer'
						key={index}
					>
						{isEdit && onDelete && (
							<div
								onClick={e => {
									e.stopPropagation();
									onDelete(item.uuid);
								}}
								className='h-6 rounded-full flex justify-center items-center w-6 bg-[#FF5454] absolute z-40 -right-2 -top-2'
							>
								<Icon icon='X' size={15} classNames='text-white' />
							</div>
						)}
						<div
							className={cn(
								'z-10 transition-opacity absolute bg-background top-0 bottom-0 left-0 right-0',
								activeMedia.uuid !== item.uuid ? 'opacity-50' : 'opacity-0'
							)}
						></div>

						<LoadingImage
							containerClassName='rounded-[15px]'
							imageClassName='size-[75px]'
							width={75}
							height={75}
							src={item.url}
							alt=''
						/>
					</div>
				))}
			</div>
		</div>
	);
}
