import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root'
})
export class MainService {

    constructor(private httpClient: HttpClient, private coreToken: AuthService) { }




    profileRequest(input: { token: string }) {
        return this.httpClient.post(`${environment.apiURL}/auth/profile`, {
            token: input.token
        })
    }

    Error() {
        let timerInterval: any
        Swal.fire({
            icon: "error",
            title: 'เกิดข้อผิดพลาด กรุณาลองใช้งานอีกครั้ง',
            timer: 2000,
            timerProgressBar: true,
            willClose: () => {
                clearInterval(timerInterval)
            }
        }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
                console.log('I was closed by the timer')
            }
        })
    }

}
