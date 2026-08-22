/**
 * Route segments shared by the shell (which owns the Router) and every
 * remote (which links to / reads these instead of hardcoding strings).
 */
export const ROUTE_PATHS = {
  articles: 'articles',
  contactUs: 'contact-us',
  aboutUs: 'about-us',
  login: 'login',
  signup: 'signup',
  forgotPassword: 'forgot-password',
} as const;

export const NAV_ITEMS: readonly { label: string; path: string }[] = [
  { label: 'Articles', path: ROUTE_PATHS.articles },
  { label: 'About Us', path: ROUTE_PATHS.aboutUs },
  { label: 'Contact Us', path: ROUTE_PATHS.contactUs },
];
