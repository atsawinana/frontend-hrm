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
import Swal from 'sweetalert2';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root',
})
export class RoleGuard implements CanActivate {
    constructor(
        private coreToken: AuthService,
        private router: Router,
    ) { }
    roleNormal: Boolean = false
    roleMana: Boolean = false
    roleHR: Boolean = false

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        const role = localStorage.getItem("roleUser")

        if (role == '1') {
            this.roleNormal = true;
        } else if (role == '2') {
            this.roleMana = true;
        } else if (role == '3') {
            this.roleHR = true;
        }

        if (state.url.includes('employee') && (this.roleMana || this.roleHR)) {
            return true;
        } else if (state.url.includes('department') && this.roleHR) {
            return true;
        } else if (state.url.includes('unapproved') && (this.roleMana || this.roleHR)) {
            return true
        }
        this.router.navigate(['/main']);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
        })
        return false;
    }
}
