import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { NotiService } from '../../noti.service';

@Component({
    selector: 'app-leave-noti',
    templateUrl: './leave-noti.component.html',
    styleUrls: ['./leave-noti.component.css']
})
export class LeaveNotiComponent implements OnInit {


    constructor(private notiservice: NotiService,private router: Router) { }

    objDataNoti: any
    baseURL = environment.apiURL;

    ngOnInit() {
        this.notiservice.getLeaveNoti().subscribe({
            next: (res: any) => {
                console.log(res.data)
                this.objDataNoti = res.data
            },
            error: (error: any) => { },
        })

    }

    NavigateToLeave(id:any){
        this.router.navigate([`/main/leave/view-request-detail/${id}`]);
    }

    clearLeaveNoti(){
        this.notiservice.clearLeaveNoti().subscribe({
            next: (res: any) => {
            },
            error: (error: any) => { },
        })
    }
}
