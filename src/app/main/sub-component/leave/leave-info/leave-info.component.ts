import { Component, OnInit } from '@angular/core';
import { LeaveInfoService } from './leave-info.service';

@Component({
  selector: 'app-leave-info',
  templateUrl: './leave-info.component.html',
  styleUrls: ['./leave-info.component.css']
})
export class LeaveInfoComponent implements OnInit {
  constructor(private leaveService: LeaveInfoService) {}

  objLeaveInfo: any;
  ApiSuccess:boolean = false;

  ngOnInit() {
    this.leaveService.getAllInfo().subscribe({
      next: (res: any) => {
        this.objLeaveInfo = res.data;
        console.log(this.objLeaveInfo)

        this.ApiSuccess = true;
      },
      error: (err: any) => {},
    });


  }



}
