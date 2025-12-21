import { RealEstateCreateForm } from '@/components/widgets/real-estate-create/CreateForm';

import { BackButton } from '@/ui/BackButton';

import { DASHBOARD_URL } from '@/routes';

export default function RealEstateCreatePage() {
	return (
		<section>
			<header className='mb-12 flex justify-center items-center relative bg-white rounded-full h-[85px]'>
				<BackButton
					backUrl={`${DASHBOARD_URL}`}
					className='absolute inset-x-0 left-[15px] top-[50%] -translate-y-1/2 z-10'
				/>
				<h2 className='font-medium text-h2'>Создание объекта</h2>
			</header>
			<RealEstateCreateForm />
		</section>
	);
}
