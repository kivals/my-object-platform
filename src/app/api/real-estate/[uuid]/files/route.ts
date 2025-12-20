import { NextRequest } from 'next/server';

import { attachDocument } from '@/domains/court-cases/api/api.server';
import type { DocumentsType } from '@/domains/documents/api/schema';
import { attachPhoto } from '@/domains/real-estate/api/api.server';
import type { RealEstateDocumentsType } from '@/domains/real-estate/types';
import { badRequest, handleRouteError, ok } from '@/lib/api/route-utils';
import type { Uuid } from '@/types/common';

export async function POST(req: NextRequest, { params }: { params: Promise<{ uuid: string }> }) {
	try {
		const { uuid } = await params;
		const formData = await req.formData();

		const fileType = req.nextUrl.searchParams.get('type') as RealEstateDocumentsType | undefined;
		const documentType = req.nextUrl.searchParams.get('documentType') as DocumentsType | undefined;
		const courtCaseId = req.nextUrl.searchParams.get('courtCaseId') as Uuid | undefined;

		if (!fileType) return badRequest();

		let response = null;

		if (fileType === 'photos') {
			response = await attachPhoto(uuid, formData);
		}

		if (fileType === 'documents' && documentType === 'court') {
			if (!courtCaseId) return badRequest();
			response = await attachDocument(uuid, courtCaseId, formData);
		}

		return ok(response);
	} catch (err) {
		return handleRouteError(err, 'upload file');
	}
}
