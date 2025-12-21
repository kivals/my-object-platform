import * as Dialog from '@radix-ui/react-dialog';

import { DialogModal } from '@/components/dialog/DialogModal';
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
		<DialogModal onClose={onClose} isOpen={isOpen}>
			<SectionCard className='py-12 w-[85vw] max-h-[90vh] overflow-y-auto'>
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
		</DialogModal>
	);
}
