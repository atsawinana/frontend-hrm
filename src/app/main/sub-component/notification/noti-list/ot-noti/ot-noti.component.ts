import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { NotiService } from '../../noti.service';

@Component({
    selector: 'app-ot-noti',
    templateUrl: './ot-noti.component.html',
    styleUrls: ['./ot-noti.component.css']
})
export class OtNotiComponent implements OnInit {


    constructor(private notiservice: NotiService, private router: Router) { }

    objDataNoti: any
    baseURL = environment.apiURL;

    ApiSuccess: boolean = false
    storageURL: any = environment.storageURL;

    ngOnInit() {
        this.notiservice.getnotificationOverTime().subscribe({
            next: (res: any) => {
                this.objDataNoti = res.data
                console.log(this.objDataNoti)
                this.ApiSuccess = true
            },
            error: (error: any) => { },
        })

    }

    NavigateToOT(id: any, noti_id: any) {

        this.notiservice.updateHasSeen(noti_id).subscribe({
            next: (res: any) => {
            },
            error: (error: any) => { },
        })

        this.router.navigate([`/main/leave/view-request-detail/${id}`]);
    }

    clearOTNoti() {

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
            if (e.isConfirmed) {
                this.notiservice.clearOTNoti().subscribe({
                    next: (res: any) => {
                        location.reload()
                    },
                    error: (err: any) => { }
                })
            } else {

            }
        })

    }
}
