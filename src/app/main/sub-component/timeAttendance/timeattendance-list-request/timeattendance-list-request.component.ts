import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { PaginationInstance } from 'ngx-pagination';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale, thBeLocale } from 'ngx-bootstrap/chronos';
import { TimeAttendanceService } from '../time-attendance.service';


@Component({
    selector: 'app-timeattendance-list-request',
    templateUrl: './timeattendance-list-request.component.html',
    styleUrls: ['./timeattendance-list-request.component.css']
})
export class TimeattendanceListRequestComponent implements OnInit {

    constructor(private _location: Location, private serviceTimeatd: TimeAttendanceService) { }

    ary: any = ["หิว", "ข้าว", "มันไก่"]
    listPerPage: any = 10
    objListTable:any
    checkState:boolean = true
    ngOnInit() {
        this.serviceTimeatd.getUnapprovedRequestAttendances().subscribe({
            next: (res: any) => {
                this.objListTable = res.data.request_time_attendances
                this.checkState = false
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
    }


    backClicked() {
        this._location.back();
    }

}
