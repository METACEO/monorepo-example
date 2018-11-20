import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot} from '@angular/router';

import {UserService} from './user.service';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate {

  constructor(private readonly router: Router,
              private readonly userService: UserService) {
  }

  static readonly GUEST = '[RouteGuardService] Guest';
  static readonly USER = '[RouteGuardService] User';

  canActivate(route: ActivatedRouteSnapshot): boolean {

    const isSession = this.userService.session !== null;

    if (isSession && route.data.allow === RouteGuardService.GUEST) {
      this.router.navigate(route.data.redirect);
      return false;
    }

    if (!isSession && route.data.allow === RouteGuardService.USER) {
      this.router.navigate(route.data.redirect);
      return false;
    }

    return true;

  }

}
