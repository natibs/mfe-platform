import { Routes } from '@angular/router';
import { LOGIN_PATHS } from './login-paths';

export const LOGIN_ROUTES: Routes = [
  {
    path: LOGIN_PATHS.login,
    loadComponent: () => import('./pages/login-page/login-page').then((m) => m.LoginPage),
  },
  {
    path: LOGIN_PATHS.signup,
    loadComponent: () => import('./pages/signup-page/signup-page').then((m) => m.SignupPage),
  },
  {
    path: LOGIN_PATHS.forgotPassword,
    loadComponent: () =>
      import('./pages/forgot-password-page/forgot-password-page').then(
        (m) => m.ForgotPasswordPage,
      ),
  },
];
