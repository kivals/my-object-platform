import { z } from 'zod';

export const courtCaseStatusSchema = z.enum(['won', 'lost', 'in_progress', 'stayed']);

export const courtCaseSchema = z.object({
	courtCaseId: z.uuid(),
	name: z.string(),
	status: courtCaseStatusSchema
});

export const courtCasesResponseSchema = z.object({
	data: z.object({
		courtCases: z.array(courtCaseSchema)
	})
});

export type TCourtCase = z.infer<typeof courtCaseSchema>;
export type TCourtCaseStatus = z.infer<typeof courtCaseStatusSchema>;
export type TCourtCasesResponse = z.infer<typeof courtCasesResponseSchema>;
