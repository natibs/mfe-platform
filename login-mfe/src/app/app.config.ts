import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { LOGIN_ROUTES } from './login.routes';

/** Only used when this remote is run standalone (its own dev server); the shell provides the real Router when embedded. */
export const appConfig: ApplicationConfig = {
  providers: [provideBrowserGlobalErrorListeners(), provideRouter(LOGIN_ROUTES)],
};
