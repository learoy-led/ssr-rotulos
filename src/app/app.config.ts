import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { loadingInterceptor } from './core/interceptors/loading.interceptor';
import { provideCloudinaryLoader } from '@angular/common';
import { NgcCookieConsentConfig, provideNgcCookieConsent } from 'ngx-cookieconsent';
import { environment } from '../environments/environment';


const cookieConfig: NgcCookieConsentConfig = {
  cookie: {
    domain: environment.cookieDomain
    },
  palette: {
    popup: { background: '#021526' },
    button: { background: '#059fec' },
  },
  theme: 'classic',
  type: 'opt-in', 
  content: {
    message: 'Este sitio usa cookies para mejorar tu experiencia. Al hacer clic en “Aceptar todas", aceptas que las cookies se guarden en tu dispositivo para mejorar la navegación del sitio, analizar el uso del mismo y colaborar con nuestros estudios para marketing. +Info:',
    deny: 'Rechazar',
    allow: 'Aceptar',
    link: 'Política de cookies',
    href: '/politica-de-cookies',
  }
};


export const appConfig: ApplicationConfig = {

  providers: [provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes,   
        withInMemoryScrolling({
          scrollPositionRestoration: 'top',
        }),      
    ),
     provideHttpClient(withFetch(), withInterceptors([loadingInterceptor])),
    provideClientHydration(),
  provideCloudinaryLoader('https://res.cloudinary.com/dxuseyfxa/'),
    provideNgcCookieConsent(cookieConfig)
  ]
};
