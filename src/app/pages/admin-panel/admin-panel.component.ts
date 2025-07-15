import { Component } from '@angular/core';
import { SeoService } from '../../core/services/seo.service';

@Component({
    selector: 'app-admin-panel',
      standalone: true,
    imports: [],
    templateUrl: './admin-panel.component.html',
    styleUrl: './admin-panel.component.css'
})
export class AdminPanelComponent {
 constructor(private seoService: SeoService) {}

 ngOnInit() {
  this.seoService.noRobots();
}
}
