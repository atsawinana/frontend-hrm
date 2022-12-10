import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotiService {

    constructor(private httpClient: HttpClient) { }

    getAllNoti() {
        const headers = new HttpHeaders({
          Authorization: 'Bearer' + localStorage.getItem('tokenLocal'),
        });
    
        return this.httpClient.get(
          `${environment.apiURL}/leaveOnline/notification`,
          {
            headers,
          }
        );
      }

      clearNoti() {
        const headers = new HttpHeaders({
          Authorization: 'Bearer' + localStorage.getItem('tokenLocal'),
        });
    
        return this.httpClient.patch(
          `${environment.apiURL}/leaveOnline/clearNotification`,
          {
            headers,
          }
        );
      }

      getLeaveNoti() {
        const headers = new HttpHeaders({
          Authorization: 'Bearer' + localStorage.getItem('tokenLocal'),
        });
    
        return this.httpClient.get(
          `${environment.apiURL}/leaveOnline/notificationReqLeave`,
          {
            headers,
          }
        );
      }

      clearLeaveNoti() {
        const headers = new HttpHeaders({
          Authorization: 'Bearer' + localStorage.getItem('tokenLocal'),
        });
    
        return this.httpClient.patch(
          `${environment.apiURL}/leaveOnline/clearNotificationReqLeave`,
          {
          },
          {
            headers
          }
        );
      }

// /leaveOnline/notification[GET]
// ดูการแจ้งเตือนการอนุมัติ

// /leaveOnline/clearNotification[PATCH]
// ลบการแจ้งเตือนการอนุมัติ

// /leaveOnline/notificationReqLeave[GET]
// ดูการแจ้งเตือนคำร้องการลา

// /leaveOnline/clearNotificationReqLeave[PATCH]
// ลบการแจ้งเตือนคำร้องการลา 

}
