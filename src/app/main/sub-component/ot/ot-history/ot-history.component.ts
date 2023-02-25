import { Component, OnInit } from '@angular/core';
import { DatePipe, Location } from '@angular/common';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale, thBeLocale } from 'ngx-bootstrap/chronos';
import { PaginationInstance } from 'ngx-pagination';
import { OtService } from '../ot.service';

@Component({
    selector: 'app-ot-history',
    templateUrl: './ot-history.component.html',
    styleUrls: ['./ot-history.component.css']
})
export class OtHistoryComponent implements OnInit {

    constructor(private _location: Location, public datepipe: DatePipe, private localeService: BsLocaleService, private otService: OtService) { }

    listPerPage: any = 10
    objTableHistory: any = [];
    date: any = ""
    checkState: boolean = true
    ngOnInit() {
        defineLocale('th', thBeLocale);
        this.localeService.use('th');
        this.otService.requestOvertimeHistory("").subscribe({
            next: (res: any) => {
                this.objTableHistory = res.data.req_overtimes
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
        this.config.currentPage = 1
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
        this.otService.requestOvertimeHistory(date).subscribe({
            next: (res: any) => {
                // console.log(res.data)
                this.objTableHistory = res.data.req_overtimes
            },
            error: (err: any) => {

            }
        })
    }

}
