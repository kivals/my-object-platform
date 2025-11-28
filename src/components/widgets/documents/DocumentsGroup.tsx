import Link from 'next/link';

import { DocumentItem } from '@/components/widgets/documents/DocumentItem';

import { Button } from '@/ui/Button';
import { Icon } from '@/ui/Icon';
import { SectionCard } from '@/ui/SectionCard';

import type { RealEstateDocument } from '@/domains/documents/api/schema';

interface IDocumentsGroupProps {
	title: string;
	newLabel: string;
	docs: RealEstateDocument[];
}

export function DocumentsGroup({ title, newLabel, docs }: IDocumentsGroupProps) {
	const sortedDocs = docs.toSorted((a, b) => Number(a.isCompleted) - Number(b.isCompleted));

	return (
		<div className='flex flex-col gap-y-3'>
			<div className='flex justify-between items-center'>
				<h2 className='font-bold text-h2'>{title}</h2>
				<Button className='px-10' variant='muted'>
					<Link href='#' className='font-bold text-primary flex items-center gap-x-3'>
						<Icon icon={'Plus'} size={25} />
						<span className='text-h3'>{newLabel}</span>
					</Link>
				</Button>
			</div>
			<SectionCard classNames='px-5 py-6'>
				<div className='flex flex-wrap gap-3.5'>
					{docs.length > 0 ? (
						sortedDocs.map(({ name, isCompleted, documentUuid, url }) => (
							<DocumentItem key={documentUuid} name={name} url={url} isCompleted={isCompleted} />
						))
					) : (
						<h1>Данных нет</h1>
					)}
				</div>
			</SectionCard>
		</div>
	);
}
