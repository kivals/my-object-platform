import { z } from 'zod';

export const realEstateTypeSchema = z.enum(['house', 'flat', 'apartment']);

export const addressSchema = z.object({
	city: z.string().min(1),
	street: z.string().min(1),
	building: z.string().min(1),
	addressUuid: z.string().optional()
});

export const photoSchema = z.object({
	photoUuid: z.string(),
	name: z.string(),
	url: z.url().or(z.string().min(1)),
	realEstateId: z.string()
});

export const documentSchema = z.object({
	documentUuid: z.string(),
	name: z.string(),
	url: z.url().or(z.string().min(1)),
	realEstateId: z.string()
});

export const realEstateSchema = z.object({
	realEstateUuid: z.string(),
	name: z.string(),
	type: realEstateTypeSchema,
	manager: z.string(),
	rentalValue: z.number().nonnegative(),
	area: z.number().nonnegative(),
	description: z.string().optional().default(''),
	address: addressSchema,
	photos: z.array(photoSchema).default([]),
	documents: z.array(documentSchema).default([])
});

export const realEstateUpdateSchema = z.object({
	name: z.string(),
	type: realEstateTypeSchema,
	manager: z.string(),
	rentalValue: z.number().nonnegative().nullable(),
	area: z.number().nonnegative(),
	description: z.string().min(30),
	address: addressSchema
});

export const realEstateListSchema = z.object({
	data: z.object({
		realEstateProperties: z.array(realEstateSchema)
	})
});

export const realEstateItemSchema = z.object({
	data: realEstateSchema
});

// Responses
export const realEstateCreateResponseSchema = z.object({
	data: z.object({
		realEstateUuid: z.string()
	})
});

export const realEstateUploadPhotoResponseSchema = z.object({
	data: z.object({
		photos: z.array(photoSchema)
	})
});

type TRealEstateUploadPhotoApiResponse = z.infer<typeof realEstateUploadPhotoResponseSchema>;

// типы
export type RealEstateType = z.infer<typeof realEstateTypeSchema>;
export type RealEstatePhoto = z.infer<typeof photoSchema>;
export type RealEstate = z.infer<typeof realEstateSchema>;
export type RealEstateUpdate = z.infer<typeof realEstateUpdateSchema>;
export type TRealEstateCreateResponse = z.infer<typeof realEstateCreateResponseSchema>;
export type TRealEstateUploadPhotoDataResponse = TRealEstateUploadPhotoApiResponse['data'];
