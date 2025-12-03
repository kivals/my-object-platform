import { Button } from '@/ui/Button';

interface ITenantsHeaderProps {
	onAdd: () => void;
}

export function TenantsHeader({ onAdd }: ITenantsHeaderProps) {
	return (
		<div className='flex justify-between items-center mb-5'>
			<h1 className='font-semibold text-h2'>Арендаторы</h1>
			<div className='flex gap-x-3.5'>
				<Button onClick={onAdd} variant='default'>
					Добавить
				</Button>
			</div>
		</div>
	);
}
