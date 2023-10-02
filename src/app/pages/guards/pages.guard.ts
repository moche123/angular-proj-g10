import { Injectable, Injector } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable()
export class PagesGuard  {
  constructor(private injector: Injector) {}

  canActivate(): boolean {
    const oauthService: AuthService = this.injector.get(AuthService);

    if (oauthService.isLoggedIn()) { //! SI EL USUARIO ESTÁ LOGUEADO, ENTRA A PAGES
      return true;
    }
    
    oauthService.returnToLogin();
    return false;
  }
}