'use client';

import { useState } from 'react';

import { LoadingImage } from '@/ui/LoadingImage';

import { cn } from '@/utils/cn';

import type { IClassNames } from '@/types/components/classname.types';

interface IRealEstateGallery extends IClassNames {
	media: string[];
	active?: string;
}

export function RealEstateGallery({ media, active, classNames }: IRealEstateGallery) {
	const [activeMedia, setActiveMedia] = useState(() => active || media[0]);

	return (
		<div className={classNames}>
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
			{/*список всех картинок*/}
			<div className='flex justify-center gap-x-1.5'>
				{media.map((item, index) => (
					<div
						onClick={() => setActiveMedia(item)}
						className='relative rounded-[15px] overflow-hidden cursor-pointer'
						key={index}
					>
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
