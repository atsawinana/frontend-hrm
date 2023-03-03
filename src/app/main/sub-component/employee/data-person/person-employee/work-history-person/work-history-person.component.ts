import { Component, OnInit } from '@angular/core';
import { DataPersonService } from '../../data-person.service';

@Component({
  selector: 'app-work-history-person',
  templateUrl: './work-history-person.component.html',
  styleUrls: ['./work-history-person.component.css']
})
export class WorkHistoryPersonComponent implements OnInit {

  constructor(private service: DataPersonService,) { }
  locale = 'th';
  date: any
  objTable: any
  empid: any = localStorage.getItem("empPerson")

  ngOnInit() {
    this.service.getHistoryRequestAttendance(this.empid, "").subscribe({
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

}
