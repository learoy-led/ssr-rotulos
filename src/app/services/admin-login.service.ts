import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AdminFormData, AdminStored } from '../models/data.models';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminLoginService {

  public API_URL = environment.API_URL || '';
  public adminLoginMessage: BehaviorSubject<string> = new BehaviorSubject("");

  constructor(private http: HttpClient, private router: Router) {}

  public getSubmittedMessage(): Observable<string> {
    return this.adminLoginMessage.asObservable()
  }

  public adminLogin(adminData: AdminFormData) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
   
    this.http.post<AdminStored>(`${this.API_URL}users/login`, adminData, httpOptions).subscribe(
      (response) => {
        console.log(response)
      
        const adminStored = {
           email: response.userDB.email,
           token: response.token,
        };
        localStorage.setItem("adminStored", JSON.stringify(adminStored));
        this.router.navigate(['/admin-panel'])
            },
      (error) => {
           this.adminLoginMessage.next('El acceso al panel de administración ha fallado. Por favor, inténtalo más tarde.')
      }
    );
  }

  public isAuthenticated(): boolean {
    return !!localStorage.getItem('adminStored');
  }


  public completeSubmittedMessage() {
    this.adminLoginMessage.next('');
    this.adminLoginMessage.complete();
  }

}
