import { Component, OnInit } from '@angular/core';
import { PaginationInstance } from 'ngx-pagination';
import { DatePipe, Location } from '@angular/common';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale, thBeLocale } from 'ngx-bootstrap/chronos';
import { TimeAttendanceService } from '../time-attendance.service';

@Component({
    selector: 'app-timeattendance-history',
    templateUrl: './timeattendance-history.component.html',
    styleUrls: ['./timeattendance-history.component.css']
})
export class TimeattendanceHistoryComponent implements OnInit {

    constructor(private _location: Location, private localeService: BsLocaleService, private serviceTimeatd: TimeAttendanceService, public datepipe: DatePipe) { }

    ary: any = [1, 2, 3]
    listPerPage: any = 10
    date: any
    objTableHistory: any
    checkState:boolean = true
    ngOnInit() {
        defineLocale('th', thBeLocale);
        this.localeService.use('th');

        this.serviceTimeatd.requestAttendanceHistory("").subscribe({
            next: (res: any) => {
                this.objTableHistory = res.data.req_time_attendances
                this.checkState = false;
            },
            error: (err: any) => { }
        })
    }

    public config: PaginationInstance = {
        id: 'custom',
        itemsPerPage: 10,
        currentPage: 1
    }

    UpdateListPerpage() {
        this.config.itemsPerPage = this.listPerPage
        this.config.currentPage = 1
    }


    backClicked() {
        this._location.back();
    }

    sortDate() {
        let startDate = new Date(this.date[0])
        let endDate = new Date(this.date[1])

        if (isNaN(Number(startDate)) || isNaN(Number(endDate)))
            return

        let startDateFormat = startDate.getFullYear() + "-" + Number(startDate.getMonth() + 1) + "-" + startDate.getDate()
        // console.log(startDateFormat)

        let endDateFormat = endDate.getFullYear() + "-" + Number(endDate.getMonth() + 1) + "-" + endDate.getDate()
        // console.log(endDateFormat)
        let date = startDateFormat + "," + endDateFormat

        this.serviceTimeatd.requestAttendanceHistory(date).subscribe({
            next: (res: any) => {
                this.objTableHistory = res.data.req_time_attendances
            },
            error: (err: any) => { }
        })
    }

}
