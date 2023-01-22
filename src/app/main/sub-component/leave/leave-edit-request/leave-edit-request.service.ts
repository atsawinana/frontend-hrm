import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class LeaveEditRequestService {

    constructor(private httpClient: HttpClient) { }

    showReverseVacation(id: any) {

        const headers = new HttpHeaders({
            Authorization: 'Bearer' + localStorage.getItem('tokenLocal'),
        });

        return this.httpClient.get(
            `${environment.apiURL}/leaveOnline/getReverseVacation`,
            {
                headers,
                params: {
                    rvac_id: id,
                },
            }
        );

    }

    getVacationType() {
        const headers = new HttpHeaders({
            Authorization: 'Bearer' + localStorage.getItem('tokenLocal'),
        });

        return this.httpClient.get(
            `${environment.apiURL}/leaveOnline/getVacationType`,
            {
                headers,
            }
        );
    }

    resendRequest(
        id:any,
        type:any,
        start:any,
        end:any,
        duration:any,
        detail:any,
    ) {
        const headers = new HttpHeaders({
            Authorization: 'Bearer' + localStorage.getItem('tokenLocal'),
        });

        return this.httpClient.patch(
            `${environment.apiURL}/leaveOnline/reverseRequestLeave`,
            {
                'rvac_id': id,
                'rvac_type': type,
                'rvac_date_start': start,
                'rvac_date_end': end,
                'rvac_duration': duration,
                'rvac_detail': detail,
            },
            { headers, }
        );
    }

    //   /leaveOnline/reverseVacation[PATCH]
    //   ส่งคำขอซ้ำกรณีไม่อนุมัติ
    //   body:     'rvac_id'   :  3,
    //                   'rvac_type'   :  '3',
    //                   'rvac_date_start'   :  '2565-12-09',
    //                   'rvac_date_end' : '2565-12-12,
    //                   'rvac_duration' : '3',
    //                   'rvac_detail' : 'อนุมัติเถอะ',


    // /leaveOnline/showReverseVacation
    // แสดงข้อมูลก่อนแก้ไข
    // params: rvac_id : 1 

}
