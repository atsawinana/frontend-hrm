import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root',
})
export class DepartmentService {
    constructor(private httpClient: HttpClient) { }

    getAllUser() {

        const headers = new HttpHeaders({
            'Authorization': 'Bearer' + localStorage.getItem('tokenLocal'),
        });

        return this.httpClient.get(`${environment.apiURL}/department/create`, { headers });
    }

 
}
