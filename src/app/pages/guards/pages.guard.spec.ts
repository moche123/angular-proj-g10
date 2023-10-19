import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { PagesGuard } from './pages.guard';
import { PagesService } from '../services/pages.service';

const mockPagesService = {
  isLoggedIn: jasmine.createSpy('isLoggedIn'),
  returnToLogin: jasmine.createSpy('returnToLogin')
}

xdescribe('PagesGuard', () => {
  let guard: PagesGuard;
  let routeSnapshot: ActivatedRouteSnapshot;
  let routerState: RouterStateSnapshot;


  xit('should be created', () => {
    expect(guard).toBeTruthy();
  })


});