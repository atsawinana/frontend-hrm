import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class OtService {

    constructor(private httpClient: HttpClient) { }

    // /requestOvertime/history[GET]
    // ดูประวัติคำร้องOT

    // /requestOvertime[GET]
    // ดูรายละเอียดคำร้องOT
    // body: "rot_id" : 5

    // /requestOvertime[DELETE]
    // ยกเลิกคำร้องOT
    // body: "rot_id" : 7,"rot_reason" : "ลองยกเลิกอีกที"

    //   /requestOvertime[POST]
    // สร้างคำร้องOT

    requestOvertime(
        rot_ot_id: string,
        rot_start_date: string,
        rot_end_date: string,
        rot_start_time: string | null,
        rot_end_time: string,
        rot_detail: string,

    ) {
        const headers = new HttpHeaders({
            Authorization: 'Bearer' + localStorage.getItem('tokenLocal'),
        });

        return this.httpClient.post(
            `${environment.apiURL}/requestOvertime`,
            {
                "rot_start_date": rot_start_date,
                "rot_detail": rot_detail,
                "rot_start_time": rot_start_time,
                "rot_end_date": rot_end_date,
                "rot_ot_id": rot_ot_id,
                "rot_end_time": rot_end_time
            },
            { headers }
        );
    }

    requestOvertimeHistory() {
        const headers = new HttpHeaders({
            Authorization: 'Bearer' + localStorage.getItem('tokenLocal'),
        });

        return this.httpClient.get(
            `${environment.apiURL}/requestOvertime/history`,
            {
                headers,
            }
        );
    }

    getNameWork() {
        const headers = new HttpHeaders({
            Authorization: 'Bearer' + localStorage.getItem('tokenLocal'),
        });

        return this.httpClient.get(
            `${environment.apiURL}/overTime/name`,
            {
                headers,
            }
        );
    }

    getDetailRequestOvertime(id: any) {
        const headers = new HttpHeaders({
            Authorization: 'Bearer' + localStorage.getItem('tokenLocal'),
        });

        return this.httpClient.get(
            `${environment.apiURL}/requestOvertime/showDetail`,
            {
                headers,
                params: {
                    rot_id: id
                }
            }
        );
    }


    // /requestOvertime/edit [GET]
    // params : "rot_id" : 1
    // แสดงคำร้องโอที เมื่อต้องการแก้ไข

    getEditRequest(id: any) {
        const headers = new HttpHeaders({
            Authorization: 'Bearer' + localStorage.getItem('tokenLocal'),
        });

        return this.httpClient.get(
            `${environment.apiURL}/requestOvertime/edit`,
            {
                headers,
                params: {
                    rot_id: id
                }
            }
        );
    }


    //     /requestOvertime/unapproved[GET]
    // แสดงคำร้องโอทีที่ยังไม่ได้อนุมัติ

    getUnapproved() {
        const headers = new HttpHeaders({
            Authorization: 'Bearer' + localStorage.getItem('tokenLocal'),
        });

        return this.httpClient.get(
            `${environment.apiURL}/requestOvertime/unapproved`,
            {
                headers,
            }
        );
    }

    // /requestOvertime[DELETE]
    // ยกเลิกคำร้องOT
    // body: "rot_id" : 7,"rot_reason" : "ลองยกเลิกอีกที"

    cancelRequestOvertime(id: any, reason: any) {
        const headers = new HttpHeaders({
            Authorization: 'Bearer' + localStorage.getItem('tokenLocal'),
        });

        const httpOptions = {
            headers,
            body: JSON.stringify({
                rot_id: id,
                rot_reason: reason
            }),
        };

        return this.httpClient.delete(
            `${environment.apiURL}/requestOvertime`, httpOptions
        );
    }

    //     /requestOvertime [PUT]
    // แก้ไขคำร้องโอที 
    // body : "rot_id" : 1,
    //     "rot_start_date" : "2023-02-09", 
    //     "rot_detail" : "ทดลองotอีกทีนึง1",
    //     "rot_start_time" : "20:00",
    //     "rot_end_date" : "2023-02-09" ,
    //     "rot_ot_id" : "1",
    //     "rot_end_time" : "22:00"

    
    EditrequestOvertime(
        id:string,
        rot_ot_id: string,
        rot_start_date: string,
        rot_end_date: string,
        rot_start_time: string | null,
        rot_end_time: string,
        rot_detail: string,

    ) {
        const headers = new HttpHeaders({
            Authorization: 'Bearer' + localStorage.getItem('tokenLocal'),
        });

        return this.httpClient.put(
            `${environment.apiURL}/requestOvertime`,
            {
                "rot_id" : id,
                "rot_start_date": rot_start_date,
                "rot_detail": rot_detail,
                "rot_start_time": rot_start_time,
                "rot_end_date": rot_end_date,
                "rot_ot_id": String(rot_ot_id),
                "rot_end_time": rot_end_time
            },
            { headers }
        );
    }

    // /requestOvertime/disapproved [POST]
    // body : "rot_id" : 1, "rot_reason" : "'เลือกงานโอทีผิด"
    // ไม่อนุมัติคำร้องโอที

    disapprovedRequestOvertime(id: any, reason: any) {
        const headers = new HttpHeaders({
            Authorization: 'Bearer' + localStorage.getItem('tokenLocal'),
        });

        return this.httpClient.post(
            `${environment.apiURL}/requestOvertime/disapproved`,
            {
                "rot_id": id,
                "rot_reason": reason,
            },
            { headers }
        );
    }

    // /requestOvertime/approved [POST]
    // body : "rot_id" : 1
    // อนุมัติคำร้องโอที

    approvedRequestOvertime(id: any) {
        const headers = new HttpHeaders({
            Authorization: 'Bearer' + localStorage.getItem('tokenLocal'),
        });

        return this.httpClient.post(
            `${environment.apiURL}/requestOvertime/approved`,
            {
                "rot_id": id,
            },
            { headers }
        );
    }
}
