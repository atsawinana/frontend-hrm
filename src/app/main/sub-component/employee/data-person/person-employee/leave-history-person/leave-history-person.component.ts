import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { DataPersonService } from '../../data-person.service';
import { defineLocale, thBeLocale } from 'ngx-bootstrap/chronos';

@Component({
    selector: 'app-leave-history-person',
    templateUrl: './leave-history-person.component.html',
    styleUrls: ['./leave-history-person.component.css']
})
export class LeaveHistoryPersonComponent implements OnInit {

    constructor(private service: DataPersonService, private localeService: BsLocaleService, public datepipe: DatePipe,) { }
    locale = 'th';
    date: any
    objTable: any
    empid:any = localStorage.getItem("empPerson")
    
    ngOnInit() {

        defineLocale('th', thBeLocale);
        this.localeService.use(this.locale);

        this.service.getHistory(this.empid, "").subscribe({
            next: (res: any) => {
                // console.log(res.data)
                this.objTable = res.data.leave_online
                let startDate = new Date()
                this.date = startDate

            },
            error: (err: any) => {
            },
        })
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
        let startDate = this.datepipe.transform(this.date, 'yyyy-MM-dd')

        let arydate1 = startDate!.toString().split("-")
        // console.log("test1", arydate1)
        arydate1[0] = (Number(arydate1[0]) + 543).toString()


        let date = arydate1[0] + "-" + arydate1[1]

        this.service.getHistory(this.empid, date).subscribe({
            next: (res: any) => {
                // console.log(res.data)
                this.objTable = res.data.leave_online
            },
            error: (err: any) => {
            },
        })
    }

}
