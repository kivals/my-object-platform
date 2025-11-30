'use client';

import * as Dialog from '@radix-ui/react-dialog';
import clsx from 'clsx';
import { useParams, useRouter } from 'next/navigation';
import { type ReactNode, useState } from 'react';
import { toast } from 'sonner';

import { StepOneUpload } from '@/components/widgets/documents/upload/steps/StepOneUpload';
import { StepTwoForm } from '@/components/widgets/documents/upload/steps/StepTwoForm';

import type { DocumentsType } from '@/domains/documents/api/schema';
import { uploadDocument } from '@/domains/real-estate/api/api.client';

interface IUploadDocumentDialogProps {
	title: string;
	children?: ReactNode;
	type: DocumentsType;
}

export function UploadDocumentWizard({ title, children, type }: IUploadDocumentDialogProps) {
	const [step, setStep] = useState<1 | 2>(1);
	const [file] = useState<File | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [open, setOpen] = useState(false);
	const { uuid } = useParams<{ uuid: string }>();
	const router = useRouter();

	async function handleFileSelected(file: File) {
		//TODO бекенд пока не имеет эндпоинтов к второму шагу, поэтому не делаем переход на след. форму
		//setFile(file);
		//setStep(2);

		if (!file || !uuid) return;
		try {
			setIsLoading(true);
			await uploadDocument(uuid, file, type);
			toast.success('Документ успешно загружен');
		} catch (err) {
			console.error('[handleUpload] Failed:', err);
			toast.error('Ошибка загрузки файла');
		} finally {
			setIsLoading(false);
			setOpen(false);
			router.refresh();
		}
	}

	return (
		<Dialog.Root open={open} onOpenChange={setOpen}>
			<Dialog.Trigger asChild>{children}</Dialog.Trigger>

			<Dialog.Portal>
				<Dialog.Overlay className='fixed inset-0 z-50 bg-black/40 backdrop-blur-sm' />

				<Dialog.Content className={clsx('fixed inset-0 z-50 flex items-center justify-center')}>
					{step === 1 && <StepOneUpload title={title} onSelectFile={handleFileSelected} />}
					{step === 2 && file && <StepTwoForm type={type} file={file} />}
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
}
