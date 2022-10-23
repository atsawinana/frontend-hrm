import { Component, OnInit } from '@angular/core';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale, thBeLocale } from 'ngx-bootstrap/chronos';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  constructor(private localeService: BsLocaleService) { }

  locale = 'th';
  today!: Date;

  ngOnInit() {
    this.today = new Date();
    defineLocale('th', thBeLocale);
    this.localeService.use(this.locale);
  }

  modal() {
    Swal.fire({
      title: '<strong style = "font-family:Kanit"> คุณต้องการเพิ่มข้อมูลพนักงาน หรือไม่ ? </strong>',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: '<div style = "font-family:Kanit"> ยกเลิก </div>',
      confirmButtonText: '<div style = "font-family:Kanit"> ตกลง </div>',
      confirmButtonColor: '#005FBC',
      reverseButtons: true
  }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: '<strong style = "font-family:Kanit"> เพิ่มข้อมูลพนักงานสำเร็จ </strong>',
          icon: 'success',
          confirmButtonColor: '#005FBC',
          confirmButtonText: '<div style = "font-family:Kanit"> ตกลง </div>'

      })
      }
    })
  }

}
