import * as Dialog from '@radix-ui/react-dialog';
import type { ReactNode } from 'react';

interface IDialogModalProps {
	onClose: () => void;
	isOpen: boolean;
	children?: ReactNode;
}

export function DialogModal({ isOpen, onClose, children }: IDialogModalProps) {
	return (
		<Dialog.Root open={isOpen} onOpenChange={v => !v && onClose()}>
			<Dialog.Portal>
				<Dialog.Overlay className='fixed inset-0 z-50 bg-black/40 backdrop-blur-sm' />

				<Dialog.Content className={'fixed inset-0 z-50 flex items-center justify-center'}>
					{children}
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
}
