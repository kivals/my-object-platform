import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { toast } from 'sonner';

import { ApiError } from '@/lib/api/api-error';
import { LOGIN_URL } from '@/routes';

interface TUseApiActionOptions {
	successMessage?: string;
	errorMessage?: string;
}

export function useApiAction(options?: TUseApiActionOptions) {
	const { errorMessage = 'Произошла ошибка', successMessage } = options ?? {};

	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);
	const router = useRouter();

	const run = useCallback(
		async (action: () => Promise<boolean | void>) => {
			try {
				setIsError(false);
				setIsLoading(true);

				const result = await action();
				console.log("result", result);
				if (result === false) return;

				if (successMessage) {
					toast.success(successMessage);
				}
			} catch (err) {
				console.error('[API ACTION ERROR]', err);
				setIsError(true);
				if (err instanceof ApiError) {
					switch (err.status) {
						case 401:
							toast.error('Ошибка авторизации');
							router.push(LOGIN_URL);
							return;
						case 403:
							toast.error('Недостаточно прав');
							return;
						default:
							toast.error(errorMessage);
							return;
					}
				}
				toast.error(errorMessage);
				throw err;
			} finally {
				setIsLoading(false);
				setIsError(false);
			}
		},
		[router, errorMessage, successMessage]
	);

	return {
		run,
		isLoading,
		isError
	};
}
