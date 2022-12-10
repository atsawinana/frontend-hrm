import { Component, OnInit } from '@angular/core';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { PaginationInstance } from 'ngx-pagination';
import { defineLocale, thBeLocale } from 'ngx-bootstrap/chronos';
import { LeaveHistoryService } from './leave-history.service';


@Component({
    selector: 'app-leave-history',
    templateUrl: './leave-history.component.html',
    styleUrls: ['./leave-history.component.css']
})
export class LeaveHistoryComponent implements OnInit {

    constructor(private localeService: BsLocaleService,private leavehistoryservice: LeaveHistoryService) { }
    locale = 'th';
    today!: Date;

    objdataTable: any

    ngOnInit() {
        this.today = new Date();
        defineLocale('th', thBeLocale);
        this.localeService.use(this.locale);

        this.leavehistoryservice.getUserHistory("").subscribe({
            next: (res: any) => {
                console.log(res.data.leave_online)
                this.objdataTable = res.data.leave_online
            },
            error: (err: any) => {

            }
        })
    }


}
