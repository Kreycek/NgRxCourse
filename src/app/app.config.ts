import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideRouter, RouterModule, withComponentInputBinding } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthModule } from './auth/auth.module';
import { StoreModule, createAction, createReducer, on, provideStore } from '@ngrx/store';
import { StoreDevtoolsModule, provideStoreDevtools } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule, RouterState } from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';
import { EntityDataModule } from '@ngrx/data';
import { environment } from '../app/environments/environment';
import { authReducer } from './reducers';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimations(),
    MatMenuModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    provideStore(),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    importProvidersFrom(    
      StoreModule.forRoot({}),         
      StoreModule.forFeature(
          'clarion',
          authReducer
      ),
      AuthModule.forRoot(),               
      StoreDevtoolsModule.instrument({ 
        maxAge: 25, 
        logOnly: environment.production,
        actionsBlocklist: ['@ngrx/store/init', '@ngrx/effects/init']                  
      }), 
      StoreRouterConnectingModule.forRoot({ stateKey: 'router', routerState: RouterState.Minimal }), 
      EffectsModule.forRoot([]), 
      EntityDataModule.forRoot({})
    ),
  
  ]
};
