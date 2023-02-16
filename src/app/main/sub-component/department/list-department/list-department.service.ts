import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ListDepartmentService {
  constructor(private httpClient: HttpClient) { }



  getAllDepartment() {

    const headers = new HttpHeaders({
      'Authorization': 'Bearer' + localStorage.getItem('tokenLocal'),
    });

    return this.httpClient.get(`${environment.apiURL}/department`, {
      headers
    });
  }

  //ยังไม่ได้แก้
  DeleletDepartment(deptID: string) {

    const headers = new HttpHeaders({
      'Authorization': 'Bearer' + localStorage.getItem('tokenLocal'),
    });

    return this.httpClient.delete(`${environment.apiURL}/department`, {headers,
      params: {
        dept_id: deptID
      }
    });
  }

  DetailDepartment(deptID: string) {

    const headers = new HttpHeaders({
      'Authorization': 'Bearer' + localStorage.getItem('tokenLocal'),
    });

    return this.httpClient.get(`${environment.apiURL}/department/detail`, {
      headers,
      params: {
        'dept_id': deptID
      }
    });
  }

}
