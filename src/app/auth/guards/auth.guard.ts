import { Injectable, Injector } from '@angular/core';
import { AuthService } from '../services/auth.service';
// import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard  {
  constructor(private injector: Injector) {}

  canActivate(): boolean {
    const oauthService: AuthService = this.injector.get(AuthService);

    if (!oauthService.isLoggedIn()) { //! SI EL USUARIO NO ESTÁ LOGUEADO, ENTRA AL LOGIN
      return true;
    }
    
    oauthService.goToPages();
    return false;
  }
}