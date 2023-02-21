import { Component, OnInit } from '@angular/core';
import { DatePipe, Location } from '@angular/common';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale, thBeLocale } from 'ngx-bootstrap/chronos';
import { PaginationInstance } from 'ngx-pagination';


@Component({
    selector: 'app-ot-history-all',
    templateUrl: './ot-history-all.component.html',
    styleUrls: ['./ot-history-all.component.css']
})
export class OtHistoryAllComponent implements OnInit {


    constructor(private _location: Location, public datepipe: DatePipe, private localeService: BsLocaleService,) { }

    ngOnInit() {
        defineLocale('th', thBeLocale);
        this.localeService.use('th');
    }

    listPerPage: any = 10
    objTableHistory: any = [1, 2, 3, 4, 5, 15, 11, 12, 13, 14, 16, 17, 18, 19, 21, 22, 23, 34,];
    date: any = ""


    public config: PaginationInstance = {
        id: 'custom',
        itemsPerPage: 10,
        currentPage: 1
    }

    UpdateListPerpage() {
        this.config.itemsPerPage = this.listPerPage
    }

    backClicked() {
        history.back()
    }

    onOpenCalendar(container: any) {
        container.monthSelectHandler = (event: any): void => {
            container._store.dispatch(container._actions.select(event.date));
        };
        container.setViewMode('month');
    }

    sortDate() {
        // // console.log((this.date))

        // let startDate = new Date(this.date[0])
        // let endDate = new Date(this.date[1])

        // if (isNaN(Number(startDate)) || isNaN(Number(endDate)))
        //     return

        // let startDateFormat = startDate.getFullYear() + "-" + Number(startDate.getMonth() + 1) + "-" + startDate.getDate()
        // // console.log(startDateFormat)

        // let endDateFormat = endDate.getFullYear() + "-" + Number(endDate.getMonth() + 1) + "-" + endDate.getDate()
        // // console.log(endDateFormat)
        // let date = startDateFormat + "," + endDateFormat
        // this.leavehistoryservice.getUserHistory(date).subscribe({
        //     next: (res: any) => {
        //         // console.log(res.data)
        //         this.objdataTable = res.data.leave_online
        //     },
        //     error: (err: any) => {

        //     }
        // })
    }

}
