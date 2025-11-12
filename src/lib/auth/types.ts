import type { UserRole } from '@/types/common';

/**
 * Данные пользователя, которые можно извлечь из декодированного токена.
 */
export interface UserObject {
	role: UserRole;
	fn: string;
}

/**
 * Расшифрованное содержимое JWT-токена (access или refresh).
 * Содержит информацию о пользователе и метаданные токена.
 *
 * @property sub — идентификатор пользователя (обычно UUID)
 * @property exp — время истечения токена (в UNIX timestamp)
 * @property iat — время выпуска токена (в UNIX timestamp)
 */
export interface DecodedJWT extends UserObject {
	sub: string;
	exp: number;
	iat: number;
}

/**
 * Сроки действия токенов, извлечённые из декодированных данных.
 *
 * @property valid_until — время, когда истекает access-токен
 * @property refresh_until — время, когда истекает refresh-токен
 */
export interface AuthValidity {
	valid_until: number;
	refresh_until: number;
}
