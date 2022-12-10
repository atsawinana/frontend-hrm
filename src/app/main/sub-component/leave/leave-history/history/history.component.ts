import { Component, OnInit } from '@angular/core';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { LeaveHistoryService } from '../leave-history.service';
import { defineLocale, thBeLocale } from 'ngx-bootstrap/chronos';


@Component({
    selector: 'app-history',
    templateUrl: './history.component.html',
    styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {


    constructor(private localeService: BsLocaleService, private leavehistoryservice: LeaveHistoryService) { }
    locale = 'th';
    today!: Date;
    objdataTable: any
    role: boolean = false

    ngOnInit() {
        if (localStorage.getItem('roleUser') == "2" || localStorage.getItem('roleUser') == "3") {
            this.role = true
        }

        this.today = new Date();
        defineLocale('th', thBeLocale);
        this.localeService.use(this.locale);

        this.leavehistoryservice.getAllUserHistory("").subscribe({
            next: (res: any) => {
                console.log(res.data)
                this.objdataTable = res.data.leave_online
            },
            error: (err: any) => {

            }
        })
    }
}

 

      

