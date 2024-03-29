import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';
import { DetailViewRequestService } from './detail-view-request.service';
import { read } from 'xlsx';

@Component({
    selector: 'app-detail-view-request',
    templateUrl: './detail-view-request.component.html',
    styleUrls: ['./detail-view-request.component.css']
})
export class DetailViewRequestComponent implements OnInit {

    constructor(private router: ActivatedRoute, private serviceDetail: DetailViewRequestService, private _location: Location, private route: Router) { }

    rvac_id: any
    objProfile: any
    baseURL = environment.apiURL;

    role: any = localStorage.getItem('roleUser')

    stateLeave: any

    approve_req: any

    ownerCheck: any

    approve_reqs: any

    APISuccess: boolean = false

    backClicked() {
        this._location.back();
    }

    ngOnInit() {
        this.rvac_id = this.router.snapshot.params['id'];
        this.serviceDetail.getDetail(this.rvac_id).subscribe({
            next: (res: any) => {
                this.objProfile = res.data.req_vacations
                this.approve_req = res.data.approve_req
                this.approve_reqs = res.data.approve_reqs
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
    storageURL: any = environment.storageURL;

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
            if (e.isConfirmed) {
                this.serviceDetail.approveRequest(this.rvac_id).subscribe({
                    next: (res: any) => {
                        this.backClicked()
                    },
                    error: (err: any) => { }
                })
            }
        })
    }

    disapproveRequest() {
        Swal.fire({
            title: `<strong style = "font-family:Kanit"> คุณต้องการไม่อนุมัติการลา <br> จาก ${this.objProfile.ud_fullname_th} <br> แผนก ${this.objProfile.department} </strong>`,
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
                                resolve('<div style = "font-family:Kanit"> กรุณากรอกข้อมูล </div>')
                            }
                        })
                    }
                })

                if (reason) {
                    this.serviceDetail.disapproveRequest(this.rvac_id, reason).subscribe({
                        next: (res: any) => {
                            this.backClicked()
                        },
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

    async cancelVacation() {

        const { value: reason } = await Swal.fire({
            title: '<div style = "font-family:Kanit"> กรุณากรอกเหตุผลยกเลิกการลา </div>',
            input: 'select',
            inputOptions: {
                "ต้องการเปลี่ยนแปลงวันลา": 'ต้องการเปลี่ยนแปลงวันลา',
                "สามารถทำธุระในวันหยุดแทนได้": 'สามารถทำธุระในวันหยุดแทนได้',
                "มีความจำเป็นต้องทำงานในวันที่ลา": 'มีความจำเป็นต้องทำงานในวันที่ลา',
                "ไม่ต้องการลา": 'ไม่ต้องการลา',
                "อื่น ๆ (กดตกลงเพื่อกรอกเหตุผล)": 'อื่น ๆ (กดตกลงเพื่อกรอกเหตุผล)',
            },
            inputPlaceholder: 'เลือกเหตุผลการยกเลิกลา',
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
                        resolve('<div style = "font-family:Kanit"> กรุณากรอกข้อมูล </div>')
                    }
                })
            }
        })
        let elsereason = reason
        if (reason == "อื่น ๆ (กดตกลงเพื่อกรอกเหตุผล)") {
            let { value: reason } = await Swal.fire({
                title: '<strong style = "font-family:Kanit"> กรุณากรอกเหตุผลยกเลิกการลา </strong>',
                input: 'textarea',
                html: '<strong style = "font-family:Kanit; font-size:16px"> เหตุผลยกเลิกการลา* </strong>',
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
                            resolve('<div style = "font-family:Kanit"> กรุณากรอกข้อมูล </div>')
                        }
                    })
                }
            })

            if (reason) {

                this.serviceDetail.cancelVacation(this.rvac_id, reason).subscribe({
                    next: (res: any) => {
                        this.backClicked()
                    },
                    error: (err: any) => { }
                })

            }

        } else {
            this.serviceDetail.cancelVacation(this.rvac_id, elsereason).subscribe({
                next: (res: any) => {
                    this.backClicked()
                },
                error: (err: any) => { }
            })
        }
    }
}
