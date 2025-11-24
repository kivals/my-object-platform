import { z } from 'zod';

import { addressSchema, realEstateTypeSchema } from '@/domains/real-estate/api/schema';

export const RealEstateFormSchema = z.object({
	name: z.string().min(5).max(255),
	type: realEstateTypeSchema,
	rentalValue: z.number().nonnegative(),
	area: z.number().nonnegative(),
	description: z.string().min(30),
	address: addressSchema
});
