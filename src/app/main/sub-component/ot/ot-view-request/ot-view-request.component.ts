import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePipe, Location } from '@angular/common';
import { environment } from 'src/environments/environment';
import { OtService } from '../ot.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-ot-view-request',
    templateUrl: './ot-view-request.component.html',
    styleUrls: ['./ot-view-request.component.css']
})
export class OtViewRequestComponent implements OnInit {

    constructor(private route: ActivatedRoute, private _location: Location, private otService: OtService) { }
    id: any
    objDetailReq: any = ['1',]
    owner: any
    aryApprove: any = ['1',]
    storageURL = environment.apiURL
    ngOnInit() {
        this.id = this.route.snapshot.params['id'];
        this.otService.getDetailRequestOvertime(this.id).subscribe({
            next: (res: any) => {
                this.objDetailReq = res.data.req_overtimes
                this.aryApprove = res.data.approve_reqs
                this.owner = res.data.owner
            },
            error: (err: any) => { }
        })
    }

    backClicked() {
        this._location.back();
    }

    async cancelRequestOvertime() {

        const { value: reason } = await Swal.fire({
            title: '<div style = "font-family:Kanit"> กรุณากรอกเหตุผลยกเลิกการทำโอที </div>',
            input: 'select',
            inputOptions: {
                "ต้องการเปลี่ยนแปลงวันหรือเวลา": 'ต้องการเปลี่ยนแปลงวันหรือเวลา',
                "สามารถทำโอทีในเวลาทำงานปกติแทนได้": 'สามารถทำโอทีในเวลาทำงานปกติแทนได้',
                "มีธุระในเวลาที่ขอทำโอที": 'มีธุระในเวลาที่ขอทำโอที',
                "ส่งคำร้องซ้ำ": 'ส่งคำร้องซ้ำ',
                "อื่น ๆ (กดตกลงเพื่อกรอกเหตุผล)": 'อื่น ๆ (กดตกลงเพื่อกรอกเหตุผล)',
            },
            inputPlaceholder: 'เหตุผลการยกเลิกโอที*',
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

                this.otService.cancelRequestOvertime(this.id, reason).subscribe({
                    next: (res: any) => {
                        this.backClicked()
                    },
                    error: (err: any) => { }
                })

            }

        } else {
            this.otService.cancelRequestOvertime(this.id, elsereason).subscribe({
                next: (res: any) => {
                    this.backClicked()
                },
                error: (err: any) => { }
            })
        }
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
                this.otService.approvedRequestOvertime(this.id).subscribe({
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
                                resolve('<div style = "font-family:Kanit"> กรุณากรอกข้อมูล </div>')
                            }
                        })
                    }
                })

                if (reason) {
                    this.otService.disapprovedRequestOvertime(this.id, reason).subscribe({
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
}
