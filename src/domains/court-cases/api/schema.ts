import { z } from 'zod';

export const courtCaseStatusSchema = z.enum(['won', 'lost', 'in_progress', 'stayed']);

export const courtCaseRoleSchema = z.enum(['applicant', 'respondent']);

export const courtDocumentTypeSchema = z.enum(['acts', 'contracts', 'invoices', 'court']);

export const casePartySchema = z.object({
	casePartyId: z.uuid(),
	role: courtCaseRoleSchema,
	fio: z.string()
});

export const courtCaseDocumentSchema = z.object({
	documentUuid: z.uuid(),
	name: z.string(),
	url: z.url(),
	type: courtDocumentTypeSchema
});

export const courtCaseSchema = z.object({
	courtCaseId: z.uuid(),
	name: z.string(),
	status: courtCaseStatusSchema
});

export const stateCourtCaseSchema = z.object({
	stateCourtCaseId: z.uuid(),
	state: z.string(),
	date: z.string()
});

const courtCaseDetailsSchema = z.object({
	name: z.string(),
	instance: z.string(),
	status: courtCaseStatusSchema,
	judgeFio: z.string(),
	email: z.email(),
	phone: z.string(),
	nextHearingDate: z.string().nullable(),
	caseParties: z.array(casePartySchema),
	statesCourtCase: z.array(stateCourtCaseSchema),
	documents: z.array(courtCaseDocumentSchema)
});

export const courtCaseDetailsResponseSchema = z.object({
	data: courtCaseDetailsSchema
});

export const courtCasesResponseSchema = z.object({
	data: z.object({
		courtCases: z.array(courtCaseSchema)
	})
});

export type TCourtCase = z.infer<typeof courtCaseSchema>;
export type TCourtCaseStatus = z.infer<typeof courtCaseStatusSchema>;
export type TCourtCaseRole = z.infer<typeof courtCaseRoleSchema>;
export type TCourtDocumentType = z.infer<typeof courtDocumentTypeSchema>;
export type TCourtCasesResponse = z.infer<typeof courtCasesResponseSchema>;
export type TCourtCaseDetailsResponse = z.infer<typeof courtCaseDetailsResponseSchema>;
export type TCourtCaseDetails = z.infer<typeof courtCaseDetailsSchema>;
export type TStateCourtCase = z.infer<typeof stateCourtCaseSchema>;
export type TCaseParty = z.infer<typeof casePartySchema>;
export type TCourtCaseDocument = z.infer<typeof courtCaseDocumentSchema>;
