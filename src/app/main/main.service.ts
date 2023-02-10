import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class MainService {

    constructor(private httpClient: HttpClient, private coreToken: AuthService, private router: Router,) { }




    profileRequest(input: { token: string }) {
        return this.httpClient.post(`${environment.apiURL}/auth/getHeaderProfile`, {
            token: input.token
        })
    }

    Error() {
        Swal.fire({
            icon: "error",
            title: 'เกิดข้อผิดพลาด กรุณาลองใช้งานอีกครั้ง',
        }).then((result) => {
            /* Read more about handling dismissals below */
            this.coreToken.Logout().subscribe({
                next: (res: any) => {},
                error: (error: any) => {},
            })
            this.router.navigate(['']);
        })
    }

}
