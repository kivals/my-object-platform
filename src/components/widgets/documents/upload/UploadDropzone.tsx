'use client';

import React from 'react';
import { useState } from 'react';

import { ALLOW_DOCUMENT_TYPES } from '@/domains/documents/constants';

interface IUploadDropzoneProps {
	onSelect: (f: File) => void;
}

export function UploadDropzone({ onSelect }: IUploadDropzoneProps) {
	const [isDrag, setIsDrag] = useState(false);

	const onDragOver = (e: React.DragEvent) => {
		e.preventDefault();
		setIsDrag(true);
	};

	const onDragLeave = () => setIsDrag(false);

	const onDrop = (e: React.DragEvent) => {
		e.preventDefault();
		setIsDrag(false);
		const file = e.dataTransfer.files[0];

		if (file) {
			onSelect(file);
		}
	};

	return (
		<div
			onDragOver={onDragOver}
			onDragLeave={onDragLeave}
			onDrop={onDrop}
			className={`
				relative mt-4 rounded-[30px] w-full h-[500px]
				border-2 border-dashed
				flex flex-col items-center justify-center
				transition
				${isDrag ? 'border-primary bg-primary/5' : 'border-primary/40 bg-[#F4F2FF]'}
			`}
		>
			<div className='text-center'>
				<p className='text-[20px]'>
					Перетащите сюда или{' '}
					<span className='text-primary font-semibold cursor-pointer'>выберите</span> файл
				</p>
				<p className='text-black/40 text-[14px] mt-1'>
					в формате PDF, DOC, DOCX, ODT (в том числе DOCX в ZIP-архиве)
				</p>
			</div>

			<input
				type='file'
				accept={ALLOW_DOCUMENT_TYPES}
				className='absolute inset-0 opacity-0 cursor-pointer'
				onChange={e => {
					const file = e.target.files?.[0];
					if (file) {
						console.log('UPLOAD FILE:', file);
						onSelect(file);
					}
				}}
			/>
		</div>
	);
}
