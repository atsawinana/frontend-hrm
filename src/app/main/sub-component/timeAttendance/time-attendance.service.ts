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
            `${environment.apiURL}/timeAttendance/CheckIn`,
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
            `${environment.apiURL}/timeAttendance/CheckOut`,
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

}

