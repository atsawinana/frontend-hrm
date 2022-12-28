import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LeaveHistoryPersonService {
  constructor(private httpClient: HttpClient) { }


  getUserProfile(id: any,sort:any) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer' + localStorage.getItem('tokenLocal'),
    });

    return this.httpClient.get(
      `${environment.apiURL}/leaveOnline/viewAllLeaveHistoryEmployee`,
      {
        headers,
        params: {
          user_id: id,
          sort_date: sort
        },
      }
    );
  }

  //   /leaveOnline/viewAllLeaveHistoryEmployee[GET]
  // ดูการลาของพนักงาน
  // params: user id=2, sort_date=2565-11



}
