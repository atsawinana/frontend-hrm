import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdddepartmentService {

constructor(private httpClient: HttpClient) { }

adddepartment(input: {namenamedepaetment_en: string, namedepaetment_th: string, nameleader: string, naemposition: string}) {
  return this.httpClient.post('http://127.0.0.1:8000/api/department/addDepartment', {
    dept_name_en: input.namenamedepaetment_en,
    dept_name_th: input.namedepaetment_th,
    dmm_username: input.nameleader,
    dp_name: input.naemposition
  })
}

}
