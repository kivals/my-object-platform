'use client';

import {
	CircleCheckIcon,
	InfoIcon,
	Loader2Icon,
	OctagonXIcon,
	TriangleAlertIcon
} from 'lucide-react';
import { useTheme } from 'next-themes';
import type { CSSProperties } from 'react';
import { Toaster as Sonner, type ToasterProps } from 'sonner';

const Toaster = ({ ...props }: ToasterProps) => {
	const { theme = 'system' } = useTheme();

	return (
		<Sonner
			theme={theme as ToasterProps['theme']}
			className='toaster group'
			icons={{
				success: <CircleCheckIcon className='size-5 mr-4 text-green-500' />,
				info: <InfoIcon className='size-5' />,
				warning: <TriangleAlertIcon className='size-5 mr-4 text-yellow-400' />,
				error: <OctagonXIcon className='size-5 mr-4 text-red-400' />,
				loading: <Loader2Icon className='size-5 mr-4 animate-spin' />
			}}
			style={
				{
					'--normal-bg': 'white',
					'--normal-text': 'black',
					'--toast-shadow': '0 4px 20px rgba(0,0,0,0.12)',
					'--border-radius': '15px'
				} as CSSProperties
			}
			{...props}
		/>
	);
};

export { Toaster };
