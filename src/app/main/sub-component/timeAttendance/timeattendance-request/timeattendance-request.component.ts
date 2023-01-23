import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale, thBeLocale } from 'ngx-bootstrap/chronos';
import { ActivatedRoute, Route, Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-timeattendance-request',
  templateUrl: './timeattendance-request.component.html',
  styleUrls: ['./timeattendance-request.component.css']
})
export class TimeattendanceRequestComponent implements OnInit {

  constructor(
    private localeService: BsLocaleService,
    private route: Router,
  ) { }

  locale = 'th';
  today!: Date;
  summited: boolean = false;

  ngOnInit() {
    this.today = new Date();
    defineLocale('th', thBeLocale);
    this.localeService.use(this.locale);
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
        this.route.navigate(['../main/timeattendance']);
      }
    });
  }

  // checkNull() {
  //   this.summited = true;

  //   if (this.leaveRequest.invalid)
  //     return;
  //   if (this.objDateVerify.stautus == false) {
  //     Swal.fire({
  //       title: '<strong style = "font-family:Kanit"> วันลาของคุณไม่เพียงพอ </strong>',
  //       icon: 'warning',
  //       showConfirmButton: false,
  //       timer: 1500
  //     })
  //     return
  //   }

  //   Swal.fire({
  //     title: '<strong style = "font-family:Kanit"> คุณต้องการส่งแบบฟอร์มการลา ใช่หรือไม่ </strong>',
  //     icon: 'warning',
  //     showCancelButton: true,
  //     cancelButtonColor: '#d33',
  //     cancelButtonText: '<div style = "font-family:Kanit"> ยกเลิก </div>',
  //     confirmButtonText: '<div style = "font-family:Kanit"> ตกลง </div>',
  //     confirmButtonColor: '#005FBC',
  //     reverseButtons: true,
  //   }).then((result) => {
  //     if (result.isConfirmed) {


  //       this.LeaveReqService
  //         .addLeaveRequest(
  //           this.leaveRequest.controls.leaveType.value!,
  //           this.date.dateStart,
  //           this.date.dateEnd,
  //           this.leaveRequest.controls.duration.value!,
  //           this.leaveRequest.controls.detail.value!
  //         ).subscribe({
  //           next: (res: any) => {
  //             this.route.navigate(['../main/timeattendance']);
  //           },
  //         });
  //     }
  //   });
  // }

  showTimeBox() {
    var x = document.getElementById('timeBox');
    if (x?.style.display === 'none') {
      x.style.display = 'block';
    } else {
      x!.style.display = 'none';
    }
  }
}
