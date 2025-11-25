'use client';

import Image, { type ImageProps } from 'next/image';
import { useState } from 'react';

import { cn } from '@/utils/cn';

interface ILoadingImageProps extends ImageProps {
	placeholderClassName?: string;
	imageClassName?: string;
	containerClassName?: string;
}

export function LoadingImage({
	imageClassName,
	containerClassName,
	placeholderClassName = 'bg-gray-200',
	src,
	alt,
	...rest
}: ILoadingImageProps) {
	const [loaded, setLoaded] = useState(false);

	return (
		<div
			className={cn(
				'relative overflow-hidden rounded-[20px]',
				placeholderClassName,
				!loaded && 'animate-pulse',
				containerClassName
			)}
		>
			<Image
				{...rest}
				src={src}
				alt={alt}
				className={cn(
					'transition-opacity duration-300 object-contain',
					loaded ? 'opacity-100' : 'opacity-0',
					imageClassName
				)}
				onLoad={() => {
					setLoaded(true);
				}}
			/>
		</div>
	);
}
