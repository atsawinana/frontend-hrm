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




    // /notification/overTime [DELETE]
    // clear noti ที่ยังไม่ได้อนุมัติคำร้องโอที

}
