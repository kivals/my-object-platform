import { HeroLanding } from '@/components/landings/hero/HeroLanding';
import { Header } from '@/components/layout/header/Header';

export default function PublicPage() {
	return (
		<div className='min-h-screen flex flex-col pt-4.5'>
			<Header />
			<main className='flex-1'>
				<HeroLanding classNames='mt-30' />
			</main>
		</div>
	);
}
