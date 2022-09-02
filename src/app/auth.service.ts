import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { NavigationEnd, Route, Router, RouterLink } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router, private httpClient: HttpClient) {}

  private tokenExpired(token: string) {
    const expiry = JSON.parse(atob(token.split('.')[1])).exp;
    return Math.floor(new Date().getTime() / 1000) >= expiry;
  }

  CheckTokenTimeOut(): boolean {
    if (this.tokenExpired(localStorage.getItem('tokenLocal')!)) {
      return true;
    } else {
      return false;
    }
  }

  isLoggedin(){
    const token = localStorage.getItem('tokenLocal')!
    return token != null ? true : false
  }

  Logout(){
    localStorage.clear()
    this.router.navigate(['']);
  }
}
