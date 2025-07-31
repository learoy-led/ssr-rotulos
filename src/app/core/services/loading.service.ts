import { HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

private requests: HttpRequest<any>[] = [];
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private delayTimeout: any;

  public getLoadingStatus(): Observable<boolean> {
    return this.loadingSubject.asObservable();
  }

  public showLoading(request: HttpRequest<any>) {
    this.requests.push(request);
    if (this.requests.length === 1) {
    this.delayTimeout = setTimeout(() => {
      this.loadingSubject.next(true);
    }, 300);
  }
  }

  public hideLoading(request: HttpRequest<any>) {

    const index = this.requests.indexOf(request);
     if (index !== -1) {
    this.requests.splice(index, 1);
      }
    if (this.requests.length === 0) {
       clearTimeout(this.delayTimeout);
      this.loadingSubject.next(false)
    }
  }

}
