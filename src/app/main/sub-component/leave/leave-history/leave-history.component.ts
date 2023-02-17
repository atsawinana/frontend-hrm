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

    constructor(private localeService: BsLocaleService, private leavehistoryservice: LeaveHistoryService, public datepipe: DatePipe,) { }
    locale = 'th';
    today!: Date;

    objdataTable: any

    date: any

    ApiSuccess: boolean = false

    listPerPage: number = 10

    public config: PaginationInstance = {
        id: 'custom',
        itemsPerPage: this.listPerPage,
        currentPage: 1
    }

    UpdateListPerpage() {
        this.config.itemsPerPage = this.listPerPage
    }

    ngOnInit() {
        this.today = new Date();
        defineLocale('th', thBeLocale);
        this.localeService.use(this.locale);



        this.leavehistoryservice.getUserHistory("").subscribe({
            next: (res: any) => {
                this.objdataTable = res.data.leave_online
                // console.log(this.objdataTable)

                let startDate = new Date()
                this.date = startDate
                // let startString
                // startString = this.datepipe.transform(startDate, 'MM/yyyy')!
                // let monthth = startString.substring(0, startString.indexOf('/') + 1)
                // let yearth = startString.substring(startString.indexOf('/') + 1, startString.length)
                // let yearstring
                // yearstring = Number(yearth) + 543
                // startString = monthth + yearstring
                // this.date = startString


                this.ApiSuccess = true
            },
            error: (err: any) => {

            }
        })
    }

    // onOpenCalendar(container: any) {
    //     container.monthSelectHandler = (event: any): void => {
    //         container._store.dispatch(container._actions.select(event.date));
    //     };
    //     container.setViewMode('month');
    // }


    sortDate() {
        // console.log((this.date))

        let startDate = new Date(this.date[0])
        let endDate = new Date(this.date[1])

        if (isNaN(Number(startDate)) || isNaN(Number(endDate)))
            return

        let startDateFormat = startDate.getFullYear() + "-" + Number(startDate.getMonth() + 1) + "-" + startDate.getDate()
        // console.log(startDateFormat)

        let endDateFormat = endDate.getFullYear() + "-" + Number(endDate.getMonth() + 1) + "-" + endDate.getDate()
        // console.log(endDateFormat)
        let date = startDateFormat + "," + endDateFormat
        this.leavehistoryservice.getUserHistory(date).subscribe({
            next: (res: any) => {
                // console.log(res.data)
                this.objdataTable = res.data.leave_online
            },
            error: (err: any) => {

            }
        })
    }


}
