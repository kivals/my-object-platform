import { NextResponse } from 'next/server';

export function ok<T = unknown>(data?: T) {
	if (data === undefined) {
		return NextResponse.json({ ok: true });
	}

	return NextResponse.json(data);
}