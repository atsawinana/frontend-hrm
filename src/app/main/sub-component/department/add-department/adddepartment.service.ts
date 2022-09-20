import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
    return this.httpClient.post(
      'http://127.0.0.1:8000/api/department/addDepartment',
      {
        dept_name_en: namedepartment_en,
        dept_name_th: namedepartment_th,
        dp_name_en: naemposition,
        dept_update_by: 'FixID',
        dmm_username: nameleader,
      }
    );
  }

  
}
