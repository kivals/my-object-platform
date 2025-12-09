import { z } from 'zod';

export const documentTypeSchema = z.enum(['contracts', 'invoices', 'acts', 'court']);

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

export const documentUpdateByRealEstateResponse = z.object({
	data: realEstateDocumentSchema
});

export const documentEditByRealEstateBodyRequestSchema = z.object({
	type: documentTypeSchema,
	isCompleted: z.boolean()
});

export type DocumentsType = z.infer<typeof documentTypeSchema>;
export type DocumentsByRealEstateResponse = z.infer<typeof documentsByRealEstateResponseSchema>;
export type DocumentsByRealEstateData = z.infer<typeof documentsByRealEstateDataSchema>;
export type RealEstateDocument = z.infer<typeof realEstateDocumentSchema>;
export type DocumentEditByRealEstateBodyRequest = z.infer<
	typeof documentEditByRealEstateBodyRequestSchema
>;
