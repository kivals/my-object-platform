import { REAL_ESTATE_TYPE_LABELS } from '@/domains/real-estate/constants';
import type { RealEstateType } from '@/domains/real-estate/schema';

export type RealEstateTypeLabel = (typeof REAL_ESTATE_TYPE_LABELS)[RealEstateType];

export type RealEstateDocumentsType = 'photos' | 'documents';
