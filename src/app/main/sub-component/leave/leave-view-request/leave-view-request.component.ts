import { Component, OnInit } from '@angular/core';
import { LeaveViewRequestService } from './leave-view-request.service';

@Component({
  selector: 'app-leave-view-request',
  templateUrl: './leave-view-request.component.html',
  styleUrls: ['./leave-view-request.component.css']
})
export class LeaveViewRequestComponent implements OnInit {

  constructor(private leaveviewreqest: LeaveViewRequestService) { }

  objDataLeave:any

  APISuccess:boolean = false

  ngOnInit() {
    this.leaveviewreqest.getAllshowUnapproved().subscribe({
        next: (res:any) => {
            // console.log(res.data)
            this.objDataLeave = res.data.request_vacation
            this.APISuccess = true
            console.log(this.objDataLeave)
        },
        error: (err:any) => {}
    })
  }

}
