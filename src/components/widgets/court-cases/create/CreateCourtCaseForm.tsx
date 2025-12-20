import { useParams } from 'next/navigation';

import { useCreateCourt } from '@/components/widgets/court-cases/create/hooks/use-create-court';
import { ContactsSection } from '@/components/widgets/court-cases/create/sections/ContactsSection';
import { InfoSection } from '@/components/widgets/court-cases/create/sections/InfoSection';
import { PartiesSection } from '@/components/widgets/court-cases/create/sections/PartiesSection/PartiesSection';
import { PartyRow } from '@/components/widgets/court-cases/create/sections/PartiesSection/PartyRow';

import { SectionCard } from '@/ui/SectionCard';

export function CreateCourtCaseForm() {
	const { uuid } = useParams<{ uuid: string }>();
	const {
		form: {
			register,
			handleSubmit,
			control,
			formState: { errors }
		},
		fieldsForm: { append, fields, remove },
		onSubmit,
		isPending
	} = useCreateCourt({ uuid });

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<SectionCard>
				<h3 className='text-h3 font-medium text-black/70 mb-3.5'>Информация о деле</h3>

				<div className='grid grid-cols-2 gap-6 mb-6'>
					<InfoSection register={register} errors={errors} control={control} />
					<ContactsSection register={register} errors={errors} />
				</div>

				<PartiesSection
					append={append}
					rows={fields.map((field, index) => (
						<PartyRow
							errors={errors}
							index={index}
							control={control}
							fields={fields}
							register={register}
							remove={remove}
							key={field.id}
						/>
					))}
				/>
				<div className='pt-4'>
					<button
						disabled={isPending}
						type='submit'
						className='bg-[#8D77FF] text-white px-6 py-3 rounded-xl font-medium hover:opacity-90 transition'
					>
						{isPending ? 'Ожидайте' : 'Создать дело'}
					</button>
				</div>
			</SectionCard>
		</form>
	);
}
