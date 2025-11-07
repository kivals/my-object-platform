import { z } from 'zod';

import {
	PASSWORD_MIN_LENGTH,
	PASSWORD_REGEXES,
	PASSWORD_RULES_MSG
} from '@/lib/validation/password';

export const LoginSchema = z.object({
	email: z.email('Некорректный email'),
	password: z
		.string()
		.min(PASSWORD_MIN_LENGTH, PASSWORD_RULES_MSG)
		.superRefine((val, ctx) => {
			for (const { regex, message } of PASSWORD_REGEXES) {
				if (!regex.test(val)) {
					ctx.addIssue({
						code: 'custom',
						message
					});
					return;
				}
			}
		})
});
