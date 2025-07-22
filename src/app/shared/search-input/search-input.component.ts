import {  Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {  NavigationEnd, Router } from '@angular/router';
import {  Subscription } from 'rxjs';


@Component({
  selector: 'app-search-input',
  imports: [],
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.css'
})
export class SearchInputComponent implements OnInit, OnDestroy {
 
  query: string = '';
public routeSubscription: Subscription | null = null;
@ViewChild('search', { static: false }) searchInput!: ElementRef<HTMLInputElement>;

  constructor(private router: Router){}
 
public ngOnInit(){
 this.routeSubscription = 
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd && !event.url.includes('rotulos-encontrados')) {
        this.searchInput.nativeElement.value = ''
        this.query = '';
      }
    });
}

public submitSearch(value: string): void  {
  if (value.trim()) {
    this.router.navigate(['/rotulos-encontrados'], { queryParams: { q: value.trim() } });
  }
}

public listenInput(event: Event) {  
    this.query = ((event as Event).target as HTMLInputElement)?.value.trim()
    this.query === '' ? this.router.navigate(['/rotulos-encontrados/']) : this.router.navigate(['/rotulos-encontrados'], { queryParams: { q: this.query.trim() }
  });  
    }

    public ngOnDestroy() {
    this.routeSubscription?.unsubscribe();
  }
  }



