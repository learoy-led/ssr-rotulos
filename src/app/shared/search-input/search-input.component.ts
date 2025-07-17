import {  Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlatformService } from '../../core/services/platform.service';


@Component({
  selector: 'app-search-input',
  imports: [],
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.css'
})
export class SearchInputComponent {
 
  query: string = '';

  constructor(private router: Router, private route: ActivatedRoute, private platformService: PlatformService){}


public submitSearch(value: string): void  {
  if (value.trim()) {
    this.router.navigate(['/rotulos-encontrados'], { queryParams: { q: value.trim() } });
  }
}

public listenInput(event: Event) {  
    this.query = ((event as Event).target as HTMLInputElement)?.value.trim()
    console.log('el input es', ((event as Event).target as HTMLInputElement)?.value.trim());
    this.query === '' ? this.router.navigate(['/rotulos-encontrados/']) : this.router.navigate(['/rotulos-encontrados'], { queryParams: { q: this.query.trim() }
  });  
    }

  }



