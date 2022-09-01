import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class MainService {

constructor(private httpClient: HttpClient,private coreToken: AuthService) { }




profileRequest(input: {token: string}) {
  return this.httpClient.post('http://127.0.0.1:8000/api/auth/profile', {
    token:input.token
  })
}

}
