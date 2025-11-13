import type { RealEstateType } from '@/domains/real-estate/schema';

export const REAL_ESTATE_TYPE_LABELS: Record<RealEstateType, string> = {
	house: 'Дом',
	flat: 'Квартира',
	apartment: 'Апартаменты'
};
