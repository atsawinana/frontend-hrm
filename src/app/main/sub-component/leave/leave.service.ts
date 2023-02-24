import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class LeaveService {

    constructor(private httpClient: HttpClient) { }

    getVerify(rvac_type: any, rvac_date_start: any, rvac_date_end: any, rvac_duration: any,) {
        const headers = new HttpHeaders({
            Authorization: 'Bearer' + localStorage.getItem('tokenLocal'),
        });

        return this.httpClient.get(
            `${environment.apiURL}/requestLeave/checkDate`,
            {
                headers,
                params: {
                    'rvac_type': rvac_type,
                    'rvac_date_start': rvac_date_start,
                    'rvac_date_end': rvac_date_end,
                    'rvac_duration': rvac_duration,
                },
            }
        );
    }

    getleaveOnlineEdit() {
        const headers = new HttpHeaders({
            Authorization: 'Bearer' + localStorage.getItem('tokenLocal'),
        });

        return this.httpClient.get(
            `${environment.apiURL}/leaveOnline/edit`,
            {
                headers,
            }
        );
    }

    leaveOnline(
        v_leave: any,
        v_sick: any,
        v_ordination: any,
        v_maternity: any,
        v_sterilization: any,
        v_military_service: any,
        v_without_pay: any,
        v_resign: any,
        v_take_annual0_12: any,
        v_take_annual13_15: any,
        v_take_annual16_18: any,
        v_take_annual19_21: any,
        v_take_annual22_24: any,
        v_take_annual25_27: any,
        v_take_annual28_30: any,
        v_take_annual31_33: any,
        v_take_annual34_36: any,
        v_take_annual37_39: any,
        v_take_annual40_42: any,
        v_take_annual43_45: any,
        v_take_annual46: any
    ) {
        const headers = new HttpHeaders({
            Authorization: 'Bearer' + localStorage.getItem('tokenLocal'),
        });

        return this.httpClient.put(
            `${environment.apiURL}/leaveOnline`,
            {
                "v_leave": v_leave,
                "v_sick": v_sick,
                "v_ordination": v_ordination,
                "v_maternity": v_maternity,
                "v_sterilization": v_sterilization,
                "v_military_service": v_military_service,
                "v_without_pay": v_without_pay,
                "v_resign": v_resign,
                "v_take_annual0_12": v_take_annual0_12,
                "v_take_annual13_15": v_take_annual13_15,
                "v_take_annual16_18": v_take_annual16_18,
                "v_take_annual19_21": v_take_annual19_21,
                "v_take_annual22_24": v_take_annual22_24,
                "v_take_annual25_27": v_take_annual25_27,
                "v_take_annual28_30": v_take_annual28_30,
                "v_take_annual31_33": v_take_annual31_33,
                "v_take_annual34_36": v_take_annual34_36,
                "v_take_annual37_39": v_take_annual37_39,
                "v_take_annual40_42": v_take_annual40_42,
                "v_take_annual43_45": v_take_annual43_45,
                "v_take_annual46": v_take_annual46
            },
            {
                headers
            }
        );
    }

}




// leaveOnline/edit [get]
// ดูแก้ไขวันลาประจำปี ตัวแปรตามภาพ
// leaveOnline [put]
// แก้ไขวันลาประจำปี ส่งตัวแปรชื่อเดิมตามภาพ

// /leaveOnline/checkDate[GET]
//                 'rvac_type'  :  1,
//                 'rvac_date_start'  :  2565-12-09,
//                 'rvac_date_end': '2565-12-12,
//                 'rvac_duration': 3,