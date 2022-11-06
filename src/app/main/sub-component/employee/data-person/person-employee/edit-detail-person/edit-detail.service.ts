import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EditDetailService {

  constructor(private httpClient: HttpClient) { }
  editData(

      user_id: any,
      user_username: any,
      user_contract_type: any,
      user_company: any,
      ud_prefix_id: any,
      dp_name_en: any[],
      dept_id: any,
      ud_email: any,
      ud_fullname_en: any,
      ud_fullname_th: any,
      ud_nickname: any,
      ud_phone: any,
      ud_id_card: any,
      ud_birthday: any,
      user_leave: any,
      user_sick: any,
      user_take_annual: any,
      user_ordination: any,
      user_maternity: any,
      user_sterilization: any,
      user_military_service: any,
      user_without_pay: any,
      user_resign: any,
  ) {

    const headers = new HttpHeaders({
      'Authorization': 'Bearer' + localStorage.getItem('tokenLocal'),
    });

    return this.httpClient.put(
      `${environment.apiURL}/employee/editEmployeeProfile`,
      {
        user_id: user_id,
        user_username: user_username,
        user_contract_type: user_contract_type,
        user_company: user_company,
        ud_prefix_id: ud_prefix_id,
        dp_name_en: dp_name_en,
        dept_id: dept_id,
        ud_email: ud_email,
        ud_fullname_en: ud_fullname_en,
        ud_fullname_th: ud_fullname_th,
        ud_nickname: ud_nickname,
        ud_phone: ud_phone,
        ud_id_card: ud_id_card,
        ud_birthday: ud_birthday,
        user_leave: user_leave,
        user_sick: user_sick,
        user_take_annual: user_take_annual,
        user_ordination: user_ordination,
        user_maternity: user_maternity,
        user_sterilization: user_sterilization,
        user_military_service: user_military_service,
        user_without_pay: user_without_pay,
        user_resign: user_resign,
      },
      {
        headers
      }
    );
  }

}
