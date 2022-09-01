import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  checkTokenBool!:boolean 

  CheckAuth(input: { token: string }) {
    return this.httpClient.post('http://127.0.0.1:8000/api/auth/check', {
      token: input.token});
  }

  saveTokenLocal(token: string) {
    localStorage.setItem('tokenLocal', token);
  }

  checkTokenOnTime(tokenlocal: string):boolean {
    this.CheckAuth({ token: tokenlocal }).subscribe({
      next: (res: any) => {
        this.checkTokenBool = res.data

        console.log('check function1',this.checkTokenBool)
      },
      error: (err) => {},
    });
    console.log('check function223',this.checkTokenBool)

    return (this.checkTokenBool)
  }
   
}
