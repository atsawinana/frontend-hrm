import { HostListener, Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NavigationEnd, Route, Router, RouterLink } from '@angular/router';
import { LocalizedString } from '@angular/compiler';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userInactivate: boolean = false;
  UserRole: string = '';
  roleNormal: boolean = false;
  roleMana: boolean = false;
  roleHR: boolean = false;

  constructor(private router: Router, private httpClient: HttpClient) { }

  Logout() {
    this.router.navigate(['']);
    const headers = new HttpHeaders({
      Authorization: 'Bearer' + localStorage.getItem('tokenLocal')
    });
    localStorage.clear();

    return this.httpClient.delete(`${environment.apiURL}/auth/logout`, {
      headers
    });
  }

  reFreshToken() {

    const headers = new HttpHeaders({
      Authorization: 'Bearer' + localStorage.getItem('tokenLocal')
    });

    return this.httpClient.post(`${environment.apiURL}/auth/refresh`, {
      headers,
    });
  }
}
