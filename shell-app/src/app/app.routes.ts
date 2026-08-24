import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/native-federation';
import { ROUTE_PATHS } from './nav-config';

export const routes: Routes = [
  { path: '', redirectTo: ROUTE_PATHS.articles, pathMatch: 'full' },
  {
    path: ROUTE_PATHS.articles,
    loadComponent: () =>
      loadRemoteModule('articles-mfe', './Component').then((m) => m.RemoteEntryComponent),
  },
  {
    path: ROUTE_PATHS.aboutUs,
    loadComponent: () =>
      loadRemoteModule('about-us-mfe', './Component').then((m) => m.RemoteEntryComponent),
  },
  {
    path: ROUTE_PATHS.contactUs,
    loadComponent: () =>
      loadRemoteModule('contact-us-mfe', './Component').then((m) => m.RemoteEntryComponent),
  },
  {
    path: '',
    loadChildren: () => loadRemoteModule('login-mfe', './Routes').then((m) => m.LOGIN_ROUTES),
  },
  { path: '**', redirectTo: ROUTE_PATHS.articles },
];
