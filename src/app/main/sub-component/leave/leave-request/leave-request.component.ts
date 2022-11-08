import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale, thBeLocale } from 'ngx-bootstrap/chronos';
import { ActivatedRoute, Route, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-leave-request',
  templateUrl: './leave-request.component.html',
  styleUrls: ['./leave-request.component.css'],
})
export class LeaveRequestComponent implements OnInit {
  constructor(private localeService: BsLocaleService, private route: Router) {}
  locale = 'th';
  today!: Date;
  ngOnInit() {
    this.today = new Date();
    defineLocale('th', thBeLocale);
    this.localeService.use(this.locale);
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
        this.route.navigate(['../main/leave']);
      }
    });
  }
}
