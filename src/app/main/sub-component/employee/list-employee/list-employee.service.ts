import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ListEmployeeService {

    constructor(private httpClient: HttpClient) { }
    getAllUser() {

        const headers = new HttpHeaders({
            'Authorization': 'Bearer' + localStorage.getItem('tokenLocal'),
        });

        return this.httpClient.get(`${environment.apiURL}/employee`, { headers });
    }

    getAllDepartment() {

        const headers = new HttpHeaders({
            'Authorization': 'Bearer' + localStorage.getItem('tokenLocal'),
        });

        return this.httpClient.get(`${environment.apiURL}/department`, {
            headers
        });
    }


    getEmployeefromDeptID(dept_id: string) {

        const headers = new HttpHeaders({
          'Authorization': 'Bearer' + localStorage.getItem('tokenLocal'),
        });
    
        return this.httpClient.get(`${environment.apiURL}/employee`, {headers,
          params: {
            sort_by: dept_id
          }
        });
      }

      getSearch(name: any, sort_by: any) {
        const headers = new HttpHeaders({
            Authorization: 'Bearer' + localStorage.getItem('tokenLocal'),
        });
        if (sort_by == null || sort_by == "") {
            return this.httpClient.get(
                `${environment.apiURL}/employee/search`,
                {
                    headers,
                    params: {
                        name: name
                    }
                }
            );
        } else {
            return this.httpClient.get(
                `${environment.apiURL}/employee/search`,
                {
                    headers,
                    params: {
                        name: name,
                        sort_by: sort_by
                    }
                }
            );
        }
    }
}