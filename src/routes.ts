export const LOGIN_URL = '/auth/login';

export const DASHBOARD_URL = '/dashboard';

export const REAL_ESTATE_URL = '/real-estate';

export const ROOT_URL = '/';

export const ABOUT_URL = '/about';

export const DEFAULT_LOGIN_REDIRECT = DASHBOARD_URL;

export const authRoutes = [LOGIN_URL];

export const privateRoutes = [DASHBOARD_URL, REAL_ESTATE_URL];

export const publicRoutes = [ROOT_URL, ABOUT_URL];
