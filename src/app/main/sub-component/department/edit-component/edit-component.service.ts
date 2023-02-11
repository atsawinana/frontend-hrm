import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EditComponentService {
  constructor(private httpClient: HttpClient) {}

  editGetData(deptID: string) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer' + localStorage.getItem('tokenLocal'),
    });

    return this.httpClient.get(
      `${environment.apiURL}/department/create`,
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
}
