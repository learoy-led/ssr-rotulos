import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AdminLoginService } from '../services/admin-login.service';

export const authGuard: CanActivateFn = (route, state) => {
  
  const adminLoginService = inject(AdminLoginService);
  const router = inject(Router);

  if (adminLoginService.isAuthenticated()) {
    return true;
  } else {
    router.navigate(['/admin-login']); 
    return false;
  }

};
