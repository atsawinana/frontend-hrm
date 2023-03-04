import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { defineLocale, thBeLocale } from 'ngx-bootstrap/chronos';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { DataPersonService } from '../../data-person.service';

@Component({
  selector: 'app-ot-history-person',
  templateUrl: './ot-history-person.component.html',
  styleUrls: ['./ot-history-person.component.css']
})
export class OtHistoryPersonComponent implements OnInit {

  constructor(private service: DataPersonService, private localeService: BsLocaleService, public datepipe: DatePipe,) { }
  locale = 'th';
  date: any
  objTable: any
  empid: any = localStorage.getItem("empPerson")
  checkState:boolean = true
  ngOnInit() {

    defineLocale('th', thBeLocale);
    this.localeService.use(this.locale);

    this.service.getHistoryRequestOvertime(this.empid, "").subscribe({
      next: (res: any) => {
        // console.log(res.data)
        this.objTable = res.data.req_overtimes
        this.checkState = false
      },
      error: (err: any) => {
      },
    })
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
    this.service.getHistoryRequestOvertime(this.empid, date).subscribe({
      next: (res: any) => {
        // console.log(res.data)
        this.objTable = res.data.req_overtimes
      },
      error: (err: any) => {
      },
    })
  }


}
