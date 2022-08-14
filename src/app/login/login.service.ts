import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) {}

  login(input: {username: string, password: string}) {
    return this.httpClient.post('http://127.0.0.1:8000/api/auth/login', {
      user_username: input.username,
      user_password: input.password
    })
  }
  

}
