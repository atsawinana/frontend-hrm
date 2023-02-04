import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class TimeAttendanceService {

    constructor(private httpClient: HttpClient) { }

    createTable() {
        const headers = new HttpHeaders({
            'Authorization': 'Bearer' + localStorage.getItem('tokenLocal'),
        });

        return this.httpClient.get(`${environment.apiURL}/TimeAttendance/pseudo-crontab`, { headers });
    }

    getCondition() {
        const headers = new HttpHeaders({
            'Authorization': 'Bearer' + localStorage.getItem('tokenLocal'),
        });

        return this.httpClient.get(`${environment.apiURL}/timeAttendance/checkAttendance`, { headers });
    }

    checkin() {
        const headers = new HttpHeaders({
            Authorization: 'Bearer' + localStorage.getItem('tokenLocal'),
        });

        return this.httpClient.patch(
            `${environment.apiURL}/timeAttendance/checkIn`,
            {
            },
            { headers }
        );
    }

    checkout() {
        const headers = new HttpHeaders({
            Authorization: 'Bearer' + localStorage.getItem('tokenLocal'),
        });

        return this.httpClient.patch(
            `${environment.apiURL}/timeAttendance/checkOut`,
            {
            },
            { headers }
        );
    }

    checkConditionOut() {
        const headers = new HttpHeaders({
            Authorization: 'Bearer' + localStorage.getItem('tokenLocal'),
        });

        return this.httpClient.get(
            `${environment.apiURL}/timeAttendance/checkCompleted`,
            { headers }
        );
    }

    getTable() {
        const headers = new HttpHeaders({
            Authorization: 'Bearer' + localStorage.getItem('tokenLocal'),
        });

        return this.httpClient.get(
            `${environment.apiURL}/timeAttendance/attendanceHistory`,
            { headers }
        );
    }

    //     /timeAttendance/getUnapprovedRequestAttendances[GET]
    // ดูคำร้องเข้างานที่ยังไม่ได้อนุมัติ


    getUnapprovedRequestAttendances() {
        const headers = new HttpHeaders({
            Authorization: 'Bearer' + localStorage.getItem('tokenLocal'),
        });

        return this.httpClient.get(
            `${environment.apiURL}/timeAttendance/unapprovedRequestAttendances`,
            { headers }
        );
    }

    //     /timeAttendance/getDetailsRequestAttendances[GET]
    // ดูรายละเอียดคำร้องเข้างาน
    // params: rta_id = 1

    getDetailsRequestAttendances(rta_id: any) {
        const headers = new HttpHeaders({
            Authorization: 'Bearer' + localStorage.getItem('tokenLocal'),
        });

        return this.httpClient.get(
            `${environment.apiURL}/timeAttendance/requestAttendance`,
            {
                params: {
                    rta_id: rta_id,
                },
                headers
            },
        );
    }

    //     /time-attendance/add-request-time-attendance[POST]
    // เพิ่มคำร้องเข้างาน
    // params : rta_type = 1, rta_date = 2566-01-21, rta_start_time = 10:00, rta_detail = ลืมกดปุ่ม

    requestAttendance(rta_type: any, rta_date: any, rta_start_time: any, rta_detail: any,) {
        const headers = new HttpHeaders({
            Authorization: 'Bearer' + localStorage.getItem('tokenLocal'),
        });

        return this.httpClient.post(
            `${environment.apiURL}/timeAttendance/requestAttendance`,
            {
                rta_type: rta_type,
                rta_date: rta_date,
                rta_start_time: rta_start_time,
                rta_detail: rta_detail,
            },
            { headers },

        );
    }

    //     /timeAttendance/getRequestAttendanceHistory[GET]
    // ดูประวัติคำร้องเข้างานของตนเอง 

    allRequestAttendanceHistory() {
        const headers = new HttpHeaders({
            Authorization: 'Bearer' + localStorage.getItem('tokenLocal'),
        });

        return this.httpClient.get(
            `${environment.apiURL}/timeAttendance/allAttendanceHistory`,
            { headers }
        );
    }

    requestAttendanceHistory() {
        const headers = new HttpHeaders({
            Authorization: 'Bearer' + localStorage.getItem('tokenLocal'),
        });

        return this.httpClient.get(
            `${environment.apiURL}/timeAttendance/requestAttendanceHistory`,
            { headers }
        );
    }

    // /timeAttendance/disapproveRequestAttendance[POST]
    // ไม่อนุมัติเข้างาน
    // body : "rta_id" : 1, "rta_reason" : "งานไม่เดิน"

    disapproveRequestAttendance(rta_id: any, rta_reason: any) {
        const headers = new HttpHeaders({
            Authorization: 'Bearer' + localStorage.getItem('tokenLocal'),
        });

        return this.httpClient.post(
            `${environment.apiURL}/timeAttendance/disapproveRequestAttendance`,
            {
                rta_id: rta_id,
                rta_reason: rta_reason,
            },
            { headers },

        );
    }


    // /timeAttendance/approveRequestAttendance[POST]
    // อนุมัติเข้างาน
    // body : "rta_id" : 1

    approveRequestAttendance(rta_id: any) {
        const headers = new HttpHeaders({
            Authorization: 'Bearer' + localStorage.getItem('tokenLocal'),
        });

        return this.httpClient.post(
            `${environment.apiURL}/timeAttendance/approveRequestAttendance`,
            {
                rta_id: rta_id,
            },
            { headers },

        );
    }

    // /timeAttendance/cancelRequestAttendance[PATCH]
    // ยกเลิกคำขอเข้างาน
    // body : "rta_id" : "1", "rta_reason" : "อยากลา"

    cancelRequestAttendance(id: any, reason: any) {
        const headers = new HttpHeaders({
            Authorization: 'Bearer' + localStorage.getItem('tokenLocal'),
        });

        return this.httpClient.patch(
            `${environment.apiURL}/timeAttendance/cancelRequestAttendance`,
            {
                rta_id: id,
                rta_reason: reason
            },
            { headers, }
        );
    }

//     /timeAttendance/checkRequestAttendance [GET]
// check_time_attendance_button

checkRequestAttendance(rta_date:any) {
    const headers = new HttpHeaders({
        Authorization: 'Bearer' + localStorage.getItem('tokenLocal'),
    });

    return this.httpClient.get(
        `${environment.apiURL}/timeAttendance/checkRequestAttendance`,
        {
            params: {
                rta_date: rta_date,
            },
            headers
        },
    );
}

//Route::get('/timeAttendance/reverseAttendance/{$rta_id}','TimeAttendance@get_reverse_attendance');

reverseAttendance(rta_id:any) {
    const headers = new HttpHeaders({
        Authorization: 'Bearer' + localStorage.getItem('tokenLocal'),
    });

    return this.httpClient.get(
        `${environment.apiURL}/timeAttendance/reverseAttendance`,
        {
            params: {
                rta_id: rta_id,
            },
            headers
        },
    );
}


}

