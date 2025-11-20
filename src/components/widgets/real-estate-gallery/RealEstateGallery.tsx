'use client';

import { useState } from 'react';

import { Icon } from '@/ui/Icon';
import { LoadingImage } from '@/ui/LoadingImage';

import { cn } from '@/utils/cn';

import type { IClassNames } from '@/types/components/classname.types';

interface IRealEstateGallery extends IClassNames {
	media: string[];
	active?: string;
	isEdit?: boolean;
}

export function RealEstateGallery({
	media,
	active,
	classNames,
	isEdit = false
}: IRealEstateGallery) {
	const [activeMedia, setActiveMedia] = useState(() => active || media[0]);

	return (
		<div className={cn(classNames, isEdit && 'bg-white')}>
			{/*Основное окно просмотра*/}
			<div className='mb-2 w-full h-[500px]'>
				<LoadingImage
					containerClassName='h-full'
					imageClassName='w-full'
					src={activeMedia}
					width='300'
					height='300'
					alt=''
				/>
			</div>

			{isEdit && <div className='mx-auto mt-6 mb-6 bg-[#868686]/50 w-[160px] h-0.5'></div>}

			{/*список всех картинок*/}
			<div className='flex justify-center gap-x-1.5'>
				{isEdit && (
					<div className='flex items-center justify-center h-[75px] w-[75px] bg-[#F2F2F2] rounded-[15px] overflow-hidden cursor-pointer'>
						<Icon icon='Upload' size={24} classNames='text-[#868686]' />
					</div>
				)}
				{media.map((item, index) => (
					<div
						onClick={() => setActiveMedia(item)}
						className='relative rounded-[15px] cursor-pointer'
						key={index}
					>
						{isEdit && (
							<div className='h-6 rounded-full flex justify-center items-center w-6 bg-[#FF5454] absolute z-40 -right-2 -top-2'>
								<Icon icon='X' size={15} classNames='text-white' />
							</div>
						)}
						<div
							className={cn(
								'z-10 transition-opacity absolute bg-background top-0 bottom-0 left-0 right-0',
								activeMedia !== item ? 'opacity-50' : 'opacity-0'
							)}
						></div>

						<LoadingImage
							containerClassName='rounded-[15px]'
							imageClassName='size-[75px]'
							width={75}
							height={75}
							src={item}
							alt=''
						/>
					</div>
				))}
			</div>
		</div>
	);
}
