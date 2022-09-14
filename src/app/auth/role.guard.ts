import { Injectable } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(
    private coreToken: AuthService,
    private router: ActivatedRoute,
    private state: RouterStateSnapshot
  ) {}
  canActivate() {
    // alert(this.coreToken.UserRole);
    // if (this.state.url.includes('employee')) {
    //   if (this.coreToken.UserRole == '2' || this.coreToken.UserRole == '3') {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // }

    // if (this.state.url.includes('department')) {
    //   if ('3' == '3') {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // }

    return true;
  }
}
