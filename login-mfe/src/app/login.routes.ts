import { Routes } from '@angular/router';
import { ROUTE_PATHS } from 'shared-state';

export const LOGIN_ROUTES: Routes = [
  {
    path: ROUTE_PATHS.login,
    loadComponent: () => import('./pages/login-page/login-page').then((m) => m.LoginPage),
  },
  {
    path: ROUTE_PATHS.signup,
    loadComponent: () => import('./pages/signup-page/signup-page').then((m) => m.SignupPage),
  },
  {
    path: ROUTE_PATHS.forgotPassword,
    loadComponent: () =>
      import('./pages/forgot-password-page/forgot-password-page').then(
        (m) => m.ForgotPasswordPage,
      ),
  },
];
