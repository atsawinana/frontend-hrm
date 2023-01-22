import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DataPersonService {
  constructor(private httpClient: HttpClient) { }

  getUserProfile(id: any) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer' + localStorage.getItem('tokenLocal'),
    });

    return this.httpClient.get(
      `${environment.apiURL}/employee/getProfileByUserId`,
      {
        headers,
        params: {
          user_id: id,
        },
      }
    );
  }

  // /employee/resetPassword [patch]

  resetPassword(id: any) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer' + localStorage.getItem('tokenLocal'),
    });

    return this.httpClient.patch(
      `${environment.apiURL}/employee/resetPassword`,
      {
        user_id: id,
      },
      {
        headers
      }
    );
  }

  deleteEmployee(
    user_username: string,
  ) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer' + localStorage.getItem('tokenLocal'),
    });

    return this.httpClient.delete(`${environment.apiURL}/employee/deleteDataEmployee`, {
      headers,
      params: {
        'user_id': user_username
      }
    });
  }


//   /leaveOnline/viewAllLeaveHistoryEmployee[GET]
// ดูการลาของพนักงาน
// params: user id=2, sort_date=2565-1

  getHistory(id: any,date: any) {
    const headers = new HttpHeaders({
        Authorization: 'Bearer' + localStorage.getItem('tokenLocal'),
    });

    return this.httpClient.get(
        `${environment.apiURL}/leaveOnline/getLeaveHistoryByUserId`,
        {
            headers,
            params: {
                user_id: id,
                sort_date: date
            },
        }
    );
}

}
