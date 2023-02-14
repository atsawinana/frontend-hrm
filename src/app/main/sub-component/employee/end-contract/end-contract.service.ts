import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EndContractService {

  constructor(private httpClient: HttpClient) { }
  getAllUser() {

    const headers = new HttpHeaders({
      'Authorization': 'Bearer' + localStorage.getItem('tokenLocal'),
    });

    return this.httpClient.get(`${environment.apiURL}/employee/resign`, { headers });
  }

  getEmployeefromDeptID(dept_id: string) {

    const headers = new HttpHeaders({
      'Authorization': 'Bearer' + localStorage.getItem('tokenLocal'),
    });

    return this.httpClient.get(`${environment.apiURL}/employee/resign`, {
      headers,
      params: {
        sort_by: dept_id
      }
    });
  }

  getAllDepartment() {

    const headers = new HttpHeaders({
        'Authorization': 'Bearer' + localStorage.getItem('tokenLocal'),
    });

    return this.httpClient.get(`${environment.apiURL}/department`, {
        headers
    });
}

}
