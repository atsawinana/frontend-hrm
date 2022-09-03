import { HostListener, Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { NavigationEnd, Route, Router, RouterLink } from '@angular/router';
import { LocalizedString } from '@angular/compiler';

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
      localStorage.clear()
      return true;
    } else {
      return false;
    }
  }

  isLoggedin() {
    this.CheckTokenTimeOut();
    const token = localStorage.getItem('tokenLocal');
    console.log('isLoggedin',token != null)
    return token != null;
  }

  Logout() {
    localStorage.clear();
    this.router.navigate(['']);
  }
  
}
