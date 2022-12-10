import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class DetailViewRequestService {

    constructor(private httpClient: HttpClient) { }

    getUserProfile(id: any) {
        const headers = new HttpHeaders({
            Authorization: 'Bearer' + localStorage.getItem('tokenLocal'),
        });

        return this.httpClient.get(
            `${environment.apiURL}/employee/showEmployeeProfile`,
            {
                headers,
                params: {
                    user_id: id,
                },
            }
        );
    }

    getDetail(id: any) {
        const headers = new HttpHeaders({
            Authorization: 'Bearer' + localStorage.getItem('tokenLocal'),
        });

        return this.httpClient.get(
            `${environment.apiURL}/leaveOnline/showDetailsLeave`,
            {
                headers,
                params: {
                    rvac_id: id,
                },
            }
        );
    }

    approveRequest(id: any) {
        const headers = new HttpHeaders({
            Authorization: 'Bearer' + localStorage.getItem('tokenLocal'),
        });

        return this.httpClient.post(
            `${environment.apiURL}/leaveOnline/approveRequest`,
            {
                rvac_id: id,
            },
            { headers }
        );
    }

    disapproveRequest(id: any, reason: any) {
        const headers = new HttpHeaders({
            Authorization: 'Bearer' + localStorage.getItem('tokenLocal'),
        });

        return this.httpClient.post(
            `${environment.apiURL}/leaveOnline/disapproveRequest`,
            {
                rvac_id: id,
                rvac_reason: reason
            },
            { headers }
        );
    }

    cancelVacation(id: any, reason: any) {
        const headers = new HttpHeaders({
            Authorization: 'Bearer' + localStorage.getItem('tokenLocal'),
        });

        return this.httpClient.patch(
            `${environment.apiURL}/leaveOnline/cancelVacation`,
            {
                rvac_id: id,
                rvac_reason: reason
            },
            { headers, }
        );
    }

    cancelVacationOnApprove(id: any, reason: any) {
        const headers = new HttpHeaders({
            Authorization: 'Bearer' + localStorage.getItem('tokenLocal'),
        });

        return this.httpClient.patch(
            `${environment.apiURL}/leaveOnline/cancelVacation2`,
            {
                rvac_id: id,
                rvac_reason: reason
            },
            { headers, }
        );
    }

    // /leaveOnline/cancelVacation[PATCH]
    // ยกเลิกการลากรณียังไม่มีคนอนุมัติ
    // body: rvac_id

    // /leaveOnline/cancelVacation2[PATCH]
    // ยกเลิกการลากรณีมีคนอนุมัติเรียบร้อย
    // body: rvac_id 5, rvac_reason เปลี่ยนใจไม่ลาแล้ว

    //     /leaveOnline/showDetailsLeave[GET]
    // ดูรายละเอียดใบลา
    // params: rvac_id 

    // /leaveOnline/approveRequest[POST]
    // อนุมัติคำขอ 
    // body: rvac_id

    // /leaveOnline/disapproveRequest[POST]
    // ไม่อนุมัติคำขอ
    // body: rvac_id

}
