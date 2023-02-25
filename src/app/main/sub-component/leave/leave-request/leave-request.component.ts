import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale, thBeLocale } from 'ngx-bootstrap/chronos';
import { ActivatedRoute, Route, Router, RouterLink } from '@angular/router';
import { LeaveRequestService } from './leave-request.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { LeaveService } from '../leave.service';


@Component({
    selector: 'app-leave-request',
    templateUrl: './leave-request.component.html',
    styleUrls: ['./leave-request.component.css'],
})
export class LeaveRequestComponent implements OnInit {

    constructor(
        private localeService: BsLocaleService,
        private LeaveReqService: LeaveRequestService,
        public datepipe: DatePipe,
        private route: Router,
        private leaveservice: LeaveService
    ) { }
    leaveRequest = new FormGroup({
        leaveType: new FormControl(null, [Validators.required]),
        startDate: new FormControl('', [Validators.required]),
        endDate: new FormControl('' , [Validators.required]),
        duration: new FormControl(null, [Validators.required]),
        detail: new FormControl('', [
            Validators.required,
            this.noWhitespaceValidator,
        ]),
    });
    loadingapi:boolean = false
    locale = 'th';
    today!: Date;
    amount: string = "0 วัน 0 ชั่วโมง";
    summited: boolean = false;
    LeavesDays: any;
    objDateVerify: any
    datesum: any = ""
    APIsuccess:boolean = false

    minDate:any
    isDisabled:boolean = true

    gender = localStorage.getItem('ud_gender_id');

    date = {
        dateStart: "",
        dateEnd: ""
    }


    ngOnInit() {
        this.today = new Date();
        defineLocale('th', thBeLocale);
        this.localeService.use(this.locale);
        this.getVacation();
    }

    checkCancel() {
        Swal.fire({
            title:
                '<strong style = "font-family:Kanit"> คุณต้องการยกเลิกการส่งแบบฟอร์มการลา ใช่หรือไม่ </strong>',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#d33',
            cancelButtonText: '<div style = "font-family:Kanit"> ยกเลิก </div>',
            confirmButtonText: '<div style = "font-family:Kanit"> ตกลง </div>',
            confirmButtonColor: '#005FBC',
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                this.route.navigate(['../main/leave']);
            }
        });
    }

    // leaveType: new FormControl(null, [Validators.required]),
    //     startDate: new FormControl('', [Validators.required]),
    //     endDate: new FormControl(''),
    //     duration: new FormControl(null, [Validators.required]),
    //     detail: new FormControl('', [


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

    checkNull() {
        this.summited = true;

        if (this.leaveRequest.invalid)
            return;
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
        }).then((result) => {
            if (result.isConfirmed) {

                this.loadingapi = true

                this.LeaveReqService
                    .addLeaveRequest(
                        this.leaveRequest.controls.leaveType.value!,
                        this.date.dateStart,
                        this.date.dateEnd,
                        this.leaveRequest.controls.duration.value!,
                        this.leaveRequest.controls.detail.value!
                    ).subscribe({
                        next: (res: any) => {
                            this.loadingapi = false
                            this.route.navigate(['../main/leave']);
                        }, error: (err:any) => {
                            this.loadingapi = false
                          }
                    });
            }
        });
    }

    noWhitespaceValidator(control: FormControl) {
        const isWhitespace = (control.value || '').trim().length === 0;
        const isValid = !isWhitespace;
        return isValid ? null : { whitespace: true };
    }
    //User input start date and end date
    countDays() {
        let startDateS = this.leaveRequest.controls.startDate.value;//String Value
        let endDateS = this.leaveRequest.controls.endDate.value;//String Value
        let amount_days = 0, diff;
        //User input start date
        if (startDateS != null) {
            //User input end date
            if (endDateS) {
                let startDate = new Date(startDateS);//Change string to Date
                let endDate = new Date(endDateS);//Change string to Date
                diff = (endDate.getTime() - startDate.getTime());
                amount_days = Math.ceil(diff / (1000 * 60 * 60 * 24)) + 1;
            }
            //No input end date
            else {
                amount_days = 1;
            }
        }

        this.amount = amount_days + " วัน " + 0 + " ชั่วโมง";

    }
    //User input start date ,end date and duration
    countDaysAndDuration() {
        let amount_hours = 0, amount_days = 0, diff;
        let startDateS = this.leaveRequest.controls.startDate.value;//String Value
        let endDateS = this.leaveRequest.controls.endDate.value;//String Value
        let duration = this.leaveRequest.controls.duration.value;
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
                else if (duration == "3") {
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

    getVacation() {
        this.LeaveReqService.getVacationType().subscribe({
            next: (res: any) => {
                this.LeavesDays = res.data.leaveDays;
                this.APIsuccess = true
            },
            error: (res: any) => {

            }
        });
    }

    onValueChangeDateStart() {

        this.leaveRequest.controls.endDate.setValue(this.leaveRequest.controls.startDate.value)

        if(this.leaveRequest.controls.startDate.invalid){
            this.isDisabled = true
        }else{
            this.isDisabled = false
        }


        let startDate = this.datepipe.transform(this.leaveRequest.controls.startDate.value, 'yyyy-MM-dd');
        let mindate = this.datepipe.transform(this.leaveRequest.controls.startDate.value, 'MM-dd-yyyy');
        this.minDate = new Date(mindate!)
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


}
