import { NextRequest, NextResponse } from 'next/server';

import { REAL_ESTATE_ENDPOINTS } from '@/domains/real-estate/endpoints/external';
import type { RealEstateDocumentsType } from '@/domains/real-estate/types';
import { getAuthTokens } from '@/lib/auth/utils/getAuthJwt.server';

//todo проверить работу когда протухнет access token

export async function POST(req: NextRequest, { params }: { params: Promise<{ uuid: string }> }) {
	try {
		const { uuid } = await params;
		const tokens = await getAuthTokens();

		const type = req.nextUrl.searchParams.get('type') as RealEstateDocumentsType;

		if (!tokens) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		if (!type) return NextResponse.json({ error: 'Bad request' }, { status: 400 });

		const endpoint = REAL_ESTATE_ENDPOINTS.POST_FILE(uuid, type);

		const formData = await req.formData();

		const res = await fetch(endpoint, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${tokens.accessToken}`
			},
			body: formData
		});

		if (!res.ok) {
			const errText = await res.text();
			return NextResponse.json({ error: errText }, { status: res.status });
		}

		const { data } = await res.json();
		return NextResponse.json(data);
	} catch (err) {
		console.error('[FILE UPLOAD ERROR]', err);
		return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
	}
}
