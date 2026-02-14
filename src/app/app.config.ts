import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { CoreModule } from './core/core.module';
import { loadingInterceptor } from './core/interceptors/loading.interceptor';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), importProvidersFrom(CoreModule), provideHttpClient(
    withInterceptors([loadingInterceptor]))
]
};
