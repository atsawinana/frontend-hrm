import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataPersonService } from './data-person.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-data-person',
  templateUrl: './data-person.component.html',
  styleUrls: ['./data-person.component.css'],
})
export class DataPersonComponent implements OnInit {
  constructor(
    private dataService: DataPersonService,
    private router: ActivatedRoute,
    private route: Router
  ) { }
  Empid: any;
  baseURL = environment.apiURL;
  APISuccess: boolean = false

  objDataemp: any;

  ngOnInit() {
    this.Empid = this.router.snapshot.params['id'];
    localStorage.setItem('empPerson', this.Empid)
    this.dataService.getUserProfile(this.Empid).subscribe({
      next: (res: any) => {
        this.objDataemp = res.data
        console.log(this.objDataemp)
        if (this.objDataemp.ud_picture == null) {
          this.objDataemp.ud_picture = "/files/image/default.jpg"
        }
        this.APISuccess = true
      },
      error: (error: any) => { },
    });
  }

  resetPassword() {
    Swal.fire({
      title: `<strong style = "font-family:Kanit"> คุณต้องการเปลี่ยนรหัสผ่านของ <br> ${this.objDataemp.ud_fullname_th} หรือไม่ ? </strong>`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#005FBC',
      cancelButtonColor: '#d33',
      confirmButtonText: '<div style = "font-family:Kanit"> ตกลง </div>',
      cancelButtonText: '<div style = "font-family:Kanit"> ยกเลิก </div>',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.dataService.resetPassword(this.objDataemp.user_id).subscribe({
          next: (res: any) => {

            let password = res.data

            Swal.fire({
              title: `<strong style = "font-family:Kanit"> เปลี่ยนรหัสผ่านสำเร็จ <br> รหัสผ่านของคุณคือ ${password} </strong>`,
              icon: 'success',
              confirmButtonColor: '#005FBC',
              cancelButtonColor: '#d33',
              reverseButtons: true,
              confirmButtonText: '<div style = "font-family:Kanit"> ตกลง </div>',
            })
          },
          error: (err: any) => {
            Swal.fire({
              title: `<strong style = "font-family:Kanit"> เกิดข้อผิดพลาด <br> กรุณาลองใหม่อีกครั้ง </strong>`,
              icon: 'error',
              showConfirmButton: false,
              timer: 1500
            })
          }
        })
      }
    })
  }


  deleteEmployee() {
    Swal.fire({
      title: `<strong style = "font-family:Kanit"> คุณต้องการลบข้อมูลของ <br>  ${this.objDataemp.ud_prefix_name}  ${this.objDataemp.ud_fullname_th} หรือไม่ ? </strong>`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#005FBC',
      cancelButtonColor: '#d33',
      confirmButtonText: '<div style = "font-family:Kanit"> ตกลง </div>',
      cancelButtonText: '<div style = "font-family:Kanit"> ยกเลิก </div>',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.dataService.deleteEmployee(this.objDataemp.user_id).subscribe({
          next: (res: any) => {
            Swal.fire({
              title: `<strong style = "font-family:Kanit"> ลบข้อมูลสำเร็จ </strong>`,
              icon: 'success',
              confirmButtonColor: '#005FBC',
              cancelButtonColor: '#d33',
              reverseButtons: true,
              confirmButtonText: '<div style = "font-family:Kanit"> ตกลง </div>',
            }).then((e) => {
              this.route.navigate(['/main/employee/end-contract-employee']);
            })
          },
          error: (err: any) => {
            Swal.fire({
              title: `<strong style = "font-family:Kanit"> เกิดข้อผิดพลาด <br> กรุณาลองใหม่อีกครั้ง </strong>`,
              icon: 'error',
              showConfirmButton: false,
              timer: 1500
            })
          }
        })
      }
    })
  }

}
