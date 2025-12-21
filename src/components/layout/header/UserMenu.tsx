import * as Menubar from '@radix-ui/react-menubar';

import { Icon } from '@/ui/Icon';

import { cn } from '@/utils/cn';

import type { IClassNames } from '@/types/components/classname.types';

interface IUserMenuProps extends IClassNames {
	name: string;
	onLogout: () => void;
}

export function UserMenu({ name, onLogout, className }: IUserMenuProps) {
	return (
		<Menubar.Root className={cn(className)}>
			<Menubar.Menu>
				<Menubar.Trigger className='group h-full flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition cursor-pointer'>
					<span className='group-hover:text-primary text-h3 text-[#666666] font-bold'>{name}</span>
				</Menubar.Trigger>

				<Menubar.Content
					className='min-w-[140px] mt-2 bg-white shadow-lg rounded-xl p-1 border border-gray-100'
					align='end'
				>
					<Menubar.Item
						className='outline-none border-none group transition flex justify-between px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer text-body text-[#666666]'
						onClick={onLogout}
					>
						Выйти
						<Icon className='group-hover:text-primary ' icon='LogOut' size={20} />
					</Menubar.Item>
				</Menubar.Content>
			</Menubar.Menu>
		</Menubar.Root>
	);
}
