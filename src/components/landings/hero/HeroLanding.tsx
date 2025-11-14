import Link from 'next/link';

import { HeroChecklist } from '@/components/landings/hero/HeroChecklist';
import { HeroHeading } from '@/components/landings/hero/HeroHeading';
import { RealEstateLandingCard } from '@/components/landings/hero/RealEstateLandingCard';
import { CheckListData, propertyData } from '@/components/landings/hero/data';

import { Button } from '@/ui/Button';

import { cn } from '@/utils/cn';

import { ABOUT_URL, LOGIN_URL } from '@/routes';
import type { IClassNames } from '@/types/components/classname.types';

export function HeroLanding({ classNames }: IClassNames) {
	return (
		<section className={cn('flex items-center gap-y-7 gap-x-10', classNames)}>
			<div className='basis-1/2 flex flex-col gap-y-7'>
				<HeroHeading>Контролируйте сдачу Ваших объектов онлайн</HeroHeading>
				<HeroChecklist items={CheckListData} />
				<div className='flex justify-between gap-x-7'>
					<Button asChild className='flex-1'>
						<Link href={LOGIN_URL}>Войти в систему</Link>
					</Button>
					<Button asChild variant='muted' className='flex-1'>
						<Link href={ABOUT_URL}>Больше информации</Link>
					</Button>
				</div>
			</div>
			<div className='basis-1/2'>
				<RealEstateLandingCard
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
