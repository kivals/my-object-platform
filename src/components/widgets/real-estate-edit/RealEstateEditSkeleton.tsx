export function RealEstateEditSkeleton() {
	return (
		<div className='h-[calc(100dvh-var(--height-header))] w-full'>
			<div className='mb-12 w-full animate-pulse bg-gray-200 h-[85px] rounded-full'></div>

			<div className='flex gap-x-6'>
				<div className='flex-1 rounded-[20px] h-[500px] animate-pulse bg-gray-200'></div>
				<div className='flex-1 rounded-[20px] animate-pulse bg-gray-200'></div>
			</div>
		</div>
	);
}
