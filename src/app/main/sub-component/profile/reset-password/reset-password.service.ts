import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ResetPasswordService {

    constructor(private httpClient: HttpClient) { }

    changePassword(
        old_password: string,
        new_password: string,
        confirm_password: string
    ) {
        const headers = new HttpHeaders({
            Authorization: 'Bearer' + localStorage.getItem('tokenLocal'),
        });

        return this.httpClient.patch(
            `${environment.apiURL}/employee/changePassword`,
            {
                user_password: old_password,
                user_password_new: new_password,
                user_password_confirm: confirm_password,
            },
            { headers }
        );
    }
}
