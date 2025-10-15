import type { CSSProperties } from 'react';
import { cn } from '@/utils/cn';

interface ISkeletonLoaderProps {
	count?: number;
	style?: CSSProperties;
	className?: string;
}

export function SkeletonLoader({ count = 1, className = '', style }: ISkeletonLoaderProps) {
	return (
		<>
			{Array.from({ length: count }).map((_, index) => (
				<div
					key={index}
					className={cn('bg-gray-200 rounded-sm h-10 mb-2.5 animate-pulse', className)}
					style={style}
				></div>
			))}
		</>
	);
}
