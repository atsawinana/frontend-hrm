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

    ngOnInit() {
        defineLocale('th', thBeLocale);
        this.localeService.use('th');
        this.otService.requestOvertimeHistory().subscribe({
            next: (res: any) => { },
            error: (err: any) => { }
        })
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
        this._location.back();
    }

    onOpenCalendar(container: any) {
        container.monthSelectHandler = (event: any): void => {
            container._store.dispatch(container._actions.select(event.date));
        };
        container.setViewMode('month');
    }

    sortdate() {
        // if (this.date == "" || this.date == null)
        //     return
        // console.log(this.date)
        // let startDate = this.datepipe.transform(this.date, 'yyyy-MM-dd')

        // let arydate1 = startDate!.toString().split("-")
        // // console.log("test1", arydate1)
        // arydate1[0] = (Number(arydate1[0]) + 543).toString()


        // let date = arydate1[0] + "-" + arydate1[1]

        // this.serviceTimeatd.requestAttendanceHistory(date).subscribe({
        //     next: (res: any) => {
        //         this.objTableHistory = res.data.req_time_attendances
        //     },
        //     error: (err: any) => { }
        // })
    }

}
