'use client';

import { type ReactNode, useState } from 'react';

import type { TConfirmFn, TConfirmState } from '@/components/confirm/model/types';
import { ConfirmDialog } from '@/components/confirm/ui/ConfirmDialog';

import { ConfirmContext } from './model/context';

export function ConfirmProvider({ children }: { children: ReactNode }) {
	const [state, setState] = useState<TConfirmState | null>(null);

	const confirm: TConfirmFn = opts =>
		new Promise<boolean>(resolve => {
			setState({ options: opts, resolve });
		});

	const close = (result: boolean) => {
		state?.resolve(result);
		setState(null);
	};

	return (
		<ConfirmContext.Provider value={confirm}>
			{children}
			<ConfirmDialog state={state} onClose={close} />
		</ConfirmContext.Provider>
	);
}
