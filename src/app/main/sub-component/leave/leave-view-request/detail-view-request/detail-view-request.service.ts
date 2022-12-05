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

      disapproveRequest(id: any,reason: any) {
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