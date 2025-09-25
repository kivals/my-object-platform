import { Header } from '@/components/layout/header/Header';

export default function PublicPage() {
	return <div className="min-h-screen flex flex-col pt-4.5">
		<Header />
		<main className="bg-red-700 flex-1 flex">
			<aside className="w-1/3 bg-green-700">
				Sidebar
			</aside>
			<div className="bg-red-700">Content</div>
		</main>
		<footer>Footer</footer>
	</div>;
}
