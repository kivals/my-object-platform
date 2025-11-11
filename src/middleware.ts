import { NextRequest, NextResponse } from 'next/server';

import { auth } from '@/auth';
import { DASHBOARD_URL, LOGIN_URL, authRoutes, privateRoutes, publicRoutes } from '@/routes';

export default async function middleware(req: NextRequest) {
	const { nextUrl } = req;
	const pathname = nextUrl.pathname;

	const isPublicRoute = publicRoutes.includes(pathname);
	const isAuthRoute = authRoutes.includes(pathname);
	const isPrivateRoute = privateRoutes.includes(pathname);
	const isApiRoute = pathname.startsWith('/api');

	if (isPublicRoute || isApiRoute) {
		return NextResponse.next();
	}

	const session = await auth();

	const isLoggedIn = !!session;

	if (
		isLoggedIn &&
		(session.error === 'RefreshAccessTokenError' || session.error === 'RefreshTokenExpired')
	) {
		if (isAuthRoute) return;
		return NextResponse.redirect(`${nextUrl.origin}${LOGIN_URL}`);
	}

	if (isLoggedIn && isAuthRoute) {
		return NextResponse.redirect(`${nextUrl.origin}${DASHBOARD_URL}`);
	}

	if (!isLoggedIn && isPrivateRoute) {
		return NextResponse.redirect(`${nextUrl.origin}${LOGIN_URL}`);
	}
}

export const config = {
	matcher: ['/((?!.*\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)']
};
