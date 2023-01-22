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
            `${environment.apiURL}/leaveOnline/getNotification`,
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
            },
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
            `${environment.apiURL}/leaveOnline/getNotificationRequestLeave`,
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


    showNumOfNotification() {
        const headers = new HttpHeaders({
            Authorization: 'Bearer' + localStorage.getItem('tokenLocal'),
        });

        return this.httpClient.get(
            `${environment.apiURL}/leaveOnline/GetCountNotification`,
            {
                headers,
            }
        );
    }

    updateHasSeen(id: any) {
        const headers = new HttpHeaders({
            Authorization: 'Bearer' + localStorage.getItem('tokenLocal'),
        });

        return this.httpClient.patch(
            `${environment.apiURL}/leaveOnline/updateSeenNotification`,
            {
                'noti_id': id
            },
            {
                headers
            }
        );
    }



    // /leaveOnline/updateHasSeen[PATCH]
    // body: 'rvac_id' : 1


    //   /leaveOnline/showNumOfNotification[GET]
    //   ข้อมูลที่ได้ 
    //   {
    //       "status": {
    //           "description": "Show num of notification Successfully"
    //       },
    //       "data": {
    //           "sum_notification": 0, *เลขที่ขึ้นในหน้าหลังทั้งหมด (ที่ยังไม่อ่าน)
    //           "all_notification": 0, นอติโหมดทั้งหมด (ที่ยังไม่อ่าน)
    //           "leave_notification": 0, นอติโหมดคำร้องการลา (ที่ยังไม่อ่าน)
    //           "attendance_notification": 0, นอติโหมดเข้างานออกงาน (ที่ยังไม่อ่าน)
    //           "overtime_notification": 0 นอติโหมดโอที (ที่ยังไม่อ่าน)
    //       }
    //   }


    // /leaveOnline/notification[GET]
    // ดูการแจ้งเตือนการอนุมัติ

    // /leaveOnline/clearNotification[PATCH]
    // ลบการแจ้งเตือนการอนุมัติ

    // /leaveOnline/notificationReqLeave[GET]
    // ดูการแจ้งเตือนคำร้องการลา

    // /leaveOnline/clearNotificationReqLeave[PATCH]
    // ลบการแจ้งเตือนคำร้องการลา 

}
