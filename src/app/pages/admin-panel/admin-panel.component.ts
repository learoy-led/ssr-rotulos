import { Component } from '@angular/core';
import { AdminMenuComponent } from '../../shared/admin-menu/admin-menu.component';
import { Router, RouterOutlet } from '@angular/router';


@Component({
    selector: 'app-admin-panel',
      standalone: true,
    imports: [AdminMenuComponent, RouterOutlet],
    templateUrl: './admin-panel.component.html',
    styleUrl: './admin-panel.component.css'
})
export class AdminPanelComponent  {

}
