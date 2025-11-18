// src/main.server.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app/app.config';
import { Home } from './app/pages/home/home';

// ¡OJO! No importes BootstrapContext (no está exportado).
export default function bootstrap(context: unknown) {
  return bootstrapApplication(
    Home,
    {
      providers: [
        ...(appConfig.providers ?? []),
        provideServerRendering(),
      ],
    },
    // pasa el context SIN tiparlo
    context as any
  );
}
