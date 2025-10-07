import { HeroChecklist } from '@/components/landings/hero/HeroChecklist';
import { HeroHeading } from '@/components/landings/hero/HeroHeading';
import { PropertyCard } from '@/components/landings/hero/PropertyCard';
import { CheckListData, propertyData } from '@/components/landings/hero/data';

import { Button } from '@/ui/Button';

import { cn } from '@/utils/cn';

import type { IClassNames } from '@/types/components/classname.types';

export function HeroLanding({ classNames }: IClassNames) {
	return (
		<section className={cn('flex items-center gap-y-7 gap-x-10', classNames)}>
			<div className='basis-1/2 flex flex-col gap-y-7'>
				<HeroHeading>Контролируйте сдачу Ваших объектов онлайн</HeroHeading>
				<HeroChecklist items={CheckListData} />
				<div className='flex justify-between gap-x-7'>
					<Button className='flex-1'>Зарегистрироваться</Button>
					<Button variant='muted' className='flex-1'>
						Больше информации
					</Button>
				</div>
			</div>
			<div className='basis-1/2'>
				<PropertyCard
					status={propertyData.status}
					imageUrl={propertyData.imageUrl}
					address={propertyData.address}
					area={propertyData.area}
					nextPayment={propertyData.nextPayment}
					income={propertyData.income}
				/>
			</div>
		</section>
	);
}
