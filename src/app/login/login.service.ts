import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) {}

  login(input: {username: string, password: string}) {
    return this.httpClient.post(`${environment.apiURL}/auth/login`, {
      user_username: input.username,
      user_password: input.password
    })
  }
  

}
