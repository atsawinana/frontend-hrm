import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EditComponentService {
  constructor(private httpClient: HttpClient) {}

  editGetData(deptID:string) {
    return this.httpClient.post('http://127.0.0.1:8000/api/department/showEditDepartment',
     {dept_id : deptID});
  }
}