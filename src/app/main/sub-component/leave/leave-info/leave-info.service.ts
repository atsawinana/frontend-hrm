import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LeaveInfoService {

  constructor(private httpClient: HttpClient) { }
  getAllInfo() {

    const headers = new HttpHeaders({
      'Authorization': 'Bearer' + localStorage.getItem('tokenLocal'),
    });

    return this.httpClient.get(`${environment.apiURL}/leaveOnline`, { headers });
  }

}