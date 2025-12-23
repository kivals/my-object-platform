export type TConfirmOptions = {
	title?: string;
	description?: string;
	confirmText?: string;
	cancelText?: string;
};

export type TConfirmState = {
	options: TConfirmOptions;
	resolve: (v: boolean) => void;
};

export type TConfirmFn = (options: TConfirmOptions) => Promise<boolean>;
