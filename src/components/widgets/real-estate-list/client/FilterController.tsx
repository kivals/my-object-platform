'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import { OptionGroup } from '@/ui/OptionGroup';

import { REAL_ESTATE_TYPE_LABELS } from '@/domains/real-estate/constants';
import type { RealEstateType } from '@/domains/real-estate/schema';

interface IFilterControllerProps {
	currentType: RealEstateType;
}

export function FilterController({ currentType }: IFilterControllerProps) {
	const router = useRouter();
	const searchParams = useSearchParams();

	const onChange = (value: string) => {
		const params = new URLSearchParams(searchParams);
		params.set('type', value);
		router.replace(`?${params.toString()}`, { scroll: false });
	};

	return <OptionGroup onChange={onChange} options={REAL_ESTATE_TYPE_LABELS} value={currentType} />;
}
