import { z } from 'zod';

import { documentTypeSchema } from '@/domains/documents/api/schema';

export const DocumentEditFormSchema = z.object({
	documentType: documentTypeSchema,
	status: z.enum(['active', 'completed'])
});
