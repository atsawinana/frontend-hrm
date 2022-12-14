import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { defineLocale, thBeLocale } from 'ngx-bootstrap/chronos';
import Swal from 'sweetalert2';
import { LeaveEditRequestService } from './leave-edit-request.service';
import { LeaveService } from '../leave.service';
import { Location } from '@angular/common';

@Component({
    selector: 'app-leave-edit-request',
    templateUrl: './leave-edit-request.component.html',
    styleUrls: ['./leave-edit-request.component.css']
})
export class LeaveEditRequestComponent implements OnInit {

    constructor(
        private localeService: BsLocaleService,
        private editService: LeaveEditRequestService,
        public datepipe: DatePipe,
        private router: ActivatedRoute,
        private leaveservice: LeaveService,
        private _location: Location
    ) { }
    leaveRequest = new FormGroup({
        leaveType: new FormControl(null, [Validators.required]),
        startDate: new FormControl('', [Validators.required]),
        endDate: new FormControl(''),
        duration: new FormControl(null, [Validators.required]),
        detail: new FormControl('', [
            Validators.required,
            this.noWhitespaceValidator,
        ]),
    });

    backClicked() {
        this._location.back();
    }

    noWhitespaceValidator(control: FormControl) {
        const isWhitespace = (control.value || '').trim().length === 0;
        const isValid = !isWhitespace;
        return isValid ? null : { whitespace: true };
    }

    locale = 'th';
    today!: Date;
    amount: string = "0 วัน 0 ชั่วโมง";
    summited: boolean = false;
    LeavesDays: any;
    rvac_id: string = this.router.snapshot.params['id'];

    APISuccess: boolean = false

    objDateVerify: any
    datesum: any = ""

    objData: any

    date = {
        dateStart: "",
        dateEnd: ""
    }

    ngOnInit() {
        this.getVacation()
        this.today = new Date();
        defineLocale('th', thBeLocale);
        this.localeService.use(this.locale);

        this.editService.showReverseVacation(this.rvac_id).subscribe({
            next: (res: any) => {
                this.objData = res.data
                this.leaveRequest.controls.leaveType.setValue(this.objData.rvac_type)
                this.leaveRequest.controls.startDate.setValue(this.objData.rvac_date_start)
                this.leaveRequest.controls.endDate.setValue(this.objData.rvac_date_end)
                this.objData.rvac_duration = 1
                this.leaveRequest.controls.duration.setValue(this.objData.rvac_duration)
                this.leaveRequest.controls.detail.setValue(this.objData.rvac_detail)
                console.log(res.data)
                this.countEditDays()
                this.verifydateinit()
                this.APISuccess = true
            },
            error: (err: any) => {
            }
        });

    }

    getVacation() {
        this.editService.getVacationType().subscribe({
            next: (res: any) => {
                this.LeavesDays = res.data.leaveDays;
            },
            error: (res: any) => {

            }
        });
    }
    changeDate(date: any) {
        let ary = date!.toString().split("/")
        ary[2] = (Number(ary[2]) - 543).toString()
        date = ary[1] + "-" + ary[0] + "-" + ary[2]
        return date
    }

    countEditDays() {

        let amount_hours = 0, amount_days = 0, diff;
        let startDateS = this.leaveRequest.controls.startDate.value;//String Value
        let endDateS = this.leaveRequest.controls.endDate.value;//String Value
        let duration = this.leaveRequest.controls.duration.value;
        startDateS = this.changeDate(startDateS!)
        endDateS = this.changeDate(endDateS!)
        //User is input strat date.
        if (startDateS != null) {
            //User is input end. 
            if (endDateS) {
                let startDate = new Date(startDateS);//Change string to Date
                let endDate = new Date(endDateS);//Change string to Date
                //leave morning
                if (duration == "1") {
                    diff = (endDate.getTime() - startDate.getTime());
                    amount_days = Math.ceil(diff / (1000 * 60 * 60 * 24));
                    amount_hours = 4;
                }
                //leave all the days
                else {
                    diff = (endDate.getTime() - startDate.getTime());
                    amount_days = Math.ceil(diff / (1000 * 60 * 60 * 24)) + 1;
                    amount_hours = 0;
                }
            }
            //User is not input end.
            else {
                if (duration == "3") {
                    amount_days = 1;
                    amount_hours = 0;
                }
                else {
                    amount_days = 0;
                    amount_hours = 4;
                }
            }
        }
        this.amount = amount_days + " วัน " + amount_hours + " ชั่วโมง";

    }

    countDays() {

        let amount_hours = 0, amount_days = 0, diff;
        let startDateS = this.leaveRequest.controls.startDate.value;//String Value
        let endDateS = this.leaveRequest.controls.endDate.value;//String Value
        let duration = this.leaveRequest.controls.duration.value;
        if (this.date.dateStart == "") {
            startDateS = this.changeDate(startDateS!)
        }
        if (this.date.dateEnd == "") {
            endDateS = this.changeDate(endDateS!)
        }
        //User is input strat date.
        if (startDateS != null) {
            //User is input end. 
            if (endDateS) {
                let startDate = new Date(startDateS);//Change string to Date
                let endDate = new Date(endDateS);//Change string to Date
                //leave morning
                if (duration == "1" || duration == "2") {
                    diff = (endDate.getTime() - startDate.getTime());
                    amount_days = Math.ceil(diff / (1000 * 60 * 60 * 24));
                    amount_hours = 4;
                }
                //leave all the days
                else {
                    diff = (endDate.getTime() - startDate.getTime());
                    amount_days = Math.ceil(diff / (1000 * 60 * 60 * 24)) + 1;
                    amount_hours = 0;
                }
            }
            //User is not input end.
            else {
                if (duration == "3") {
                    amount_days = 1;
                    amount_hours = 0;
                }
                else {
                    amount_days = 0;
                    amount_hours = 4;
                }
            }
        }
        this.amount = amount_days + " วัน " + amount_hours + " ชั่วโมง";

    }

    onValueChangeDateStart() {
        let startDate = this.datepipe.transform(this.leaveRequest.controls.startDate.value, 'yyyy-MM-dd');

        let arydate1 = startDate!.toString().split("-")

        arydate1[0] = (Number(arydate1[0]) + 543).toString()


        let date = arydate1.toString().replace(",", "-")
        date = date?.replace(",", "-")

        this.date.dateStart = date!

    }

    onValueChangeDateEnd() {

        let endDate = this.datepipe.transform(this.leaveRequest.controls.endDate.value, 'yyyy-MM-dd');
        let arydate1 = endDate!.toString().split("-")

        arydate1[0] = (Number(arydate1[0]) + 543).toString()


        let date = arydate1.toString().replace(",", "-")
        date = date?.replace(",", "-")

        this.date.dateEnd = date!

    }

    resendRequest() {

        if (this.leaveRequest.invalid)
            return;

        if (this.date.dateStart == "") {
            let tempdate = this.leaveRequest.controls.startDate.value?.toString().split("/")
            let date = tempdate?.reverse().toString().replace(",", "-")
            date = date?.replace(",", "-")
            this.date.dateStart = date!
        } else {
        }

        if (this.date.dateEnd == "") {
            let tempdate = this.leaveRequest.controls.endDate.value?.toString().split("/")
            let date = tempdate?.reverse().toString().replace(",", "-")
            date = date?.replace(",", "-")
            this.date.dateEnd = date!
        } else {
        }

        if (this.objDateVerify.stautus == false) {
            Swal.fire({
                title: '<strong style = "font-family:Kanit"> วันลาของคุณไม่เพียงพอ </strong>',
                icon: 'warning',
                showConfirmButton: false,
                timer: 1500
            })
            return
        }

        Swal.fire({
            title: '<strong style = "font-family:Kanit"> คุณต้องการส่งแบบฟอร์มการลา ใช่หรือไม่ </strong>',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#d33',
            cancelButtonText: '<div style = "font-family:Kanit"> ยกเลิก </div>',
            confirmButtonText: '<div style = "font-family:Kanit"> ตกลง </div>',
            confirmButtonColor: '#005FBC',
            reverseButtons: true,
        }).then((e) => {
            if (e.isConfirmed) {
                this.editService.resendRequest(
                    this.rvac_id, this.leaveRequest.controls.leaveType.value, this.date.dateStart, this.date.dateEnd, this.leaveRequest.controls.duration.value, this.leaveRequest.controls.detail.value
                ).subscribe({
                    next: (res: any) => {
                        this.backClicked()
                    },
                    error: (res: any) => {
                    }
                });
            }
        })
    }

    verifydate() {

        if (this.leaveRequest.controls.leaveType.invalid
            || this.leaveRequest.controls.startDate.invalid
            || this.leaveRequest.controls.endDate.invalid
            || this.leaveRequest.controls.duration.invalid
        ) {
            return
        }

        this.leaveservice.getVerify(this.leaveRequest.controls.leaveType.value,
            this.date.dateStart,
            this.date.dateEnd,
            this.leaveRequest.controls.duration.value,
        ).subscribe({
            next: (res: any) => {
                this.objDateVerify = res.data
                this.datesum = this.objDateVerify.sum_time
            },
            error: (res: any) => {

            }
        })
    }

    verifydateinit() {

        if (this.date.dateStart == "") {
            let tempdate = this.leaveRequest.controls.startDate.value?.toString().split("/")
            let date = tempdate?.reverse().toString().replace(",", "-")
            date = date?.replace(",", "-")
            this.date.dateStart = date!
        } else {
        }

        if (this.date.dateEnd == "") {
            let tempdate = this.leaveRequest.controls.endDate.value?.toString().split("/")
            let date = tempdate?.reverse().toString().replace(",", "-")
            date = date?.replace(",", "-")
            this.date.dateEnd = date!
        } else {
        }

        if (this.leaveRequest.controls.leaveType.invalid
            || this.leaveRequest.controls.startDate.invalid
            || this.leaveRequest.controls.endDate.invalid
            || this.leaveRequest.controls.duration.invalid
        ) {
            return
        }

        this.leaveservice.getVerify(this.leaveRequest.controls.leaveType.value,
            this.date.dateStart,
            this.date.dateEnd,
            this.leaveRequest.controls.duration.value,
        ).subscribe({
            next: (res: any) => {
                this.objDateVerify = res.data
                this.datesum = this.objDateVerify.sum_time
                console.log(this.objDateVerify)
            },
            error: (res: any) => {

            }
        })
    }

}



