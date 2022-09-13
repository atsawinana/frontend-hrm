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

  userInactivate:boolean = false

  reFreshToken() {
    return this.httpClient.post('http://127.0.0.1:8000/api/auth/refresh', {
      token: localStorage.getItem('tokenLocal'),
    });
  }

  private tokenExpired(token: string) {
    const expiry = JSON.parse(atob(token.split('.')[1])).exp;
    return Math.floor(new Date().getTime() / 1000) >= expiry;
  }

  async CheckTokenTimeOut(): Promise<boolean> {
    if (this.tokenExpired(localStorage.getItem('tokenLocal')!)) {
      if(this.userInactivate)
      {
        localStorage.clear();
        console.log('refresh userInactivate !')
      }
      else
      {
        this.reFreshToken().subscribe({
          next:(res:any) =>
          {
            console.log('token refresh success')
            localStorage.setItem('tokenLocal',res.data.original.access_token)
            location.reload()
          },
          error(err) {
          },
        })
      }
      return true;
    } else {
      return false;
    }
  }

    isLoggedin() {
    this.CheckTokenTimeOut()
    // console.log('user activate!')
    const token = localStorage.getItem('tokenLocal');
    // console.log('isLoggedin', token != null);
    return token != null;
  }

  Logout() {
    localStorage.clear();
    this.router.navigate(['']);
  }
}
