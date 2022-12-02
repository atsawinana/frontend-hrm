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


//     /leaveOnline/showDetailsLeave[GET]
// ดูรายละเอียดใบลา
// params: rvac_id 

}
