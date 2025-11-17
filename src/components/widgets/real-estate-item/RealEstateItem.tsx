import { RealEstateItemDescription } from '@/components/widgets/real-estate-item/RealEstateItemDescription';
import { RealEstateItemHeader } from '@/components/widgets/real-estate-item/RealEstateItemHeader';
import { RealEstateItemInfo } from '@/components/widgets/real-estate-item/RealEstateItemInfo';

export function RealEstateItem() {
	return (
		<section>
			<RealEstateItemHeader />

			<RealEstateItemInfo type={'house'} rent={'225000'} area={345} />

			<RealEstateItemDescription
				text={
					'Новый уникальный загородный дом в КП Общая площадь 371 м2, а также 120 м2 террасы.\n' +
					'Бескомпромиссное качество материалов, конструктивных элементов и инженерных сетей.\n' +
					'Высокотехнологичный фасад. Панорамные окна с электроприводами, высокие потолки (4\n' +
					'метра), функциональная планировка. Из помещения третьего этажа, куда вас доставит\n' +
					'лифт...'
				}
			/>
		</section>
	);
}
