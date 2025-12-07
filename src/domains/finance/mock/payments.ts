import type { TPaymentsResponse, TPaymentsSummaryResponse } from '@/domains/finance/api/schema';

export const getMockPayments = async (): Promise<TPaymentsResponse> => {
	return new Promise<TPaymentsResponse>((resolve, _) => {
		setTimeout(() => {
			resolve(paymentsResponseMock);
		}, 200);
	});
};

export const getMockSummaryPayments = async (): Promise<TPaymentsSummaryResponse> => {
	return new Promise<TPaymentsSummaryResponse>((resolve, _) => {
		setTimeout(() => {
			resolve(paymentsSummaryMock);
		}, 200);
	});
};

const paymentsSummaryMock = {
	data: {
		countOverduePayments: 2,
		nextPaymentDate: '2025-01-15',
		nextPaymentAmount: 245000
	}
} as const;

const paymentsResponseMock: TPaymentsResponse = {
	data: {
		payments: [
			{
				paymentId: '00000000-0000-0000-0000-000000000001',
				amount: 1750,
				state: 'paid',
				paymentDate: '2025-12-04T10:00:00.000Z'
			},
			{
				paymentId: '00000000-0000-0000-0000-000000000002',
				amount: 2500,
				state: 'waiting',
				paymentDate: '2025-12-02T10:00:00.000Z'
			},
			{
				paymentId: '00000000-0000-0000-0000-000000000003',
				amount: 3250,
				state: 'overdue',
				paymentDate: '2025-11-30T10:00:00.000Z'
			},
			{
				paymentId: '00000000-0000-0000-0000-000000000004',
				amount: 4000,
				state: 'paid',
				paymentDate: '2025-11-28T10:00:00.000Z'
			},
			{
				paymentId: '00000000-0000-0000-0000-000000000005',
				amount: 4750,
				state: 'waiting',
				paymentDate: '2025-11-26T10:00:00.000Z'
			},
			{
				paymentId: '00000000-0000-0000-0000-000000000006',
				amount: 5500,
				state: 'overdue',
				paymentDate: '2025-11-24T10:00:00.000Z'
			},
			{
				paymentId: '00000000-0000-0000-0000-000000000007',
				amount: 6250,
				state: 'paid',
				paymentDate: '2025-11-22T10:00:00.000Z'
			},
			{
				paymentId: '00000000-0000-0000-0000-000000000008',
				amount: 7000,
				state: 'waiting',
				paymentDate: '2025-11-20T10:00:00.000Z'
			},
			{
				paymentId: '00000000-0000-0000-0000-000000000009',
				amount: 7750,
				state: 'overdue',
				paymentDate: '2025-11-18T10:00:00.000Z'
			},
			{
				paymentId: '00000000-0000-0000-0000-000000000010',
				amount: 8500,
				state: 'paid',
				paymentDate: '2025-11-16T10:00:00.000Z'
			},

			{
				paymentId: '00000000-0000-0000-0000-000000000011',
				amount: 9250,
				state: 'waiting',
				paymentDate: '2025-11-14T10:00:00.000Z'
			},
			{
				paymentId: '00000000-0000-0000-0000-000000000012',
				amount: 10000,
				state: 'overdue',
				paymentDate: '2025-11-12T10:00:00.000Z'
			},
			{
				paymentId: '00000000-0000-0000-0000-000000000013',
				amount: 10750,
				state: 'paid',
				paymentDate: '2025-11-10T10:00:00.000Z'
			},
			{
				paymentId: '00000000-0000-0000-0000-000000000014',
				amount: 11500,
				state: 'waiting',
				paymentDate: '2025-11-08T10:00:00.000Z'
			},
			{
				paymentId: '00000000-0000-0000-0000-000000000015',
				amount: 12250,
				state: 'overdue',
				paymentDate: '2025-11-06T10:00:00.000Z'
			},
			{
				paymentId: '00000000-0000-0000-0000-000000000016',
				amount: 13000,
				state: 'paid',
				paymentDate: '2025-11-04T10:00:00.000Z'
			},
			{
				paymentId: '00000000-0000-0000-0000-000000000017',
				amount: 13750,
				state: 'waiting',
				paymentDate: '2025-11-02T10:00:00.000Z'
			},
			{
				paymentId: '00000000-0000-0000-0000-000000000018',
				amount: 14500,
				state: 'overdue',
				paymentDate: '2025-10-30T10:00:00.000Z'
			},
			{
				paymentId: '00000000-0000-0000-0000-000000000019',
				amount: 15250,
				state: 'paid',
				paymentDate: '2025-10-28T10:00:00.000Z'
			},
			{
				paymentId: '00000000-0000-0000-0000-000000000020',
				amount: 16000,
				state: 'waiting',
				paymentDate: '2025-10-26T10:00:00.000Z'
			},

			{
				paymentId: '00000000-0000-0000-0000-000000000021',
				amount: 16750,
				state: 'overdue',
				paymentDate: '2025-10-24T10:00:00.000Z'
			},
			{
				paymentId: '00000000-0000-0000-0000-000000000022',
				amount: 17500,
				state: 'paid',
				paymentDate: '2025-10-22T10:00:00.000Z'
			},
			{
				paymentId: '00000000-0000-0000-0000-000000000023',
				amount: 18250,
				state: 'waiting',
				paymentDate: '2025-10-20T10:00:00.000Z'
			},
			{
				paymentId: '00000000-0000-0000-0000-000000000024',
				amount: 19000,
				state: 'overdue',
				paymentDate: '2025-10-18T10:00:00.000Z'
			},
			{
				paymentId: '00000000-0000-0000-0000-000000000025',
				amount: 19750,
				state: 'paid',
				paymentDate: '2025-10-16T10:00:00.000Z'
			},
			{
				paymentId: '00000000-0000-0000-0000-000000000026',
				amount: 20500,
				state: 'waiting',
				paymentDate: '2025-10-14T10:00:00.000Z'
			},
			{
				paymentId: '00000000-0000-0000-0000-000000000027',
				amount: 21250,
				state: 'overdue',
				paymentDate: '2025-10-12T10:00:00.000Z'
			},
			{
				paymentId: '00000000-0000-0000-0000-000000000028',
				amount: 22000,
				state: 'paid',
				paymentDate: '2025-10-10T10:00:00.000Z'
			},
			{
				paymentId: '00000000-0000-0000-0000-000000000029',
				amount: 22750,
				state: 'waiting',
				paymentDate: '2025-10-08T10:00:00.000Z'
			},
			{
				paymentId: '00000000-0000-0000-0000-000000000030',
				amount: 23500,
				state: 'overdue',
				paymentDate: '2025-10-06T10:00:00.000Z'
			},

			{
				paymentId: '00000000-0000-0000-0000-000000000031',
				amount: 24250,
				state: 'paid',
				paymentDate: '2025-09-30T10:00:00.000Z'
			},
			{
				paymentId: '00000000-0000-0000-0000-000000000032',
				amount: 25000,
				state: 'waiting',
				paymentDate: '2025-09-28T10:00:00.000Z'
			},
			{
				paymentId: '00000000-0000-0000-0000-000000000033',
				amount: 25750,
				state: 'overdue',
				paymentDate: '2025-09-24T10:00:00.000Z'
			},
			{
				paymentId: '00000000-0000-0000-0000-000000000034',
				amount: 26500,
				state: 'paid',
				paymentDate: '2025-09-20T10:00:00.000Z'
			},
			{
				paymentId: '00000000-0000-0000-0000-000000000035',
				amount: 27250,
				state: 'waiting',
				paymentDate: '2025-09-10T10:00:00.000Z'
			},

			{
				paymentId: '00000000-0000-0000-0000-000000000036',
				amount: 28000,
				state: 'overdue',
				paymentDate: '2025-08-20T10:00:00.000Z'
			},
			{
				paymentId: '00000000-0000-0000-0000-000000000037',
				amount: 28750,
				state: 'paid',
				paymentDate: '2025-08-05T10:00:00.000Z'
			},
			{
				paymentId: '00000000-0000-0000-0000-000000000038',
				amount: 29500,
				state: 'waiting',
				paymentDate: '2025-07-25T10:00:00.000Z'
			},
			{
				paymentId: '00000000-0000-0000-0000-000000000039',
				amount: 30250,
				state: 'overdue',
				paymentDate: '2025-07-10T10:00:00.000Z'
			},
			{
				paymentId: '00000000-0000-0000-0000-000000000040',
				amount: 31000,
				state: 'paid',
				paymentDate: '2025-06-20T10:00:00.000Z'
			},

			{
				paymentId: '00000000-0000-0000-0000-000000000041',
				amount: 31750,
				state: 'waiting',
				paymentDate: '2025-06-01T10:00:00.000Z'
			},
			{
				paymentId: '00000000-0000-0000-0000-000000000042',
				amount: 32500,
				state: 'overdue',
				paymentDate: '2025-05-15T10:00:00.000Z'
			},
			{
				paymentId: '00000000-0000-0000-0000-000000000043',
				amount: 33250,
				state: 'paid',
				paymentDate: '2025-04-30T10:00:00.000Z'
			},
			{
				paymentId: '00000000-0000-0000-0000-000000000044',
				amount: 34000,
				state: 'waiting',
				paymentDate: '2025-04-10T10:00:00.000Z'
			},
			{
				paymentId: '00000000-0000-0000-0000-000000000045',
				amount: 34750,
				state: 'overdue',
				paymentDate: '2025-03-20T10:00:00.000Z'
			},
			{
				paymentId: '00000000-0000-0000-0000-000000000046',
				amount: 35500,
				state: 'paid',
				paymentDate: '2025-02-15T10:00:00.000Z'
			},
			{
				paymentId: '00000000-0000-0000-0000-000000000047',
				amount: 36250,
				state: 'waiting',
				paymentDate: '2025-01-30T10:00:00.000Z'
			},
			{
				paymentId: '00000000-0000-0000-0000-000000000048',
				amount: 37000,
				state: 'overdue',
				paymentDate: '2025-01-10T10:00:00.000Z'
			},
			{
				paymentId: '00000000-0000-0000-0000-000000000049',
				amount: 37750,
				state: 'paid',
				paymentDate: '2024-12-20T10:00:00.000Z'
			},
			{
				paymentId: '00000000-0000-0000-0000-000000000050',
				amount: 38500,
				state: 'waiting',
				paymentDate: '2024-12-10T10:00:00.000Z'
			}
		]
	}
} as const;
