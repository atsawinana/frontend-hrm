import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-leave-request',
  templateUrl: './leave-request.component.html',
  styleUrls: ['./leave-request.component.css'],
})
export class LeaveRequestComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
  checkCancel() {
    Swal.fire({
      title:
        '<strong style = "font-family:Kanit"> คุณต้องการแก้ไขแผนกใช่หรือไม่ </strong>',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: '<div style = "font-family:Kanit"> ยกเลิก </div>',
      confirmButtonText: '<div style = "font-family:Kanit"> ตกลง </div>',
      confirmButtonColor: '#005FBC',
      reverseButtons: true,
    });
  }
  checkNull() {
    Swal.fire({
      title:
        '<strong style = "font-family:Kanit"> คุณต้องการแก้ไขแผนกใช่หรือไม่ </strong>',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: '<div style = "font-family:Kanit"> ยกเลิก </div>',
      confirmButtonText: '<div style = "font-family:Kanit"> ตกลง </div>',
      confirmButtonColor: '#005FBC',
      reverseButtons: true,
    });
  }
}
