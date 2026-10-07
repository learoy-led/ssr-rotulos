import { AfterViewInit, Component, OnInit } from '@angular/core';
import { PlatformService } from '../../services/platform.service';
import { SocialMediaService } from '../../../services/social-media.service';

@Component({
  selector: 'app-social-media',
  imports: [],
  templateUrl: './social-media.component.html',
  styleUrl: './social-media.component.css'
})
export class SocialMediaComponent implements OnInit, AfterViewInit {
  constructor(private platformService: PlatformService, 
    public socialMediaService: SocialMediaService
  ) {
  }

public ngOnInit() {
  this.socialMediaService.getTikTokVideos();
}

public ngAfterViewInit() {
  if(this.platformService.isBrowser()){  
  const tiktokScript = document.createElement('script');
   tiktokScript.src = "https://www.tiktok.com/embed.js";
  tiktokScript.async = true;
  document.body.appendChild(tiktokScript);
     }
 }

}
