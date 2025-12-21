import { match } from 'path-to-regexp';

import { auth } from '@/auth';
import { DASHBOARD_URL, LOGIN_URL, REAL_ESTATE_URL, authRoutes } from '@/routes';

const privateRouteMatchers = [
	match(`${DASHBOARD_URL}{/*rest}`),
	match(`${REAL_ESTATE_URL}/:uuid{/*rest}`)
];

export function isPrivate(pathname: string): boolean {
	return privateRouteMatchers.some(m => m(pathname));
}

export default auth(req => {
	const { nextUrl } = req;
	const session = req.auth;

	const isLoggedIn = !!session;
	const isPrivateRoute = isPrivate(nextUrl.pathname);
	const isAuthRoute = authRoutes.includes(nextUrl.pathname);
	const isApiRoute = nextUrl.pathname.includes('/api/auth');

	if (isApiRoute) {
		return;
	}

	// Залогинен, но есть проблемы с refresh токеном
	if (
		isLoggedIn &&
		(session.error === 'RefreshAccessTokenError' || session.error === 'RefreshTokenExpired')
	) {
		if (isAuthRoute) {
			return;
		} else {
			return Response.redirect(`${nextUrl.origin}${LOGIN_URL}`);
		}
	}

	if (isLoggedIn && isAuthRoute) {
		return Response.redirect(`${nextUrl.origin}${DASHBOARD_URL}`);
	}

	if (!isLoggedIn && isPrivateRoute) {
		return Response.redirect(`${nextUrl.origin}${LOGIN_URL}`);
	}
});

export const config = {
	matcher: ['/((?!$|about$|.*\\.[\\w]+$|_next).*)', '/(api|trpc)(.*)']
};
