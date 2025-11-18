export function RealEstateItemPageSkeleton() {
	return (
		<div className='flex gap-x-8 h-[calc(100dvh-var(--height-header))] w-full'>
			<div className='flex flex-col gap-y-3.5 rounded-[40px] w-[400px]'>
				<div className='rounded-[40px] animate-pulse bg-gray-200 h-32'></div>
				<div className='rounded-[40px] animate-pulse bg-gray-200 h-28'></div>
				<div className='flex p-9 flex-col justify-between rounded-[40px] animate-pulse bg-gray-200 flex-1'>
					{Array.from({ length: 6 }).map((_, i) => (
						<div key={i} className='h-10 rounded-lg bg-gray-300'></div>
					))}
				</div>
			</div>
			<div className='flex gap-y-7 flex-col flex-1'>
				<div className='rounded-[40px] flex-1 animate-pulse bg-gray-200'></div>
				<div className='rounded-[40px] flex-1 animate-pulse bg-gray-200'></div>
			</div>
		</div>
	);
}
