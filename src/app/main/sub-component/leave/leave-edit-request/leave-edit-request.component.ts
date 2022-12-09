import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { Router } from '@angular/router';
import { LeaveRequestService } from '../leave-request/leave-request.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { defineLocale, thBeLocale } from 'ngx-bootstrap/chronos';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-leave-edit-request',
    templateUrl: './leave-edit-request.component.html',
    styleUrls: ['./leave-edit-request.component.css']
})
export class LeaveEditRequestComponent implements OnInit {

    constructor(
        private localeService: BsLocaleService,
        private LeaveReqService: LeaveRequestService,
        public datepipe: DatePipe,
        private route: Router
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
    locale = 'th';
    today!: Date;
    amount: string = "0 วัน 0 ชั่วโมง";
    summited: boolean = false;
    LeavesDays: any;

    gender = localStorage.getItem('ud_gender_id');




    ngOnInit() {
        this.today = new Date();
        defineLocale('th', thBeLocale);
        this.localeService.use(this.locale);
        this.getVacation();
    }
    
    checkCancel() {
        Swal.fire({
            title:
                '<strong style = "font-family:Kanit"> คุณต้องการส่งยกเลิกการส่งแบบฟอร์มการลา ใช่หรือไม่ </strong>',
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
    checkNull() {
        this.summited = true;
        let startDate = this.datepipe.transform(
            this.leaveRequest.controls.startDate.value,
            'yyyy-MM-dd'
        );

        let endDate = this.datepipe.transform(
            this.leaveRequest.controls.endDate.value,
            'yyyy-MM-dd'
        );
        if (this.leaveRequest.invalid)
            return;



        Swal.fire({
            title:
                '<strong style = "font-family:Kanit"> คุณต้องการส่งแบบฟอร์มการลา ใช่หรือไม่ </strong>',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#d33',
            cancelButtonText: '<div style = "font-family:Kanit"> ยกเลิก </div>',
            confirmButtonText: '<div style = "font-family:Kanit"> ตกลง </div>',
            confirmButtonColor: '#005FBC',
            reverseButtons: true,

        }).then((result) => {
            if (result.isConfirmed) {
                this.LeaveReqService
                    .addLeaveRequest(
                        this.leaveRequest.controls.leaveType.value!,
                        this.leaveRequest.controls.startDate.value!,
                        this.leaveRequest.controls.endDate.value,
                        this.leaveRequest.controls.duration.value!,
                        this.leaveRequest.controls.detail.value!
                    )

                    .subscribe({
                        next: (res: any) => {
                            console.log('success');
                            this.route.navigate(['../main/leave']);
                        },
                    });

            }
        });
    }

    noWhitespaceValidator(control: FormControl) {
        const isWhitespace = (control.value || '').trim().length === 0;
        const isValid = !isWhitespace;
        return isValid ? null : { whitespace: true };
    }

    countDays() {
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
    getGender() {
        if (this.gender == "1") {
            return 1;
        }
        else {
            return 2;
        }
    }

    getVacation() {
        this.LeaveReqService.getVacationType().subscribe({
            next: (res: any) => {
                this.LeavesDays = res.data.leaveDays;
                console.log(this.LeavesDays);
            },
            error: (res: any) => {

            }
        });

    }
}
