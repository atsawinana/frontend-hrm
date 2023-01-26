import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale, thBeLocale } from 'ngx-bootstrap/chronos';
import { ActivatedRoute, Route, Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TimeAttendanceService } from '../time-attendance.service';
import { DatePipe } from '@angular/common';
import { Location } from '@angular/common';

@Component({
    selector: 'app-timeattendance-request',
    templateUrl: './timeattendance-request.component.html',
    styleUrls: ['./timeattendance-request.component.css']
})
export class TimeattendanceRequestComponent implements OnInit {

    constructor(
        private localeService: BsLocaleService,
        private route: Router,
        private timeatdService: TimeAttendanceService,
        private datepipe: DatePipe,
        private _location: Location
    ) { }

    locale = 'th';
    today!: Date;
    summited: boolean = false;

    time = {
        hours: 0,
        alerthours: false,
        mins: 0,
        alertmins: false,
    }
    Request = new FormGroup({
        Type: new FormControl(null, [Validators.required]),
        Date: new FormControl('', [Validators.required]),
        time: new FormControl('', [Validators.required]),
        detail: new FormControl('', [
            Validators.required,
            this.noWhitespaceValidator,
        ]),
    });

    ngOnInit() {
        this.today = new Date();
        defineLocale('th', thBeLocale);
        this.localeService.use(this.locale);
    }

    noWhitespaceValidator(control: FormControl) {
        const isWhitespace = (control.value || '').trim().length === 0;
        const isValid = !isWhitespace;
        return isValid ? null : { whitespace: true };
    }

    backClicked() {
        this._location.back();
    }

    checkCancel() {
        Swal.fire({
            title:
                '<strong style = "font-family:Kanit"> คุณต้องการยกเลิกแบบฟอร์มคำขอเข้าทำงาน ใช่หรือไม่ </strong>',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#d33',
            cancelButtonText: '<div style = "font-family:Kanit"> ยกเลิก </div>',
            confirmButtonText: '<div style = "font-family:Kanit"> ตกลง </div>',
            confirmButtonColor: '#005FBC',
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                this.route.navigate(['../main/timeattendance/home']);
            }
        });
    }


    upHours() {
        this.time.hours++

        if (this.time.hours > 24) {
            this.time.hours = 0
        }
    }

    downHours() {
        this.time.hours--

        if (this.time.hours < 0) {
            this.time.hours = 24
        }
    }

    upMins() {
        this.time.mins++

        if (this.time.mins > 60) {
            this.time.mins = 0
        }
    }

    downMins() {
        this.time.mins--

        if (this.time.mins < 0) {
            this.time.mins = 60
        }
    }

    showTimeBox() {
        var x = document.getElementById('timeBox');
        if (x?.style.display === 'none') {
            x.style.display = 'block';
        } else {

            if ((this.time.hours > 24 || this.time.hours < 0 || this.time.mins > 60 || this.time.mins < 0) || (this.time.hours == null || this.time.mins == null)) {

                this.time.alerthours = true
                this.time.alertmins = true

                return
            } else {
                this.time.alerthours = false
                this.time.alertmins = false
            }

            if (this.time.hours == 0 && this.time.mins == 0) {
                x!.style.display = 'none';
                return
            }
            this.Request.controls.time.setValue(this.time.hours.toString() + " ชั่วโมง " + this.time.mins.toString() + " นาที")
            x!.style.display = 'none';
        }
    }

    submitButton() {
        this.summited = true

        if(this.Request.invalid)
            return

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

                let min, hour

                if (String(this.time.mins).length == 1) {
                    min = "0" + this.time.mins
                } else {
                    min = String(this.time.mins)
                }

                if (String(this.time.hours).length == 1) {
                    hour = "0" + this.time.hours
                } else {
                    hour = String(this.time.hours)
                }

                let time = hour + ":" + min;
                let date = this.datepipe.transform(this.Request.controls.Date.value, 'yyyy-MM-dd');


                this.timeatdService.addRequestAttendance(
                    this.Request.controls.Type.value,
                    date,
                    time,
                    this.Request.controls.detail.value,
                ).subscribe({
                    next: (res: any) => {
                        this.backClicked()
                     },
                    error: (err: any) => { }
                })
            }
        });


    }
}
