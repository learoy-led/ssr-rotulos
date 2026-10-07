import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocialMediaService {

    public API_URL = environment.API_URL || '';
    public videos = signal<string[]>([]);

  constructor(private http: HttpClient) {}

  public getTikTokVideos(){
         this.http.get<string[]>(`${this.API_URL}tiktok/videos`)
    .subscribe(videos => this.videos.set(videos));
    }
}




  

  

    

    