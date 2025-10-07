import * as z from 'zod';

const LOGIN_MIN_CHARACTERS = 5;
const PASSWORD_MIN_CHARACTERS = 6;

const loginSchema = z.email();
const passwordSchema = z.string().min(PASSWORD_MIN_CHARACTERS);
const registerSchema = z
	.object({
		login: loginSchema,
		password: passwordSchema,
		confirm: z.string()
	})
	.superRefine((val, ctx) => {
		if (val.password !== val.confirm) {
			ctx.addIssue({ code: 'custom', path: ['confirm'], message: 'The passwords did not match' });
		}
	});

export {
	loginSchema,
	passwordSchema,
	registerSchema,
	PASSWORD_MIN_CHARACTERS,
	LOGIN_MIN_CHARACTERS
};
