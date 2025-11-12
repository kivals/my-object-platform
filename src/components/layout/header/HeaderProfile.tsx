interface IHeaderProfile {
	name: string;
}

export function HeaderProfile({ name }: IHeaderProfile) {
	return (
		<div className='flex items-center justify-center bg-[#b2b2b2]/20 rounded-xl p-4 cursor-pointer'>
			<span className='text-h3 text-[#666666] font-bold'>{name}</span>
		</div>
	);
}
