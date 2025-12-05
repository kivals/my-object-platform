import { cn } from '@/utils/cn';

export function CalendarSkeleton() {
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
				<div className='grid grid-cols-7 gap-2 auto-rows-[minmax(6rem,1fr)]'>
					{new Array(31).fill(0).map((_, i) => (
						<div key={i}>
							<div
								className={cn(
									'animate-pulse bg-gray-200 h-full min-h-24 drop-shadow-sm aspect-square rounded-[10px] p-1 flex flex-col gap-y-2.5 items-start relative transition overflow-y-auto scrollbar-none'
								)}
							></div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
