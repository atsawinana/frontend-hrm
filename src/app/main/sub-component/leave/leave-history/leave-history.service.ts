import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LeaveHistoryService {

  constructor(private httpClient: HttpClient) { }
  getUserHistory(sortDate: string) {

    const headers = new HttpHeaders({
      'Authorization': 'Bearer' + localStorage.getItem('tokenLocal'),
    });

    return this.httpClient.get(`${environment.apiURL}/leaveOnline/viewAllLeaveHistory`, { headers,
    params: {
      sort_date : sortDate
    } });
  }

}
