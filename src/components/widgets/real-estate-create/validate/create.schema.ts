import { z } from 'zod';

import { realEstateTypeSchema } from '@/domains/real-estate/api/schema';

export const addressSchema = z.object({
	city: z.string().min(1, 'Город не может быть пустым').max(30, 'Город — не более 30 символов'),

	street: z.string().min(1, 'Улица не может быть пустой').max(100, 'Улица — не более 100 символов'),

	building: z
		.string()
		.min(1, 'Номер дома не может быть пустым')
		.max(20, 'Номер дома — не более 20 символов')
});

export const createRealEstateFormSchema = z.object({
	name: z
		.string()
		.min(5, 'Название — минимум 5 символов')
		.max(100, 'Название — максимум 100 символов'),

	type: realEstateTypeSchema.refine(Boolean, { message: 'Выберите тип объекта' }),

	manager: z.uuid(),

	rentalValue: z
		.number('Арендная стоимость должна быть целым числом')
		.int('Арендная стоимость должна быть целым числом')
		.nonnegative('Арендная стоимость не может быть отрицательной')
		.nullable(),

	area: z
		.number('Площадь должна быть целым числом')
		.int('Площадь должна быть целым числом')
		.nonnegative('Площадь не может быть отрицательной')
		.nullable(),

	description: z
		.string()
		.min(30, 'Описание — минимум 30 символов')
		.max(3000, 'Описание — максимум 3000 символов'),

	address: addressSchema
});

export type TCreateRealEstateForm = z.infer<typeof createRealEstateFormSchema>;
