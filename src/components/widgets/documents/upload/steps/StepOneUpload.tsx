import * as Dialog from '@radix-ui/react-dialog';

import { UploadDropzone } from '@/components/widgets/documents/upload/UploadDropzone';

import { Icon } from '@/ui/Icon';

interface IStepOneUploadProps {
	title: string;
	onSelectFile: (f: File) => void;
}

export function StepOneUpload({ title, onSelectFile }: IStepOneUploadProps) {
	return (
		<div className='relative w-[80vw] rounded-[30px] bg-white p-8 shadow-2xl'>
			<div className='flex justify-between items-start mb-4'>
				<Dialog.Title asChild>
					<h2 className='text-h2 font-bold'>{title}</h2>
				</Dialog.Title>

				<Dialog.Close asChild>
					<button className='p-1 hover:opacity-70 transition'>
						<Icon icon='X' size={20} />
					</button>
				</Dialog.Close>
			</div>

			<UploadDropzone onSelect={onSelectFile} />
		</div>
	);
}
