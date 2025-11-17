import { Button } from '@/ui/Button';
import { Icon } from '@/ui/Icon';

export function RealEstateItemHeader() {
	return (
		<div className='flex justify-between items-center mb-5'>
			<h1 className='font-semibold text-h2'>Описание объекта</h1>
			<Button className='' variant='default'>
				<Icon icon='Pencil' size={19} />
				Редактировать
			</Button>
		</div>
	);
}
