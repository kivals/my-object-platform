'use server';

interface RealEstateEditState {
	error?: string;
	success?: boolean;
}

export const realEstateEditAction = async (
	_prevState: RealEstateEditState,
	formData: FormData
): Promise<RealEstateEditState> => {
	return { success: true };
};
