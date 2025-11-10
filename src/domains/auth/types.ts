import { z } from 'zod';

import { RefreshResponseSchema, type SignInResponseSchema } from '@/domains/auth/schema';

export type SignInResponse = z.infer<typeof SignInResponseSchema>;
export type RefreshResponse = z.infer<typeof RefreshResponseSchema>;
