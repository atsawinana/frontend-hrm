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
  selector: 'app-ot-request',
  templateUrl: './ot-request.component.html',
  styleUrls: ['./ot-request.component.css']
})
export class OtRequestComponent implements OnInit {

  constructor(
    private localeService: BsLocaleService,
    private route: Router,
    private datepipe: DatePipe,
    private _location: Location,
    private otService: OtService
  ) { }

  locale = 'th';
  today!: Date;
  summited: boolean = false;
  requestStatus = 1
  loadingapi:boolean = false

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

  nameWork:any

  Request = new FormGroup({
    Type: new FormControl(null, [Validators.required]),
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required]),
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

    this.otService.getNameWork().subscribe({
      next: (res:any) => {
        console.log(res)
        this.nameWork = res.data
      },
      error: (err:any) => {}
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
        this.route.navigate(['../main/ot']);
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
    this.loadingapi = true
    this.summited = true;
    console.log(this.Request.value)

    let d1 = new Date(this.Request.controls.startDate.value!)
    let d2 = new Date(this.Request.controls.endDate.value!)

    console.log(d1.getTime() < d2.getTime())

    if (d1.getTime() > d2.getTime()) {
      Swal.fire({
        title: '<strong style = "font-family:Kanit"> ข้อมูลวันที่ผิดพลาด กรุณาลองอีกครั้ง </strong>',
        icon: 'warning',
        showConfirmButton: false,
        timer: 2500
      })
      return
    }

    let dateStart = this.datepipe.transform(this.Request.controls.startDate.value, 'yyyy-MM-dd');
    console.log(dateStart)
    let dateEnd = this.datepipe.transform(this.Request.controls.endDate.value, 'yyyy-MM-dd');
    if (this.Request.invalid)
      return;



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
        this.otService.requestOvertime(
          this.Request.controls.Type.value!,
          dateStart!,
          dateEnd!,
          this.setTimeFormat(this.timeStart),
          this.setTimeFormat(this.timeEnd),
          this.Request.controls.detail.value!
        ).subscribe({
          next: (res: any) => {
            this.route.navigate(['../main/ot']);
            this.loadingapi = false
          },
          error: (err:any) => {
            this.loadingapi = false
          }
        });
      }
    });
  }

}
