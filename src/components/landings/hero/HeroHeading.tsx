import type { PropsWithChildren } from 'react';

export function HeroHeading({ children }: PropsWithChildren) {
	return <h1 className='font-semibold text-h1'>{children}</h1>;
}
