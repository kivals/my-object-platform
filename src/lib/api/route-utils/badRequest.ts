import { NextResponse } from 'next/server';

export function badRequest(message = 'Bad request') {
	return NextResponse.json({ error: message }, { status: 400 });
}