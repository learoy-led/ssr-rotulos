import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./core/components/header/header.component";
import { FooterComponent } from "./core/components/footer/footer.component";
import { ScrollTopButtonComponent } from "./core/components/scroll-top-button/scroll-top-button.component";
import { SeoService } from './core/services/seo.service';
import { LoadingService } from './core/services/loading.service';
import { Subscription } from 'rxjs';
import { LoaderComponent } from './core/components/loader/loader.component';
import { CommonModule } from '@angular/common';
import { PlatformService } from './core/services/platform.service';
import { ShowScrollButtonDirective } from './core/directives/show-scroll-button.directive';
import { NgcCookieConsentService, NgcInitializationErrorEvent, NgcInitializingEvent, NgcNoCookieLawEvent, NgcStatusChangeEvent } from 'ngx-cookieconsent';

declare let gtag: Function;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, ScrollTopButtonComponent, LoaderComponent, CommonModule, ShowScrollButtonDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {

  title = 'Rótulos Learoy';

  public isLoading: boolean = true;


   private popupOpenSubscription!: Subscription;
  private popupCloseSubscription!: Subscription;
  private initializingSubscription!: Subscription;
  private initializedSubscription!: Subscription;
  private initializationErrorSubscription!: Subscription;
  private statusChangeSubscription!: Subscription;
  private revokeChoiceSubscription!: Subscription;
  private noCookieLawSubscription!: Subscription;

  private routerSubscription: Subscription | undefined;

  constructor(private platformService: PlatformService,
  private loadingService: LoadingService, private router: Router, private seoService: SeoService, private ccService: NgcCookieConsentService) {}



  ngOnInit() {  
  
    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {

        if (this.router.url === '/' ||  '/catalogo' ||'/nosotros' || '/casos-de-exito' || 'contacto' ) {
          this.seoService.updateSeoStaticTags()
          }


        const url = 'https://www.rotuloslearoy.com' + this.router.url;
        //this.setCanonicalTag(url);
         // Enviar page_view si gtag está disponible
    if (typeof gtag === 'function') {
      gtag('event', 'page_view', {
        page_path: event.urlAfterRedirects
      });
    }
      }
    });

    if (this.platformService.isBrowser()) {
    this.listenLoading();
  }

    // if (this.ccService.hasConsented()) {
    //   this.addAnalyticsScript();
    // }
    
    this.popupOpenSubscription = this.ccService.popupOpen$.subscribe(
      () => {
      });

    this.popupCloseSubscription = this.ccService.popupClose$.subscribe(
      () => {
      });

    this.initializingSubscription = this.ccService.initializing$.subscribe(
      (event: NgcInitializingEvent) => {
        // the cookieconsent is initilializing... Not yet safe to call methods like `NgcCookieConsentService.hasAnswered()`
        console.log(`initializing: ${JSON.stringify(event)}`);
      });
    
    this.initializedSubscription = this.ccService.initialized$.subscribe(
      () => {
        // the cookieconsent has been successfully initialized.
        // It's now safe to use methods on NgcCookieConsentService that require it, like `hasAnswered()` for eg...
        console.log(`initialized: ${JSON.stringify(event)}`);
      });

    this.initializationErrorSubscription = this.ccService.initializationError$.subscribe(
      (event: NgcInitializationErrorEvent) => {
        // the cookieconsent has failed to initialize... 
        console.log(`initializationError: ${JSON.stringify(event.error?.message)}`);
      });

    // this.statusChangeSubscription = this.ccService.statusChange$.subscribe(
    //   (event: NgcStatusChangeEvent) => {
    //    event.status === 'allow'? this.addAnalyticsScript() : this.deleteAnalyticsScript()
    //   });

    // this.revokeChoiceSubscription = this.ccService.revokeChoice$.subscribe(
    //   () => this.deleteAnalyticsScript());

      this.noCookieLawSubscription = this.ccService.noCookieLaw$.subscribe(
      (event: NgcNoCookieLawEvent) => {
        //no está claro lo del low
        console.log('nolow', event)
      });
  }

  // public setCanonicalTag(url: string) {
  //   let link: HTMLLinkElement | null = document.querySelector("link[rel='canonical']");
  //   if (link) {
  //     link.setAttribute('href', url);
  //   } else {
  //     link = document.createElement('link');
  //     link.setAttribute('rel', 'canonical');
  //     link.setAttribute('href', url);
  //     document.head.appendChild(link);
  //   }
  // }

  public listenLoading() {
    this.loadingService.getLoadingStatus().subscribe((isLoading) => {
      this.isLoading = isLoading
    });
  }

  // private addAnalyticsScript() {
   
  //     if (!document.getElementById('google-analytics-script')) {
  //       const script = document.createElement('script');
  //       script.id = 'google-analytics-script';
  //       script.src = 'https://www.googletagmanager.com/gtag/js?id=G-1JGFTPJSEQ';
  //       script.async = true;
  //       document.head.appendChild(script);

  //       const secondScript = document.createElement('script');
  //       secondScript.id = 'google-analytics-second-script';
  //       secondScript.textContent = `
  //         window.dataLayer = window.dataLayer || [];
  //       function gtag(){dataLayer.push(arguments);}
  //       gtag('js', new Date());
  //       gtag('config', 'G-1JGFTPJSEQ');
  //       `
  //       document.head.appendChild(secondScript);
      
  //     }
  //   }
    
    // private deleteAnalyticsScript() {
    //   if (document.getElementById('google-analytics-script') && document.getElementById('google-analytics-second-script')) {
    //     document.getElementById('google-analytics-script')?.remove();
    //     document.getElementById('google-analytics-second-script')?.remove();  
    //   }
    //   if (window.dataLayer) {
    //     window.dataLayer.length = 0;
    //   }      
    // }


  ngOnDestroy() {
    this.popupOpenSubscription.unsubscribe();
    this.popupCloseSubscription.unsubscribe();
    this.initializingSubscription.unsubscribe();
    this.initializedSubscription.unsubscribe();
    this.initializationErrorSubscription.unsubscribe();
    this.statusChangeSubscription.unsubscribe();
    this.revokeChoiceSubscription.unsubscribe();
    this.noCookieLawSubscription.unsubscribe();
this.routerSubscription && this.routerSubscription.unsubscribe();
  
  }

}
