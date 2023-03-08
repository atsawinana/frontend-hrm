import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { defineLocale, thBeLocale } from 'ngx-bootstrap/chronos';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { TimeAttendanceService } from '../time-attendance.service';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-timeattendance-edit-request',
    templateUrl: './timeattendance-edit-request.component.html',
    styleUrls: ['./timeattendance-edit-request.component.css']
})
export class TimeattendanceEditRequestComponent implements OnInit {

    constructor(
        private localeService: BsLocaleService,
        private router: Router,
        private serviceTimeatd: TimeAttendanceService,
        private datepipe: DatePipe,
        private _location: Location,
        private route: ActivatedRoute
    ) { }

    locale = 'th';
    today!: Date;
    summited: boolean = false;
    requestStatus = 1
    rta_id: any

    time = {
        hours: 0,
        alerthours: false,
        mins: 0,
        alertmins: false,
    }
    Request = new FormGroup({
        Type: new FormControl(null, [Validators.required]),
        Date: new FormControl(new Date, [Validators.required]),
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
        this.rta_id = this.route.snapshot.params['id'];
            this.serviceTimeatd.getReverseAttendance(this.rta_id).subscribe({
                next: (res: any) => {
                    let date = new Date(res.data.rta_date)
                    this.Request.controls.Type.setValue(res.data.rta_type)
                    this.Request.controls.Date.setValue(date)


                    let startTime
                    startTime = res.data.rta_start_time
                    startTime = String(startTime).split(":")
                    this.time.hours = Number(startTime[0])
                    this.time.mins = Number(startTime[1])
                    this.Request.controls.time.setValue(this.time.hours.toString() + " นาฬิกา " + this.time.mins.toString() + " นาที")
                    this.Request.controls.detail.setValue(res.data.rta_detail)
                },
                error: (err: any) => { }
            })


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
                this.router.navigate(['../main/timeattendance/home']);
            }
        });
    }

    onValueChange(event: any) {
        let date = this.datepipe.transform(this.Request.controls.Date.value, 'yyyy-MM-dd');
        this.serviceTimeatd.checkEditRequestAttendance(date).subscribe({
            next: (res: any) => {
                this.requestStatus = res.data.status
                if (this.requestStatus == 0) {
                    Swal.fire({
                        title: '<strong style = "font-family:Kanit"> วันนี้คุณส่งคำขอเข้างานไปแล้ว </strong>',
                        icon: 'warning',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    return
                }
            },
            error: (err: any) => { }
        })
    }

    upHours() {
        this.time.hours++

        if (this.time.hours > 23) {
            this.time.hours = 0
        }
    }

    downHours() {
        this.time.hours--

        if (this.time.hours < 0) {
            this.time.hours = 23
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

        if (this.Request.invalid)
            return

        if (this.requestStatus == 0) {
            Swal.fire({
                title: '<strong style = "font-family:Kanit"> วันนี้คุณส่งคำขอเข้างานไปแล้ว </strong>',
                icon: 'warning',
                showConfirmButton: false,
                timer: 2500
            })
            return
        }

        Swal.fire({
            title: '<strong style = "font-family:Kanit"> คุณต้องการส่งแบบฟอร์มเข้าทำงาน ใช่หรือไม่ </strong>',
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


                this.serviceTimeatd.reverseAttendance(
                    this.rta_id,
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
