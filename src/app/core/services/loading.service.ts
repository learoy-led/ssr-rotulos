import { HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

private requests: HttpRequest<any>[] = [];
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public getLoadingStatus(): Observable<boolean> {
    return this.loadingSubject.asObservable();
  }

  public showLoading(request: HttpRequest<any>) {
    this.requests.push(request);
    this.loadingSubject.next(true)

  }

  public hideLoading(request: HttpRequest<any>) {
    const index = this.requests.indexOf(request);
    this.requests.splice(index, 1);
    if (this.requests.length === 0) {
      this.loadingSubject.next(false)
    }
  }

}
