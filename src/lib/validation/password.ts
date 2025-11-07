export const PASSWORD_MIN_LENGTH = 8;

export const PASSWORD_RULES_MSG =
	"Пароль должен быть не короче 8 символов, содержать хотя бы одну заглавную букву и одну цифру.";

export const PASSWORD_REGEXES = [
	{ regex: /[A-Z]/, message: PASSWORD_RULES_MSG }, // хотя бы одна большая буква
	{ regex: /\d/, message: PASSWORD_RULES_MSG },    // хотя бы одна цифра
];