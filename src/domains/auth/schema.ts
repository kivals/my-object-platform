import { z } from 'zod';

export const SignInResponseSchema = z.object({
	accessToken: z.string(),
	refreshToken: z.string()
});

export const RefreshResponseSchema = z.object({
	accessToken: z.string(),
	refreshToken: z.string()
});

export type SignInResponseType = z.infer<typeof SignInResponseSchema>;
export type RefreshResponseType = z.infer<typeof RefreshResponseSchema>;
