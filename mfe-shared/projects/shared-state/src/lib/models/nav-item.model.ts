export interface NavItem {
  label: string;
  path: string;
  /** When true, only shown to authenticated users. When false, only shown to guests. Omit to always show. */
  requiresAuth?: boolean;
}
