import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MainService {

constructor(private httpClient: HttpClient,private coreToken: AuthService) { }




profileRequest(input: {token: string}) {
  return this.httpClient.post(`${environment.apiURL}/auth/profile`, {
    token:input.token
  })
}

}
