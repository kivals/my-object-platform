import { NextRequest, NextResponse } from 'next/server';

import { attachDocument } from '@/domains/court-cases/api/api.server';
import type { DocumentsType } from '@/domains/documents/api/schema';
import { attachPhoto } from '@/domains/real-estate/api/api.server';
import type { RealEstateDocumentsType } from '@/domains/real-estate/types';
import { getAuthTokens } from '@/lib/auth/utils/getAuthJwt.server';
import type { Uuid } from '@/types/common';

//todo проверить работу когда протухнет access token
export async function POST(req: NextRequest, { params }: { params: Promise<{ uuid: string }> }) {
	try {
		const { uuid } = await params;
		const tokens = await getAuthTokens();
		const formData = await req.formData();

		const fileType = req.nextUrl.searchParams.get('type') as RealEstateDocumentsType | undefined;
		const documentType = req.nextUrl.searchParams.get('documentType') as DocumentsType | undefined;
		const courtCaseId = req.nextUrl.searchParams.get('courtCaseId') as Uuid | undefined;

		if (!tokens) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		if (!fileType) return NextResponse.json({ error: 'Bad request' }, { status: 400 });

		let response = null;

		if (fileType === 'photos') {
			response = await attachPhoto(uuid, formData);
		}

		if (fileType === 'documents' && documentType === 'court') {
			if (!courtCaseId) return NextResponse.json({ error: 'Bad request' }, { status: 400 });

			response = await attachDocument(uuid, courtCaseId, formData);
		}

		return NextResponse.json(response);
	} catch (err) {
		console.error('[FILE UPLOAD ERROR]', err);
		return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
	}
}
