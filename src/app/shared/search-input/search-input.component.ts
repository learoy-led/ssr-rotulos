import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';


@Component({
  selector: 'app-search-input',
  imports: [],
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.css'
})
export class SearchInputComponent implements OnInit, OnDestroy {
 
  @Output() productSearch = new EventEmitter<string>()
  private inputSubject = new Subject<string>();
  private destroy$ = new Subject<void>();

  public ngOnInit() {
       this.inputSubject.pipe(debounceTime(300),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe(value => {
        this.productSearch.emit(value);
      });
  }

  public updateInputValue(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.inputSubject.next(value);
    //prodcut?.name.toLowerCase().includes(text.toLowerCase())
  }
  
  public resetSearchInput() {
      this.inputSubject.next('');
   }

public ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();''
    }
}
