import 'zone.js';
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { Home } from './app/pages/home/home';

bootstrapApplication(Home, {
  providers: [...(appConfig.providers ?? [])],
}).catch(console.error);
