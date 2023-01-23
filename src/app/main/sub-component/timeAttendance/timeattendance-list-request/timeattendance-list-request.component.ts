import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { PaginationInstance } from 'ngx-pagination';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale, thBeLocale } from 'ngx-bootstrap/chronos';


@Component({
    selector: 'app-timeattendance-list-request',
    templateUrl: './timeattendance-list-request.component.html',
    styleUrls: ['./timeattendance-list-request.component.css']
})
export class TimeattendanceListRequestComponent implements OnInit {

    constructor(private _location: Location) { }

    ary: any = ["หิว", "ข้าว", "มันไก่"]
    listPerPage: any = 10

    ngOnInit() {
      
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
