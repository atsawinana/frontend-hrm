import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DetailDataPersonService {
  constructor(private httpClient: HttpClient) {}
  DetailEmployee(ID: string) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer' + localStorage.getItem('tokenLocal'),
    });

    return this.httpClient.get(
      `${environment.apiURL}/employee/showEmployeeProfile`,
      {
        headers,
        params: {
          user_id: ID,
        },
      }
    );
  }
}
