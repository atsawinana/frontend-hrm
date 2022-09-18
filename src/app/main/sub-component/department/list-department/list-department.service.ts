import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ListDepartmentService {
  constructor(private httpClient: HttpClient) {}
  getAllDepartment() {
    return this.httpClient.post('http://127.0.0.1:8000/api/department/getAllDepartment', {
    });
  }
  DeleletDepartment(deptID :string) {
    return this.httpClient.post('http://127.0.0.1:8000/api/department/deleteDepartment', {
      dept_id : deptID
    });
  }
  DetailDepartment(deptID :string) {
    return this.httpClient.post('http://127.0.0.1:8000/api/department/showDeteilDepartment', {
      dept_id : deptID
    });
  }

}
