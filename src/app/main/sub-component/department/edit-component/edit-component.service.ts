import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EditComponentService {
  constructor(private httpClient: HttpClient) {}

  editGetData(deptID:string) {
    return this.httpClient.post('http://127.0.0.1:8000/api/department/showEditDepartment',
    {dept_id : deptID});
  }
  editData(deptID:string,deptnameen:string,dpnameen:string[],dmmusername:string[],deptupdateby:string,deptnameth:string){
    return this.httpClient.post(`${environment.apiURL}/department/editDepartment`,{
      dept_id : deptID,
      dept_name_en : deptnameen,
      dp_name_en : dpnameen,
      dmm_username : dmmusername,
      dept_update_by : "fix",
      dept_name_th : deptnameth
    });
  }
}