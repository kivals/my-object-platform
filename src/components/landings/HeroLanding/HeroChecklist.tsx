import { Check } from 'lucide-react';

export function HeroChecklist({ items }: { items: string[] }) {
	return (
		<ul className='space-y-3'>
			{items.map(i => (
				<HeroChickItem text={i} key={i} />
			))}
		</ul>
	);
}

function HeroChickItem({ text }: { text: string }) {
	return (
		<li key={text} className='flex font-semibold text-h2 items-center gap-3'>
			<Check size={32} />
			<span>{text}</span>
		</li>
	);
}
