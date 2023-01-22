import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EditDetailService {

  constructor(private httpClient: HttpClient) { }
  editData(
    user_idp: any,
    user_contract_typep: any,
    user_companyp: any,
    ud_prefix_idp: any,
    dp_name_enp: any[],
    dept_idp: any,
    ud_emailp: any,
    ud_fullname_enp: any,
    ud_fullname_thp: any,
    ud_nicknamep: any,
    ud_phonep: any,
    ud_id_cardp: any,
    ud_birthdayp: any,
    user_leavep: any,
    user_sickp: any,
    user_take_annualp: any,
    user_ordinationp: any,
    user_maternityp: any,
    user_sterilizationp: any,
    user_military_servicep: any,
    user_without_payp: any,
    user_resignp: any,
    user_deleted_at: any,
    user_created_at: any
  ) {

    const headers = new HttpHeaders({
      'Authorization': 'Bearer' + localStorage.getItem('tokenLocal'),
    });

    return this.httpClient.put(
      `${environment.apiURL}/employee/editEmployeeProfile`,
      {
        user_id: user_idp,
        user_contract_type: user_contract_typep,
        user_company: user_companyp,
        ud_prefix_id: ud_prefix_idp,
        dp_name_en: dp_name_enp,
        dept_id: dept_idp,
        ud_email: ud_emailp,
        ud_fullname_en: ud_fullname_enp,
        ud_fullname_th: ud_fullname_thp,
        ud_nickname: ud_nicknamep,
        ud_phone: ud_phonep,
        ud_id_card: ud_id_cardp,
        ud_birthday: ud_birthdayp,
        user_leave: user_leavep,
        user_sick: user_sickp,
        user_take_annual: user_take_annualp,
        user_ordination: user_ordinationp,
        user_maternity: user_maternityp,
        user_sterilization: user_sterilizationp,
        user_military_service: user_military_servicep,
        user_without_pay: user_without_payp,
        user_resign: user_resignp,
        user_deleted_at: user_deleted_at,
        user_created_at: user_created_at
      },
      {
        headers
      }
    );
  }

  getUserProfile(id: any) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer' + localStorage.getItem('tokenLocal'),
    });

    return this.httpClient.get(
      `${environment.apiURL}/employee/getEditEmployeeProfile`,
      {
        headers,
        params: {
          user_id: id,
        },
      }
    );
  }

  getAllDepartment() {

    const headers = new HttpHeaders({
      'Authorization': 'Bearer' + localStorage.getItem('tokenLocal'),
    });

    return this.httpClient.get(`${environment.apiURL}/department/getAllDepartment`, {
      headers
    });
  }


}



// user_id,
// username,
// this.emp.controls.user_contract_name,
// this.emp.controls.user_company,
// this.emp.controls.ud_prefix_id,
// ary,
// dept,
// this.emp.controls.ud_email,
// this.emp.controls.ud_fullname_en,
// this.emp.controls.ud_fullname_th,
// this.emp.controls.ud_nickname,
// this.emp.controls.ud_phone,
// this.emp.controls.ud_id_card,
// this.emp.controls.ud_birthday,
// this.emp.controls.user_leave_day,
// this.emp.controls.user_sick_day,
// this.emp.controls.user_take_annual_day,
// this.emp.controls.user_ordination_day,
// this.emp.controls.user_maternity_day,
// this.emp.controls.user_sterilization_day,
// this.emp.controls.user_military_service_day,
// this.emp.controls.user_without_pay_day,
// this.emp.controls.user_resign_day,