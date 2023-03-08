import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale, thBeLocale } from 'ngx-bootstrap/chronos';
import { ActivatedRoute, Route, Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Location } from '@angular/common';
import { OtService } from '../ot.service';

@Component({
    selector: 'app-ot-edit-request',
    templateUrl: './ot-edit-request.component.html',
    styleUrls: ['./ot-edit-request.component.css']
})
export class OtEditRequestComponent implements OnInit {

    constructor(
        private localeService: BsLocaleService,
        private router: Router,
        private datepipe: DatePipe,
        private _location: Location,
        private otService: OtService,
        private route: ActivatedRoute,
    ) { }

    locale = 'th';
    today!: Date;
    summited: boolean = false;
    requestStatus = 1
    id: any
    checkState: boolean = true
    timeStart = {
        hours: 0,
        alerthours: false,
        mins: 0,
        alertmins: false,
    }

    timeEnd = {
        hours: 0,
        alerthours: false,
        mins: 0,
        alertmins: false,
    }

    nameWork: any

    Request = new FormGroup({
        Type: new FormControl(null, [Validators.required]),
        startDate: new FormControl(new Date, [Validators.required]),
        endDate: new FormControl(new Date, [Validators.required]),
        startTime: new FormControl('', [Validators.required]),
        EndTime: new FormControl('', [Validators.required]),
        detail: new FormControl('', [
            Validators.required,
            this.noWhitespaceValidator,
        ]),
    });

    ngOnInit() {
        this.today = new Date();
        defineLocale('th', thBeLocale);
        this.localeService.use(this.locale);
        this.id = this.route.snapshot.params['id'];
        this.otService.getEditRequest(this.id).subscribe({
            next: (res: any) => {
                this.Request.controls.startDate.setValue(new Date(res.data.rot_start_date))
                this.Request.controls.endDate.setValue(new Date(res.data.rot_end_date))
                this.Request.controls.Type.setValue(res.data.rot_ot_id)
                this.Request.controls.detail.setValue(res.data.rot_detail)
                let endtime, startTime
                endtime = res.data.rot_end_time
                startTime = res.data.rot_start_time
                endtime = String(endtime).split(":")
                startTime = String(startTime).split(":")
                this.timeStart.hours = Number(startTime[0])
                this.timeStart.mins = Number(startTime[1])
                this.timeEnd.hours = Number(endtime[0])
                this.timeEnd.mins = Number(endtime[1])
                this.Request.controls.startTime.setValue(this.timeStart.hours.toString() + " นาฬิกา " + this.timeStart.mins.toString() + " นาที")
                this.Request.controls.EndTime.setValue(this.timeEnd.hours.toString() + " นาฬิกา " + this.timeEnd.mins.toString() + " นาที")
                this.checkState = false
            },
            error: (err: any) => { }
        })

        this.otService.getNameWork().subscribe({
            next: (res: any) => {
                this.nameWork = res.data
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
                '<strong style = "font-family:Kanit"> คุณต้องการยกเลิกแบบฟอร์มการทำโอที ใช่หรือไม่ </strong>',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#d33',
            cancelButtonText: '<div style = "font-family:Kanit"> ยกเลิก </div>',
            confirmButtonText: '<div style = "font-family:Kanit"> ตกลง </div>',
            confirmButtonColor: '#005FBC',
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                this.router.navigate(['../main/ot']);
            }
        });
    }

    upHours(time: any) {
        time.hours++

        if (time.hours > 23) {
            time.hours = 0
        }
    }

    downHours(time: any) {
        time.hours--

        if (time.hours < 0) {
            time.hours = 23
        }
    }

    upMins(time: any) {
        time.mins++

        if (time.mins > 59) {
            time.mins = 0
        }
    }

    downMins(time: any) {
        time.mins--

        if (time.mins < 0) {
            time.mins = 59
        }
    }

    showStartTimeBox() {
        var x = document.getElementById('StartTimeBox');
        if (x?.style.display === 'none') {
            x.style.display = 'block';
        } else {

            if ((this.timeStart.hours > 24 || this.timeStart.hours < 0 || this.timeStart.mins > 59 || this.timeStart.mins < 0) || (this.timeStart.hours == null || this.timeStart.mins == null)) {

                this.timeStart.alerthours = true
                this.timeStart.alertmins = true

                return
            } else {
                this.timeStart.alerthours = false
                this.timeStart.alertmins = false
            }

            if (this.timeStart.hours == 0 && this.timeStart.mins == 0) {
                x!.style.display = 'none';
                return
            }
            this.Request.controls.startTime.setValue(this.timeStart.hours.toString() + " นาฬิกา " + this.timeStart.mins.toString() + " นาที")
            x!.style.display = 'none';
        }
    }

    showEndTimeBox() {
        var x = document.getElementById('EndTimeBox');
        if (x?.style.display === 'none') {
            x.style.display = 'block';
        } else {

            if ((this.timeEnd.hours > 24 || this.timeEnd.hours < 0 || this.timeEnd.mins > 59 || this.timeEnd.mins < 0) || (this.timeEnd.hours == null || this.timeEnd.mins == null)) {

                this.timeEnd.alerthours = true
                this.timeEnd.alertmins = true

                return
            } else {
                this.timeEnd.alerthours = false
                this.timeEnd.alertmins = false
            }

            if (this.timeEnd.hours == 0 && this.timeEnd.mins == 0) {
                x!.style.display = 'none';
                return
            }
            this.Request.controls.EndTime.setValue(this.timeEnd.hours.toString() + " นาฬิกา " + this.timeEnd.mins.toString() + " นาที")
            x!.style.display = 'none';
        }
    }

    setTimeFormat(time: any) {
        let min, hour

        if (String(time.mins).length == 1) {
            min = "0" + time.mins
        } else {
            min = String(time.mins)
        }

        if (String(time.hours).length == 1) {
            hour = "0" + time.hours
        } else {
            hour = String(time.hours)
        }

        let timeformat = hour + ":" + min;
        return timeformat
    }

    submitButton() {

        this.summited = true;

        let d1 = new Date(this.Request.controls.startDate.value!)
        let d2 = new Date(this.Request.controls.endDate.value!)

        console.log(d1.getTime() < d2.getTime())

        let dateStart = this.datepipe.transform(this.Request.controls.startDate.value, 'yyyy-MM-dd');
        let dateEnd = this.datepipe.transform(this.Request.controls.endDate.value, 'yyyy-MM-dd');
        if (this.Request.invalid)
            return;

        if (d1.getTime() > d2.getTime()) {
            Swal.fire({
                title: '<strong style = "font-family:Kanit"> ข้อมูลวันที่ผิดพลาด กรุณาลองอีกครั้ง </strong>',
                icon: 'warning',
                showConfirmButton: false,
                timer: 2500
            })
            return
        }

        this.otService.checkTimevalid(
            dateStart!,
            dateEnd!,
            this.setTimeFormat(this.timeStart),
            this.setTimeFormat(this.timeEnd),
        ).subscribe({
            next: (res: any) => {
                if (res.data.checker == 1) {
                    Swal.fire({
                        title: '<strong style = "font-family:Kanit"> ข้อมูลวันที่หรือเวลาผิดพลาด กรุณาลองอีกครั้ง </strong>',
                        icon: 'warning',
                        showConfirmButton: false,
                        timer: 2500
                    })
                    return
                }
                else {
                    Swal.fire({
                        title: '<strong style = "font-family:Kanit"> คุณต้องการส่งแบบฟอร์มการทำโอที ใช่หรือไม่ </strong>',
                        icon: 'warning',
                        showCancelButton: true,
                        cancelButtonColor: '#d33',
                        cancelButtonText: '<div style = "font-family:Kanit"> ยกเลิก </div>',
                        confirmButtonText: '<div style = "font-family:Kanit"> ตกลง </div>',
                        confirmButtonColor: '#005FBC',
                        reverseButtons: true,
                    }).then((result) => {
                        if (result.isConfirmed) {
                            this.otService.EditrequestOvertime(
                                this.id,
                                this.Request.controls.Type.value!,
                                dateStart!,
                                dateEnd!,
                                this.setTimeFormat(this.timeStart),
                                this.setTimeFormat(this.timeEnd),
                                this.Request.controls.detail.value!
                            ).subscribe({
                                next: (res: any) => {
                                    this.router.navigate(['../main/ot']);
                                },
                            });
                        }
                    });
                }
            },
            error: (err: any) => { }
        })



    }

}
