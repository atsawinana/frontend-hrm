import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { TimeAttendanceService } from '../time-attendance.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-timeattendance-view-request',
    templateUrl: './timeattendance-view-request.component.html',
    styleUrls: ['./timeattendance-view-request.component.css']
})
export class TimeattendanceViewRequestComponent implements OnInit {

    constructor(private route: ActivatedRoute, private _location: Location, private serviceTimeatd: TimeAttendanceService) { }

    storageURL = environment.apiURL
    ary: any = [1, 2, 3]
    id: any
    objDetailReq: any
    owner: boolean = false;
    aryApprove: any
    ngOnInit() {
        this.id = this.route.snapshot.params['id'];
        this.serviceTimeatd.getDetailsRequestAttendances(this.id).subscribe({
            next: (res: any) => {
                this.objDetailReq = res.data.req_attendances
                this.aryApprove = res.data.approve_reqs
                this.owner = res.data.owner
            },
            error: (err: any) => { }
        })
    }

    backClicked() {
        this._location.back();
    }

    disapproveRequest() {

        Swal.fire({
            title: `<strong style = "font-family:Kanit"> คุณต้องการไม่อนุมัติการลา <br> จาก ${this.objDetailReq.ud_fullname_th} <br> แผนก ${this.objDetailReq.department} </strong>`,
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
                    html: '<strong style = "font-family:Kanit; font-size:16px"> เหตุผลไม่อนุมัติการลา* </strong>',
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
                    customClass: {
                        input: 'font-custom-select'
                    },
                    inputValidator: (value) => {
                        return new Promise((resolve) => {
                            if (value.trim() != "") {
                                resolve("")
                            } else {
                                resolve('กรุณากรอกข้อมูล')
                            }
                        })
                    }
                })

                if (reason) {
                    this.serviceTimeatd.disapproveRequestAttendance(this.id, reason).subscribe({
                        next: (res: any) => {
                            this.backClicked();
                        },
                        error: (err: any) => { }
                    })
                }
            }
        })
    }

    approveRequest() {

        Swal.fire({
            title: `<strong style = "font-family:Kanit"> คุณต้องการอนุมัติการลา <br> จาก ${this.objDetailReq.ud_fullname_th} <br> แผนก ${this.objDetailReq.department} </strong>`,
            icon: 'question',
            showCancelButton: true,
            cancelButtonColor: '#d33',
            cancelButtonText: '<div style = "font-family:Kanit"> ยกเลิก </div>',
            confirmButtonText: '<div style = "font-family:Kanit"> ตกลง </div>',
            confirmButtonColor: '#005FBC',
            reverseButtons: true,
        }).then((e) => {
            if (e.isConfirmed) {
                this.serviceTimeatd.approveRequestAttendance(this.id).subscribe({
                    next: (res: any) => {
                        this.backClicked();
                    },
                    error: (err: any) => { }
                })
            }
        })
    }

}
