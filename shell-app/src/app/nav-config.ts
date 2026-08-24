import { NavItem } from 'shared-state';

export const ROUTE_PATHS = {
  articles: 'articles',
  contactUs: 'contact-us',
  aboutUs: 'about-us',
  login: 'login',
} as const;

export const NAV_ITEMS: readonly NavItem[] = [
  { label: 'Articles', path: ROUTE_PATHS.articles },
  { label: 'About Us', path: ROUTE_PATHS.aboutUs },
  { label: 'Contact Us', path: ROUTE_PATHS.contactUs },
];
