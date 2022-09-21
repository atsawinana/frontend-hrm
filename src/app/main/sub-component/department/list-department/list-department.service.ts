import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ListDepartmentService {
  constructor(private httpClient: HttpClient) {}
  getAllDepartment() {
    return this.httpClient.post(`${environment.apiURL}/department/getAllDepartment`, {
    });
  }
  DeleletDepartment(deptID :string) {
    return this.httpClient.post(`${environment.apiURL}/department/deleteDepartment`, {
      dept_id : deptID
    });
  }
  DetailDepartment(deptID :string) {
    return this.httpClient.post(`${environment.apiURL}/department/showDeteilDepartment`, {
      dept_id : deptID
    });
  }

}
