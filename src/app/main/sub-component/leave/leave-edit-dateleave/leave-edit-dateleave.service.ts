import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class LeaveEditDateleaveService {
    constructor(private httpClient: HttpClient) { }


    showPresetVacation() {

        const headers = new HttpHeaders({
            Authorization: 'Bearer' + localStorage.getItem('tokenLocal'),
        });

        return this.httpClient.get(
            `${environment.apiURL}/leaveOnline/getPresetVacation`,
            {
                headers,
            }
        );

    }

    editVacationDays(
        leave:any,
        sick:any,
        takeAnnual1:any,
        takeAnnual2:any,
        takeAnnual3:any,
        takeAnnual4:any,
        ordination:any,
        maternity:any,
        militaryService:any
    ) {
        const headers = new HttpHeaders({
            Authorization: 'Bearer' + localStorage.getItem('tokenLocal'),
        });

        return this.httpClient.patch(
            `${environment.apiURL}/leaveOnline/editPresetVacation`,
            {
                'av_leave': leave,
                'av_sick': sick,
                'av_take_annual1': takeAnnual1,
                'av_take_annual2': takeAnnual2,
                'av_take_annual3': takeAnnual3,
                'av_take_annual4': takeAnnual4,
                'av_ordination': ordination,
                'av_maternity': maternity,
                'av_military_service': militaryService
            },
            { headers, }
        );
    }

}