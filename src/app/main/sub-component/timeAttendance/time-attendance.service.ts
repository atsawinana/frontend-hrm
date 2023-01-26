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

        return this.httpClient.post(
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

        return this.httpClient.post(
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
            `${environment.apiURL}/timeAttendance/getAttendanceHistory`,
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
            `${environment.apiURL}/timeAttendance/getUnapprovedRequestAttendances`,
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
            `${environment.apiURL}/timeAttendance/getDetailsRequestAttendances`,
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

    addRequestAttendance(rta_type: any, rta_date: any, rta_start_time: any, rta_detail: any,) {
        const headers = new HttpHeaders({
            Authorization: 'Bearer' + localStorage.getItem('tokenLocal'),
        });

        return this.httpClient.post(
            `${environment.apiURL}/timeAttendance/addRequestAttendance`,
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

    getRequestAttendanceHistory() {
        const headers = new HttpHeaders({
            Authorization: 'Bearer' + localStorage.getItem('tokenLocal'),
        });

        return this.httpClient.get(
            `${environment.apiURL}/timeAttendance/getRequestAttendanceHistory`,
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






}

