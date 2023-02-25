import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root',
})
export class DepartmentService {
    constructor(private httpClient: HttpClient) { }

    getAllUser() {

        const headers = new HttpHeaders({
            'Authorization': 'Bearer' + localStorage.getItem('tokenLocal'),
        });

        return this.httpClient.get(`${environment.apiURL}/department/create`, { headers });
    }

 
    
  adddepartment(
    namedepartment_en: string,
    namedepartment_th: string,
    naemposition: string[],
    nameleader: string[]
  ) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer' + localStorage.getItem('tokenLocal'),
    });

    return this.httpClient.post(
      `${environment.apiURL}/department`,
      
      {
        dept_name_en: namedepartment_en,
        dept_name_th: namedepartment_th,
        dp_name_en: naemposition,
        dept_update_by: 'FixID',
        dmm_username: nameleader,
      },

      { headers }
    );
  }

  editGetData(deptID: string) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer' + localStorage.getItem('tokenLocal'),
    });

    return this.httpClient.get(
      `${environment.apiURL}/department/edit`,
      { headers, params: { dept_id: deptID } }
    );
  }

  editData(
    deptID: string,
    deptnameen: string,
    dpnameen: string[],
    dmmusername: string[],
    deptupdateby: string,
    deptnameth: string
  ) {

    const headers = new HttpHeaders({
      'Authorization': 'Bearer' + localStorage.getItem('tokenLocal'),
    });

    return this.httpClient.put(
      `${environment.apiURL}/department`,
      {
        dept_id: deptID,
        dept_name_en: deptnameen,
        dp_name_en: dpnameen,
        dmm_username: dmmusername,
        dept_update_by: 'fix',
        dept_name_th: deptnameth,
      },
      {
        headers
      }
    );
  }

  
  showEmployeeInDepartment(deptID: string) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer' + localStorage.getItem('tokenLocal'),
    });

    return this.httpClient.get(
      `${environment.apiURL}/department/employeePresent`,
      {
        headers,
        params: {
          dept_id: deptID,
        },
      }
    );
  }

  showResignInDepartment(deptID: string) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer' + localStorage.getItem('tokenLocal'),
    });

    return this.httpClient.get(
      `${environment.apiURL}/department/employeeResign`,
      {
        headers,
        params: {
          dept_id: deptID,
        },
      }
    );
  }

  

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
