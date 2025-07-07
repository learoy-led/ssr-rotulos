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
//import { NgcCookieConsentService, NgcInitializationErrorEvent, NgcInitializingEvent, NgcNoCookieLawEvent, NgcStatusChangeEvent } from 'ngx-cookieconsent';

declare let gtag: Function;
//declare global {
//  interface Window {
  //  dataLayer: any[];
  //}
//}

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


  // private popupOpenSubscription!: Subscription;
  // private popupCloseSubscription!: Subscription;
  // private initializingSubscription!: Subscription;
  // private initializedSubscription!: Subscription;
  // private initializationErrorSubscription!: Subscription;
  // private statusChangeSubscription!: Subscription;
  // private revokeChoiceSubscription!: Subscription;
  // private noCookieLawSubscription!: Subscription;

  private routerSubscription: Subscription | undefined;

  constructor(private platformService: PlatformService,
  private loadingService: LoadingService, private router: Router, private seoService: SeoService ) {}



  ngOnInit() {  
  
   
if (this.platformService.isBrowser()) {
this.routerSubscription = this.router.events.subscribe(event => {
  if (event instanceof NavigationEnd) {

      if (this.router.url === '/' ||  '/catalogo' ||'/nosotros' || '/casos-de-exito' || 'contacto' ) {
         this.seoService.updateSeoStaticTags()
         }

        const url = 'https://www.rotuloslearoy.com' + this.router.url;
      
    if (typeof gtag === 'function') {
       gtag('event', 'page_view', {
         page_path: event.urlAfterRedirects
       });
     }
       }
     });
 this.addAnalyticsScript();
}
  
    if (this.platformService.isBrowser()) {
    this.listenLoading();
   }

}
    
    

  public listenLoading() {
    this.loadingService.getLoadingStatus().subscribe((isLoading) => {
      this.isLoading = isLoading
    });
  }

  private addAnalyticsScript() {
   
      if (!document.getElementById('google-analytics-script')) {
        const script = document.createElement('script');
        script.id = 'google-analytics-script';
        script.src = 'https://www.googletagmanager.com/gtag/js?id=G-1JGFTPJSEQ';
        script.async = true;
        document.head.appendChild(script);

        const secondScript = document.createElement('script');
        secondScript.id = 'google-analytics-second-script';
        secondScript.innerHTML = `
          window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-1JGFTPJSEQ');
        `
        document.head.appendChild(secondScript);
      
      }
    }
    
   

  ngOnDestroy() {
this.routerSubscription && this.routerSubscription.unsubscribe();
  }

}


