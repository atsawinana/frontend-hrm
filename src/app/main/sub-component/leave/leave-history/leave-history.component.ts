import { Component, OnInit } from '@angular/core';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { PaginationInstance } from 'ngx-pagination';
import { defineLocale, thBeLocale } from 'ngx-bootstrap/chronos';
import { LeaveHistoryService } from './leave-history.service';
import { DatePipe } from '@angular/common';


@Component({
    selector: 'app-leave-history',
    templateUrl: './leave-history.component.html',
    styleUrls: ['./leave-history.component.css']
})
export class LeaveHistoryComponent implements OnInit {

    constructor(private localeService: BsLocaleService, private leavehistoryservice: LeaveHistoryService,public datepipe: DatePipe,) { }
    locale = 'th';
    today!: Date;

    objdataTable: any

    date: any

    listPerPage: number = 5

    public config: PaginationInstance = {
        id: 'custom',
        itemsPerPage: this.listPerPage,
        currentPage: 1
    }

    UpdateListPerpage(){
        this.config.itemsPerPage = this.listPerPage
    }

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

    onOpenCalendar(container:any) {
        container.monthSelectHandler = (event: any): void => {
            container._store.dispatch(container._actions.select(event.date));
        };
        container.setViewMode('month');
    }


    sortdate() {
        if(this.date == "" || this.date == null)
            return
        console.log(this.date)
        let startDate = this.datepipe.transform(this.date, 'yyyy-MM-dd')

        let arydate1 = startDate!.toString().split("-")
        console.log("test1", arydate1)
        arydate1[0] = (Number(arydate1[0]) + 543).toString()


        let date = arydate1[0] + "-" + arydate1[1]

        this.leavehistoryservice.getAllUserHistory(date).subscribe({
            next: (res: any) => {
                console.log(res.data)
                this.objdataTable = res.data.leave_online
            },
            error: (err: any) => {

            }
        })
    }

    
}
