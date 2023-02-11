import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmpDepartmentService {
  constructor(private httpClient: HttpClient) {}

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
}

// /department/showEmployeeInDepartment[GET]
// แสดงรายชื่อพนักงานในแผนก
// params: list=3&dept_id=2
// /department/showResignInDepartment[GET]
// แสดงรายชื่อพนักงานที่ลาออกไปแล้วในแผนก
// params: list=3&dept_id=2
