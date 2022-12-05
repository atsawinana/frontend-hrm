import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root',
  })
  export class LeaveRequestService {
    constructor(private httpClient: HttpClient) {}

    addLeaveRequest(
        leaveType: string,
        startDate: string,
        endDate: string | null,
        duration: string,
        detail: string,
        
      ) {
        const headers = new HttpHeaders({
          Authorization: 'Bearer' + localStorage.getItem('tokenLocal'),
        });
    
        return this.httpClient.post(
          `${environment.apiURL}/leaveOnline/addRequestLeave`,
          {
            rvac_type: leaveType,
            rvac_date_start: startDate,
            rvac_date_end: endDate,
            rvac_duration: duration,
            rvac_detail: detail,
          },
          { headers }
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
  }  