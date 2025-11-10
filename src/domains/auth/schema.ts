import { z } from 'zod';

export const SignInResponseSchema = z.object({
	accessToken: z.string(),
	refreshToken: z.string()
});

export const RefreshResponseSchema = z.object({
	accessToken: z.string(),
	refreshToken: z.string()
});
