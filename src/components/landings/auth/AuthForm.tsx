import { Button } from '@/ui/Button';
import { Input } from '@/ui/Input';
import { Label } from '@/ui/Label';

export function AuthForm() {
	return (
		<div className='flex flex-col items-center py-14 px-20 bg-white rounded-xl max-w-[830px]'>
			<div className='w-[600px]'>
				<h1 className='text-h2 font-bold mb-10'>Вход или регистрация</h1>

				<div className='mb-7'>
					<Label className='mb-2.5' htmlFor='login'>
						Логин
					</Label>
					<Input id='login' type='email' placeholder='Введите логин' />
				</div>

				<div className='flex flex-col gap-y-7'>
					<Button>Продолжить</Button>
					<Button variant='transparent'>Служба поддержки</Button>
				</div>
			</div>
		</div>
	);
}
