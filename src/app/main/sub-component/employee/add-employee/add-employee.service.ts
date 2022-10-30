import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AddEmployeeService {
  constructor(private httpClient: HttpClient) {}

  getLeaveDay(perFix: string) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer' + localStorage.getItem('tokenLocal'),
    });

    return this.httpClient.get(`${environment.apiURL}/employee/getLeave`, {
      headers,
      params: {
        ud_prefix_id: perFix,
      },
    });
  }

  Addemp(
    prefix: string ,
    nameth: string,
    nameen: string,
    nickname: string,
    bth: string,
    ud_email: string,
    idcard: string,
    phone: string,
    company: string,
    deptid: string,
    dp_name_en: string[],
    contract: string,
    usernamne: string,
    password: string,
    create: string,
    leave: string | null,
    sick: string | null,
    takeAnn: string | null,
    ordinatin: string | null,
    maternity: string | null,
    user_sterilization: string | null,
    military: string | null,
    withoutpay: string | null,
    resign: string | null,
  ) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer' + localStorage.getItem('tokenLocal'),
    });

    return this.httpClient.post(
      `${environment.apiURL}/employee/addEmployee`,
      {
        ud_prefix_id: prefix,
        ud_fullname_th: nameth,
        ud_fullname_en: nameen,
        ud_nickname: nickname,
        ud_birthday: bth,
        ud_email: ud_email,
        ud_id_card: idcard,
        ud_phone: phone,
        user_company: company,
        dept_id: deptid,
        dp_name_en: ["1","3","2"],
        user_contract_type: contract,
        user_username: "12345afasf",
        user_password: password,
        user_created_at: create,
        user_leave: leave,
        user_sick: sick,
        user_take_annual: takeAnn,
        user_ordination: ordinatin,
        user_maternity: maternity,
        user_sterilization: null,
        user_military_service: military,
        user_without_pay: null,
        user_resign: null,
      },
      { headers }
    );
  }
}
