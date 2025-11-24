import { z } from 'zod';

import { realEstateTypeSchema } from '@/domains/real-estate/api/schema';

export const UpdateSchema = z.object({
	name: z.string().min(3).max(255),
	type: realEstateTypeSchema,
	rentalValue: z.number().nonnegative().nullable(),
	area: z.number().nonnegative(),
	description: z.string().optional()
});
