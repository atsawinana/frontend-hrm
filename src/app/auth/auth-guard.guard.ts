import { Injectable } from '@angular/core';
import {
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
export class AuthGuardGuard implements CanActivate {
  constructor(private router: Router, private coreToken: AuthService) {}
  canActivate() {
    if (!localStorage.getItem('tokenLocal')) {
      this.router.navigate(['']);
      return false;
    }
    return true;
  }
}
