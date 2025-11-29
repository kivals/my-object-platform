'use client';

import * as Dialog from '@radix-ui/react-dialog';
import clsx from 'clsx';
import { type ReactNode, useState } from 'react';

import { StepOneUpload } from '@/components/widgets/documents/upload/steps/StepOneUpload';
import { StepTwoForm } from '@/components/widgets/documents/upload/steps/StepTwoForm';

import type { DocumentsType } from '@/domains/documents/api/schema';

interface IUploadDocumentDialogProps {
	title: string;
	children?: ReactNode;
	type: DocumentsType;
}

export function UploadDocumentWizard({ title, children, type }: IUploadDocumentDialogProps) {
	const [step, setStep] = useState<1 | 2>(1);
	const [file, setFile] = useState<File | null>(null);

	function handleFileSelected(f: File) {
		setFile(f);
		setStep(2);
	}

	return (
		<Dialog.Root>
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
