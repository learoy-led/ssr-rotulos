import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/components/header/header.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { ScrollTopButtonComponent } from './core/components/scroll-top-button/scroll-top-button.component';
import { SeoService } from './core/services/seo.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { PlatformService } from './core/services/platform.service';
import { ShowScrollButtonDirective } from './core/directives/show-scroll-button.directive';
import {
  NgcCookieConsentService,
  NgcInitializationErrorEvent,
  NgcInitializingEvent,
  NgcNoCookieLawEvent,
  NgcStatusChangeEvent,
} from 'ngx-cookieconsent';

//import { LoadingService } from './core/services/loading.service';
//import { LoaderComponent } from './core/components/loader/loader.component';

declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
}

//declare let gtag: (...args: any[]) => void;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    ScrollTopButtonComponent,
    CommonModule,
    ShowScrollButtonDirective,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Rótulos Learoy';

  //public isLoading: boolean = true;

  private popupOpenSubscription!: Subscription;
  private popupCloseSubscription!: Subscription;
  private initializingSubscription!: Subscription;
  private initializedSubscription!: Subscription;
  private initializationErrorSubscription!: Subscription;
  private statusChangeSubscription!: Subscription;
  private revokeChoiceSubscription!: Subscription;
  private noCookieLawSubscription!: Subscription;

  private routerSubscription: Subscription | undefined;

  constructor(
    private ccService: NgcCookieConsentService,
    private platformService: PlatformService,
    //private loadingService: LoadingService,
    private router: Router,
    private seoService: SeoService
  ) {}

  ngOnInit() {

     if (this.platformService.isBrowser()) {

          //this.listenLoading();
   this.loadGoogleTag()

 if (this.getCookie('cookieconsent_status') === 'allow') {
  this.updateGoogleTag(true);
}
     
      
      this.popupOpenSubscription = this.ccService.popupOpen$.subscribe(
        () => {}
      );

      this.popupCloseSubscription = this.ccService.popupClose$.subscribe(
        () => {}
      );

      this.initializingSubscription = this.ccService.initializing$.subscribe(
        (event: NgcInitializingEvent) => {
          // the cookieconsent is initilializing... Not yet safe to call methods like `NgcCookieConsentService.hasAnswered()`
          console.log(`initializing: ${JSON.stringify(event)}`);
        }
      );

      this.initializedSubscription = this.ccService.initialized$.subscribe(
        () => {
          console.log(`initialized: ${JSON.stringify(event)}`);
        }
      );

      this.initializationErrorSubscription =
        this.ccService.initializationError$.subscribe(
          (event: NgcInitializationErrorEvent) => {
            console.log(
              `initializationError: ${JSON.stringify(event.error?.message)}`
            );
          }
        );

      this.statusChangeSubscription = this.ccService.statusChange$.subscribe(
        (event: NgcStatusChangeEvent) => {
this.updateGoogleTag(event.status === 'allow')
        }
      );

      this.revokeChoiceSubscription = this.ccService.revokeChoice$.subscribe(
        () => this.updateGoogleTag(false)
      );

      this.noCookieLawSubscription = this.ccService.noCookieLaw$.subscribe(
        (event: NgcNoCookieLawEvent) => {
          //no está claro lo del low
          console.log('nolow', event);
        }
      );

    this.routerSubscription = this.router.events.subscribe((event) => {
      const staticRoutes = [
        '/',
        '/catalogo',
        '/nosotros',
        '/casos-de-exito',
        '/contacto',
      ];

      if (event instanceof NavigationEnd) {
        if (staticRoutes.includes(event.urlAfterRedirects)) {
          this.seoService.updateSeoStaticTags();
        }

  const url = 'https://www.rotuloslearoy.com' + event.urlAfterRedirects;
  this.setCanonicalTag(url);        

          window.gtag?.('event', 'page_view', {
            page_path: event.urlAfterRedirects,
          });
      }
    });

   
    }
  }

    // public listenLoading() {
  //   this.loadingService.getLoadingStatus().subscribe((isLoading) => {
  //     this.isLoading = isLoading;
  //   });
  // }

  public getCookie(name: string): string | null {
    return (
      document.cookie
        .split('; ')
        .find((row) => row.startsWith(name + '='))
        ?.split('=')[1] || null
    );
  }

  private loadGoogleTag() {
      if (!document.getElementById('google-tag')) {
    const script = document.createElement('script');
    script.id = 'google-tag';
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-1JGFTPJSEQ';
    document.head.appendChild(script);
  }

window.dataLayer = window.dataLayer || [];

window.gtag = function () {
  window.dataLayer.push(arguments);
};

window.gtag('consent', 'default', {
  analytics_storage: 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied'
});

window.gtag('js', new Date());

window.gtag('config', 'G-1JGFTPJSEQ', {
  send_page_view: false
});
  }

private updateGoogleTag(granted: boolean) {
window.gtag?.('consent', 'update', {
  analytics_storage: granted ? 'granted' : 'denied',
  ad_storage: granted ? 'granted' : 'denied',
  ad_user_data: granted ? 'granted' : 'denied',
  ad_personalization: granted ? 'granted' : 'denied'
});
}

  private setCanonicalTag(url: string) {
  const link: HTMLLinkElement = document.querySelector("link[rel='canonical']") || document.createElement('link');
  link.setAttribute('rel', 'canonical');
  link.setAttribute('href', url);
  if (!link.parentElement) {
    document.head.appendChild(link);
  }
}


  ngOnDestroy() {
    this.popupOpenSubscription?.unsubscribe();
    this.popupCloseSubscription?.unsubscribe();
    this.initializingSubscription?.unsubscribe();
    this.initializedSubscription?.unsubscribe();
    this.initializationErrorSubscription?.unsubscribe();
    this.statusChangeSubscription?.unsubscribe();
    this.revokeChoiceSubscription?.unsubscribe();
    this.noCookieLawSubscription?.unsubscribe();
    this.routerSubscription?.unsubscribe();
  }
}
