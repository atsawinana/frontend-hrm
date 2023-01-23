import { Component, OnInit } from '@angular/core';
import { PaginationInstance } from 'ngx-pagination';
import { Location } from '@angular/common';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale, thBeLocale } from 'ngx-bootstrap/chronos';

@Component({
  selector: 'app-timeattendance-history-all',
  templateUrl: './timeattendance-history-all.component.html',
  styleUrls: ['./timeattendance-history-all.component.css']
})
export class TimeattendanceHistoryAllComponent implements OnInit {

    constructor(private _location: Location,private localeService: BsLocaleService) { }

    ary: any = [1, 2, 3]
    listPerPage: any = 10
    date:any


    ngOnInit() {
        defineLocale('th', thBeLocale);
        this.localeService.use('th');
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

    onOpenCalendar(container: any) {
        container.monthSelectHandler = (event: any): void => {
            container._store.dispatch(container._actions.select(event.date));
        };
        container.setViewMode('month');
    }


    sortdate() {
        if (this.date == "" || this.date == null)
            return
        // console.log(this.date)
        // let startDate = this.datepipe.transform(this.date, 'yyyy-MM-dd')

        // let arydate1 = startDate!.toString().split("-")
        // // console.log("test1", arydate1)
        // arydate1[0] = (Number(arydate1[0]) + 543).toString()


        // let date = arydate1[0] + "-" + arydate1[1]

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
