'use client';

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle
} from '@/ui/AlertDialog';

import type { TConfirmState } from '../model/types';

interface IConfirmDialogProps {
	state: TConfirmState | null;
	onClose: (v: boolean) => void;
}

export function ConfirmDialog({ state, onClose }: IConfirmDialogProps) {
	return (
		<AlertDialog open={!!state} onOpenChange={() => onClose(false)}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>{state?.options.title ?? 'Подтвердите действие'}</AlertDialogTitle>
					<AlertDialogDescription>
						{state?.options.description ?? 'Вы уверены?'}
					</AlertDialogDescription>
				</AlertDialogHeader>

				<AlertDialogFooter>
					<AlertDialogCancel onClick={() => onClose(false)}>
						{state?.options.cancelText ?? 'Отмена'}
					</AlertDialogCancel>
					<AlertDialogAction onClick={() => onClose(true)}>
						{state?.options.confirmText ?? 'Удалить'}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
