import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class LeaveService {

    constructor(private httpClient: HttpClient) { }

    getVerify(rvac_type:any,rvac_date_start:any,rvac_date_end:any,rvac_duration:any,) {
        const headers = new HttpHeaders({
            Authorization: 'Bearer' + localStorage.getItem('tokenLocal'),
        });

        return this.httpClient.get(
            `${environment.apiURL}/leaveOnline/checkDate`,
            {
                headers,
                params: {
                    'rvac_type': rvac_type,
                    'rvac_date_start': rvac_date_start,
                    'rvac_date_end': rvac_date_end,
                    'rvac_duration': rvac_duration,
                },
            }
        );
    }

}

// /leaveOnline/checkDate[GET]
//                 'rvac_type'  :  1,
//                 'rvac_date_start'  :  2565-12-09,
//                 'rvac_date_end': '2565-12-12,
//                 'rvac_duration': 3,