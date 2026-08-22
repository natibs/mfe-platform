import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { RemoteEntryComponent } from './app/app';

bootstrapApplication(RemoteEntryComponent, appConfig).catch((err) => console.error(err));
