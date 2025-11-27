import { z } from 'zod';

export const documentTypeSchema = z.enum(['contracts', 'invoices', 'acts']);

export const realEstateDocumentSchema = z.object({
	documentUuid: z.uuid(),
	name: z.string(),
	url: z.string(),
	type: documentTypeSchema,
	isCompleted: z.boolean()
});

export const documentsByRealEstateDataSchema = z.object({
	acts: z.array(realEstateDocumentSchema),
	contracts: z.array(realEstateDocumentSchema),
	invoices: z.array(realEstateDocumentSchema)
});

export const documentsByRealEstateResponseSchema = z.object({
	data: documentsByRealEstateDataSchema
});

export type DocumentsType = z.infer<typeof documentTypeSchema>;
export type DocumentsByRealEstateResponse = z.infer<typeof documentsByRealEstateResponseSchema>;
export type DocumentsByRealEstateData = z.infer<typeof documentsByRealEstateDataSchema>;
