export interface IActionState<T = unknown> {
	error?: string;
	success?: boolean;
	payload?: T;
}