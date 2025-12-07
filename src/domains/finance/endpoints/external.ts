import type { Uuid } from '@/types/common';

export const PAYMENTS = {
	GET_BY_REAL_ESTATE_UUID: (uuid: Uuid) => `${process.env.SERVER_REAL_ESTATE_URL}/payments/${uuid}`
};
