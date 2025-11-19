import { SectionCard } from '@/components/widgets/real-estate-item/SectionCard';

import { BackButton } from '@/ui/BackButton';
import { Input } from '@/ui/Input';
import { OptionGroup } from '@/ui/OptionGroup';
import { Textarea } from '@/ui/Textarea';

import { REAL_ESTATE_TYPE_LABELS } from '@/domains/real-estate/constants';

export function RealEstateEdit() {
	return (
		<section>
			<header className='mb-12 flex justify-center items-center relative bg-white rounded-full h-[85px]'>
				<BackButton classNames='absolute inset-x-0 left-[15px] top-[50%] -translate-y-1/2 z-10' />
				<h2 className='font-medium text-h2'>Редактирование объекта</h2>
			</header>

			<div className='flex gap-x-6'>
				<div className='flex-1'>
					<h2 className='mb-3 font-medium text-h2'>Характеристики объекта</h2>
					<SectionCard classNames='gap-y-7 flex-1 px-8'>
						<div>
							<h3 className='mb-3.5 text-h3 font-medium'>Тип объекта</h3>
							<OptionGroup options={REAL_ESTATE_TYPE_LABELS} value={'house'} />
						</div>

						<div>
							<h3 className='mb-3.5 text-h3 font-medium'>Арендная стоимость в месяц</h3>
							<div className='flex gap-x-4 items-center '>
								<Input className='max-w-[245px]' type='number' />
								<span className='font-medium text-h3 text-primary'>RUB</span>
							</div>
						</div>

						<div>
							<h3 className='mb-3.5 text-h3 font-medium'>Площадь</h3>
							<div className='flex gap-x-4 items-center '>
								<Input className='max-w-[245px]' type='number' />
								<span className='font-medium text-h3 text-primary'>М2</span>
							</div>
						</div>

						<div>
							<h3 className='mb-3.5 text-h3 font-medium'>Описание объекта</h3>
							<div className='flex gap-x-4 items-center '>
								<Textarea
									defaultValue='Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum cupiditate dicta
									harum itaque molestias non velit. A ad adipisci animi aut cumque ea eius error
									esse eum excepturi hic illum incidunt ipsam ipsum, labore laboriosam laudantium
									minima natus neque nesciunt non quaerat quas quis quos reprehenderit sapiente sit
									soluta suscipit tempora ut voluptate voluptates voluptatibus voluptatum. Aperiam
									assumenda blanditiis commodi deleniti ea eaque eius error et in iste iure
									laboriosam libero minima necessitatibus neque nesciunt nostrum numquam odio odit
									possimus, quibusdam quisquam ratione recusandae similique suscipit temporibus
									totam ullam veniam veritatis voluptates. Aspernatur dolorum necessitatibus nostrum
									quidem quis, suscipit tempore? Enim et facilis neque officia omnis quae quia rerum
									temporibus, vel voluptatibus? Ab accusantium ad amet aspernatur at aut commodi
									consequuntur corporis deserunt dolore dolorem doloremque dolorum enim eum facere
									facilis illum ipsa iure minima modi molestiae numquam officia, quia quibusdam quo
									repellat saepe sed sequi similique totam! Deleniti, illo.'
								/>
							</div>
						</div>
					</SectionCard>
				</div>
				<div className='flex-1'>
					<h2 className='mb-3 font-medium text-h2'>Фотографии объекта</h2>
					<SectionCard classNames='gap-y-7 flex-1 px-8'>
						<div>
							<h3 className='mb-3.5 text-h3 font-medium'>Тип объекта</h3>
							<OptionGroup options={REAL_ESTATE_TYPE_LABELS} value={'house'} />
						</div>

						<div>
							<h3 className='mb-3.5 text-h3 font-medium'>Арендная стоимость в месяц</h3>
							<div className='flex gap-x-4 items-center '>
								<Input className='max-w-[245px]' type='number' />
								<span className='font-medium text-h3 text-primary'>RUB</span>
							</div>
						</div>

						<div>
							<h3 className='mb-3.5 text-h3 font-medium'>Площадь</h3>
							<div className='flex gap-x-4 items-center '>
								<Input className='max-w-[245px]' type='number' />
								<span className='font-medium text-h3 text-primary'>М2</span>
							</div>
						</div>
					</SectionCard>
				</div>
			</div>
		</section>
	);
}
