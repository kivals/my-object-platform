import { RealEstateGallery } from '@/components/widgets/real-estate-gallery/RealEstateGallery';
import { RealEstateItemDescription } from '@/components/widgets/real-estate-item/RealEstateItemDescription';
import { RealEstateItemHeader } from '@/components/widgets/real-estate-item/RealEstateItemHeader';
import { RealEstateItemInfo } from '@/components/widgets/real-estate-item/RealEstateItemInfo';

export function RealEstateItem() {
	return (
		<section>
			<RealEstateItemHeader />

			<RealEstateGallery
				classNames='mb-8'
				media={[
					'http://10.30.30.82:9001/my-object/real_estate_properties/f9abfea1-d4e9-44e7-8e14-8fe45e467006/photos/f442780c87160cfb1d250ba5f5bc3253.jpg?AWSAccessKeyId=root&Signature=5vsb7tkZyQv1TZd4VPBR423C2yk%3D&Expires=1763461167',
					'http://10.30.30.82:9001/my-object/real_estate_properties/f9abfea1-d4e9-44e7-8e14-8fe45e467006/photos/Iskra-park%20%281%29.jpg?AWSAccessKeyId=root&Signature=H10jtDcoGcyK%2F1uFkAqKloqU%2BRg%3D&Expires=1763461167',
					'http://10.30.30.82:9001/my-object/real_estate_properties/b8b1d7bf-2c58-4ee0-8f7e-92c1f7f4973a/photos/5042243.webp?AWSAccessKeyId=root&Signature=o%2Ft5EbD8OZ8WiUlpR24l5L%2Fxq%2BU%3D&Expires=1763461167'
				]}
			/>

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
