import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdddepartmentService {
  constructor(private httpClient: HttpClient) {}

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
      `${environment.apiURL}/department/addDepartment`,
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
}
