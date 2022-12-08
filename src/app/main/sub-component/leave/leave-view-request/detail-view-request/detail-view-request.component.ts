import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';
import { DetailViewRequestService } from './detail-view-request.service';

@Component({
    selector: 'app-detail-view-request',
    templateUrl: './detail-view-request.component.html',
    styleUrls: ['./detail-view-request.component.css']
})
export class DetailViewRequestComponent implements OnInit {

    constructor(private router: ActivatedRoute, private serviceDetail: DetailViewRequestService, private _location: Location) { }

    rvac_id: any
    objProfile: any
    baseURL = environment.apiURL;

    stateLeave: any

    approve_req: any

    ownerCheck: any

    APISuccess: boolean = false

    backClicked() {
        this._location.back();
    }

    ngOnInit() {
        this.rvac_id = this.router.snapshot.params['id'];
        console.log("this.rvac_id", this.rvac_id)
        this.serviceDetail.getDetail(this.rvac_id).subscribe({
            next: (res: any) => {
                console.log(res.data)
                this.objProfile = res.data.req_vacations
                this.approve_req = res.data.approve_reqs
                this.stateLeave = res.data.state
                this.ownerCheck = res.data.owner
                this.APISuccess = true
            },
            error: (err: any) => { }
        })
    }

    //     คุณต้องการอนุมัติการลา
    // จาก สหรัฐ เมืองดี 
    // แผนก Designer หรือไม่? 

    approveRequest() {

        Swal.fire({
            title: `<strong style = "font-family:Kanit"> คุณต้องการอนุมัติการลา <br> จาก ${this.objProfile.ud_fullname_th} <br> แผนก ${this.objProfile.department} </strong>`,
            icon: 'question',
            showCancelButton: true,
            cancelButtonColor: '#d33',
            cancelButtonText: '<div style = "font-family:Kanit"> ยกเลิก </div>',
            confirmButtonText: '<div style = "font-family:Kanit"> ตกลง </div>',
            confirmButtonColor: '#005FBC',
            reverseButtons: true,
        }).then((e) => {
            this.serviceDetail.approveRequest(this.rvac_id).subscribe({
                next: (res: any) => {
                },
                error: (err: any) => { }
            })
        })
    }

    disapproveRequest() {
        Swal.fire({
            title: `<strong style = "font-family:Kanit"> คุณต้องการอนุมัติการลา <br> จาก ${this.objProfile.ud_fullname_th} <br> แผนก ${this.objProfile.department} </strong>`,
            icon: 'question',
            showCancelButton: true,
            cancelButtonColor: '#d33',
            cancelButtonText: '<div style = "font-family:Kanit"> ยกเลิก </div>',
            confirmButtonText: '<div style = "font-family:Kanit"> ตกลง </div>',
            confirmButtonColor: '#005FBC',
            reverseButtons: true,
        }).then(async (e) => {
            if (e.isConfirmed) {
                let { value: reason } = await Swal.fire({
                    title: '<strong style = "font-family:Kanit"> กรุณากรอกเหตุผลไม่อนุมัติการลา </strong>',
                    input: 'textarea',
                    html: '<strong style = "font-family:Kanit; font-size:16px"> เหุผลไม่อนุมัติการลา* </strong>',
                    inputPlaceholder: 'กรอกข้อมูล',
                    inputAttributes: {
                        'aria-label': 'Type your message here'
                    },
                    showCancelButton: true,
                    cancelButtonColor: '#d33',
                    cancelButtonText: '<div style = "font-family:Kanit"> ยกเลิก </div>',
                    confirmButtonText: '<div style = "font-family:Kanit"> ตกลง </div>',
                    confirmButtonColor: '#005FBC',
                    reverseButtons: true,
                })

                if (reason) {
                    console.log("reason", reason)
                    this.serviceDetail.disapproveRequest(this.rvac_id, reason).subscribe({
                        next: (res: any) => { },
                        error: (err: any) => { }
                    })
                }
            }

            // this.serviceDetail.disapproveRequest(this.rvac_id).subscribe({
            //     next: (res: any) => {
            //     },
            //     error: (err: any) => { }
            // })
        })
    }

    cancelVacation() {
        this.serviceDetail.cancelVacation(this.rvac_id).subscribe({
            next: (res: any) => {},
            error: (err: any) => {}
        })
    }

    cancelVacationOnApprove(reason: any) {
        this.serviceDetail.cancelVacationOnApprove(this.rvac_id, reason).subscribe({
            next: (res: any) => {},
            error: (err: any) => {}
        })
    }
}
