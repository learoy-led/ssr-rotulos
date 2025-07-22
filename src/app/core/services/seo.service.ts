import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(private titleService: Title, private meta: Meta, private router: Router) { }

  public updateSeoStaticTags() { 

      const route = this.getDeepestChild(this.router.routerState.root);
      const title = route.routeConfig?.title ?? 'Rótulos Learoy'; 
        this.titleService.setTitle(title as string)
      const data = route.snapshot.data;
    this.meta.updateTag({ name: 'description', content: data['description']});
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({ property: 'og:title', content: title as string })
    this.meta.updateTag({ property: 'og:description', content: data['description'] })
    this.meta.updateTag({ property: 'og:url', content: 'https://rotuloslearoy.com'+this.router.url });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:image', content: data['image'] });
    }

  public updateSeoDynamicTags(title:string, description:string, image:string, route:string) {
     this.titleService.setTitle(title)
    this.meta.updateTag({ name: 'description', content: description});
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({ property: 'og:title', content: title })
    this.meta.updateTag({ property: 'og:description', content: description })
    this.meta.updateTag({ property: 'og:url', content: 'https://rotuloslearoy.com/'+route });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:image', content: image });
  }

 public noRobots() {
  this.meta.updateTag({ name: 'robots', content:'noindex, nofollow' });
}

  private getDeepestChild(route: ActivatedRoute): ActivatedRoute {
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route || null;
  }

}
