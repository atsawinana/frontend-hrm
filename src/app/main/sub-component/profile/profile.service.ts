import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private httpClient: HttpClient) { }

  getProfile() {
    const headers = new HttpHeaders({
      Authorization: 'Bearer' + localStorage.getItem('tokenLocal'),
    });

    return this.httpClient.get(`${environment.apiURL}/employee/profile`, {
      headers,
    });
  }

  editNumber(number: any) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer' + localStorage.getItem('tokenLocal'),
    });

    return this.httpClient.patch(
      `${environment.apiURL}/employee/phone`,
      {
        ud_phone: number,
        user_id: localStorage.getItem('user_id')
      },
      {
        headers
      }
    );
  }


  uploadImgprofile(
    file: any
  ) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer' + localStorage.getItem('tokenLocal'),
    });

    return this.httpClient.post(
      `${environment.apiURL}/employee/picture`,
      file,
      { headers }
    );
  }

  confirmPicture(path: any) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer' + localStorage.getItem('tokenLocal'),
    });

    return this.httpClient.patch(`${environment.apiURL}/employee/picture`, {
      path: path
    }, { headers });
  }

}
