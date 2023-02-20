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
            `${environment.apiURL}/notification`,
            {
                headers,
            }
        );
    }

    clearNoti() {
        const headers = new HttpHeaders({
            Authorization: 'Bearer' + localStorage.getItem('tokenLocal'),
        });

        return this.httpClient.delete(`${environment.apiURL}/notification`, {
            headers,
        });
    }

    clearLeaveNoti() {
        const headers = new HttpHeaders({
            Authorization: 'Bearer' + localStorage.getItem('tokenLocal'),
        });

        return this.httpClient.delete(`${environment.apiURL}/notification/leave`, {
            headers,
        });

    }

    getLeaveNoti() {
        const headers = new HttpHeaders({
            Authorization: 'Bearer' + localStorage.getItem('tokenLocal'),
        });

        return this.httpClient.get(
            `${environment.apiURL}/notification/leave`,
            {
                headers,
            }
        );
    }

    showNumOfNotification() {
        const headers = new HttpHeaders({
            Authorization: 'Bearer' + localStorage.getItem('tokenLocal'),
        });

        return this.httpClient.get(
            `${environment.apiURL}/notification/count`,
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
            `${environment.apiURL}/notification`,
            {
                'noti_id': id
            },
            {
                headers
            }
        );
    }



    //     /timeAttendance/notificationRequestAttendance[GET]
    // noti ที่ยังไม่ได้อนุมัติคำร้อง


    notificationRequestAttendance() {
        const headers = new HttpHeaders({
            Authorization: 'Bearer' + localStorage.getItem('tokenLocal'),
        });

        return this.httpClient.get(
            `${environment.apiURL}/notification/attendance`,
            {
                headers,
            }
        );
    }

    //   /notification/overTime [GET]
    // เเจ้งเตือนโอทีที่ยังไม่ได้อนุมัติ

    getnotificationOverTime() {
        const headers = new HttpHeaders({
            Authorization: 'Bearer' + localStorage.getItem('tokenLocal'),
        });

        return this.httpClient.get(
            `${environment.apiURL}/notification/overTime`,
            {
                headers,
            }
        );
    }

    clearOTNoti() {
        const headers = new HttpHeaders({
            Authorization: 'Bearer' + localStorage.getItem('tokenLocal'),
        });

        return this.httpClient.delete(`${environment.apiURL}/notification/overTime`, {
            headers,
        });

    }

    cleartimeatdNoti() {
        const headers = new HttpHeaders({
            Authorization: 'Bearer' + localStorage.getItem('tokenLocal'),
        });

        return this.httpClient.delete(`${environment.apiURL}/notification/attendance`, {
            headers,
        });


    }

    // /timeAttendance/clearNotificationRequest [PATCH]


//     /notification/overTime [DELETE]
// clear noti ที่ยังไม่ได้อนุมัติคำร้องโอที


    //     /timeAttendance/updateSeenNotification [PATCH]
    // body noti_id: 1


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
