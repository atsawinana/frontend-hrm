import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class LeaveViewRequestService {

    constructor(private httpClient: HttpClient) { }

    getAllshowUnapproved() {

        const headers = new HttpHeaders({
            'Authorization': 'Bearer' + localStorage.getItem('tokenLocal'),
        });

        return this.httpClient.get(`${environment.apiURL}/leaveOnline/getUnapprovedRequestLeave`, { headers });
    }


}

// /LeaveOnline/showUnapproved[GET]
// แสดงรายการที่ยังไม่ได้อนุมัติ