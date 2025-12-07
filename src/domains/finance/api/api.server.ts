import { unstable_rethrow } from 'next/navigation';

import {
	type TPaymentsResponse,
	type TPaymentsSummaryResponse
} from '@/domains/finance/api/schema';
import { getMockPayments, getMockSummaryPayments } from '@/domains/finance/mock/payments';
import type { Uuid } from '@/types/common';

export async function getPaymentsByRealEstate(_: Uuid): Promise<TPaymentsResponse | null> {
	try {
		// return await apiFetchValidated(PAYMENTS.GET_BY_REAL_ESTATE_UUID(uuid), paymentsResponseSchema, {
		// 	method: 'GET'
		// });
		//todo временно, пока на реальном сервере нет данных
		return await getMockPayments();
	} catch (e) {
		unstable_rethrow(e);
		console.error('[get payments real-estate]', e);
		return null;
	}
}

export async function getPaymentsSummaryByRealEstate(
	_: Uuid
): Promise<TPaymentsSummaryResponse | null> {
	try {
		// return await apiFetchValidated(PAYMENTS.GET_BY_REAL_ESTATE_UUID(uuid), paymentsResponseSchema, {
		// 	method: 'GET'
		// });
		//todo временно, пока на реальном сервере нет данных
		return await getMockSummaryPayments();
	} catch (e) {
		unstable_rethrow(e);
		console.error('[get payments summary by real-estate]', e);
		return null;
	}
}
