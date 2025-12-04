import { auth } from '@/auth';
import { DASHBOARD_URL, LOGIN_URL, authRoutes, privateRoutes } from '@/routes';

export default auth(req => {
	const { nextUrl } = req;
	const session = req.auth;

	const isLoggedIn = !!session;
	const isPrivateRoute = privateRoutes.includes(nextUrl.pathname);
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
