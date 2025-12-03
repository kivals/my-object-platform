import * as Dialog from '@radix-ui/react-dialog';

import { TenantAddForm } from '@/components/widgets/tenants-list/form/TenantAddForm';

import { Icon } from '@/ui/Icon';
import { SectionCard } from '@/ui/SectionCard';

interface ITenantAddProps {
	isOpen: boolean;
	onClose: () => void;
	title: string;
}

export function TenantAdd({ isOpen, onClose, title }: ITenantAddProps) {
	return (
		<Dialog.Root open={isOpen} onOpenChange={v => !v && onClose()}>
			<Dialog.Portal>
				<Dialog.Overlay className='fixed inset-0 z-50 bg-black/40 backdrop-blur-sm' />

				<Dialog.Content className='fixed inset-0 z-50 flex items-center justify-center p-4'>
					<SectionCard classNames='py-12 w-[85vw] max-h-[90vh] overflow-y-auto'>
						<div className='flex justify-between items-center mb-7'>
							<Dialog.Title asChild>
								<h2 className='font-semibold text-h2'>{title}</h2>
							</Dialog.Title>

							<Dialog.Close className='cursor-pointer' asChild>
								<button className='p-1 hover:opacity-70 transition'>
									<Icon icon='X' size={24} />
								</button>
							</Dialog.Close>
						</div>

						<TenantAddForm onClose={onClose} />
					</SectionCard>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
}
