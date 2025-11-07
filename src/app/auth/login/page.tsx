import type { Metadata } from 'next';

import { LoginFlow } from '@/components/landings/auth/LoginFlow';

export const metadata: Metadata = {
	title: 'Аутентификация'
};

export default function LoginPage() {
	return (
		<main className='min-h-screen flex pt-20'>
			<LoginFlow />
		</main>
	);
}
