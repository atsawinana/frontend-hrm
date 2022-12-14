import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
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

    ApiSuccess:boolean = false

    ngOnInit() {
        this.notiservice.getLeaveNoti().subscribe({
            next: (res: any) => {
                this.objDataNoti = res.data
                this.ApiSuccess = true
            },
            error: (error: any) => { },
        })

    }

    NavigateToLeave(id:any){
        this.router.navigate([`/main/leave/view-request-detail/${id}`]);
    }

    clearLeaveNoti(){

        Swal.fire({
            title: `<strong style = "font-family:Kanit"> คุณต้องการล้างการแจ้งเตือนหรือไม่ </strong>`,
            icon: 'question',
            showCancelButton: true,
            cancelButtonColor: '#d33',
            cancelButtonText: '<div style = "font-family:Kanit"> ยกเลิก </div>',
            confirmButtonText: '<div style = "font-family:Kanit"> ตกลง </div>',
            confirmButtonColor: '#005FBC',
            reverseButtons: true,
        }).then((e) => {
            if(e.isConfirmed){
                this.notiservice.clearLeaveNoti().subscribe({
                    next: (res: any) => {
                        location.reload()
                    },
                    error: (error: any) => { },
                })
            }else{
                return
            }
        })

    }
}
