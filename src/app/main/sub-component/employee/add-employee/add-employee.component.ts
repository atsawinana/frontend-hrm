import { Component, OnInit } from '@angular/core';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale, thBeLocale } from 'ngx-bootstrap/chronos';
import Swal from 'sweetalert2';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AddEmployeeService } from './add-employee.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css'],
})
export class AddEmployeeComponent implements OnInit {
  constructor(
    private localeService: BsLocaleService,
    private addEmpService: AddEmployeeService,
    public datepipe: DatePipe,
    private router: Router
  ) { }

  emp = new FormGroup({
    idcard: new FormControl('', Validators.required),
    prefix: new FormControl(null, Validators.required),
    nameth: new FormControl('', Validators.required),
    nameen: new FormControl('', Validators.required),
    nickname: new FormControl('', Validators.required),
    birthdate: new FormControl('', Validators.required),
    phonenumber: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    company: new FormControl('', Validators.required),
    department: new FormControl(null, Validators.required),
    typecontract: new FormControl(null, Validators.required),
    empid: new FormControl('', Validators.required),
    startdate: new FormControl('', Validators.required),
    usernameid: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    leavesick: new FormControl('', Validators.required),
    leave: new FormControl('', Validators.required),
    leaveVacation: new FormControl('', Validators.required),
    leaveordination: new FormControl(''),
    leavemilitary: new FormControl(''),
    leavematernity: new FormControl(''),
  });

  locale = 'th';
  today!: Date;
  posit: any;
  Objleave: any;
  APISuccess: boolean = false;
  position: any[] = [];
  countposit: any[] = [];
  summited: boolean = false;
  deprtmentsData: any
  positionDept: any

  ngOnInit() {
    this.today = new Date();
    defineLocale('th', thBeLocale);
    this.localeService.use(this.locale);
    console.log(this.position.length);
    this.countposit = [1];
    this.getDepartment()
  }

  addInputDeptPosit() {
    console.log(this.position);
    // console.log(this.DeptPosit[this.countDeptPosit.length - 1]);
    if (this.position[this.countposit.length - 1] == null) {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน');
    } else {
      this.countposit?.push(this.countposit.length + 1);
    }
  }

  Usernameset() {
    console.log(this.emp.controls.nameen.value?.includes(' '));
    if (this.emp.controls.nameen.value?.includes(' ')) {
      let usernameSet1 = String(this.emp.controls.nameen.value)
      let usernameSet2 = String(this.emp.controls.nameen.value)
      usernameSet1 = usernameSet1.substring(0, usernameSet1.indexOf(' '))
      // usernameSet2  = usernameSet2.substring(usernameSet2.indexOf(' ')+1,4)
      console.log("usernameSet1", usernameSet1)
      console.log("usernameSet2", usernameSet2)
      console.log("indexOf", usernameSet2.indexOf(" "))
      usernameSet2 = usernameSet2.substring(usernameSet2.indexOf(" ") + 1, usernameSet2.indexOf(" ") + 4)
      let fullUsername = usernameSet1 + "." + usernameSet2
      console.log(fullUsername)
      this.emp.controls.usernameid.setValue(fullUsername)
    }
  }

  changeTest() {
    console.log("123123123")
  }

  deleteInputDept(index: number) {
    this.countposit.splice(index, 1);
  }

  getDepartment() {
    this.addEmpService.getAllDepartment().subscribe({
      next: (res: any) => {
        this.deprtmentsData = res.data.deprtments;
        console.log(this.deprtmentsData)
      },
      error: (err: any) => {
        if (err.status === 419) {
          Swal.fire({
            icon: 'warning',
            title: 'เซสชั่นหมดอายุ',
            text: 'กรุณา Login ใหม่ เพื่อใช้งาน',
          }).then((e) => {
            this.router.navigate(['']);
          })
        }
      },
    });
  }

  getPosition(value: any) {
    this.addEmpService.ShowPosition(value).subscribe({
      next: (res: any) => {
        this.positionDept = res.data.dept_potitions
        console.log(res.data.dept_potitions)
      },
      error: (err: any) => {
        if (err.status === 419) {
          Swal.fire({
            icon: 'warning',
            title: 'เซสชั่นหมดอายุ',
            text: 'กรุณา Login ใหม่ เพื่อใช้งาน',
          }).then((e) => {
            this.router.navigate(['']);
          })
        }
      },
    });
  }

  randomPassword() {
    var chars =
      '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var passwordLength = 12;
    var password = '';
    for (var i = 0; i <= passwordLength; i++) {
      var randomNumber = Math.floor(Math.random() * chars.length);
      password += chars.substring(randomNumber, randomNumber + 1);
    }
    this.emp.controls.password.setValue(password);
  }

  Submit() {
    this.summited = true;
    console.log('value invalid', this.emp.controls.nickname.invalid);

    if (this.emp.invalid) {
      return;
    }

    let birthdate = this.datepipe.transform(
      this.emp.controls.birthdate.value,
      'yyyy/MM/dd'
    );
    let birthstart = this.datepipe.transform(
      this.emp.controls.startdate.value,
      'yyyy/MM/dd'
    );

    Swal.fire({
      title:
        '<strong style = "font-family:Kanit"> คุณต้องการเพิ่มข้อมูลพนักงาน หรือไม่ ? </strong>',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: '<div style = "font-family:Kanit"> ยกเลิก </div>',
      confirmButtonText: '<div style = "font-family:Kanit"> ตกลง </div>',
      confirmButtonColor: '#005FBC',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.addEmpService
          .Addemp(
            this.emp.controls.prefix.value!,
            this.emp.controls.nameth.value!,
            this.emp.controls.nameen.value!,
            this.emp.controls.nickname.value!,
            birthdate!,
            this.emp.controls.email.value!,
            this.emp.controls.idcard.value!,
            this.emp.controls.phonenumber.value!,
            this.emp.controls.company.value!,
            this.emp.controls.department.value!,
            this.position,
            this.emp.controls.typecontract.value!,
            this.emp.controls.usernameid.value!,
            this.emp.controls.password.value!,
            birthstart!,
            // วันลา
            this.emp.controls.leave.value!,
            this.emp.controls.leavesick.value!,
            this.emp.controls.leaveVacation.value!,
            this.emp.controls.leaveordination.value!,
            this.emp.controls.leavematernity.value!,
            this.emp.controls.prefix.value!,
            this.emp.controls.leavemilitary.value!,
            this.emp.controls.prefix.value!,
            this.emp.controls.prefix.value!
          )
          .subscribe({
            next: (res: any) => {
              console.log('success');
            },
            error: (err: any) => { },
          });

        //   Swal.fire({
        //     title:
        //       '<strong style = "font-family:Kanit"> เพิ่มข้อมูลพนักงานสำเร็จ </strong>',
        //     icon: 'success',
        //     confirmButtonColor: '#005FBC',
        //     confirmButtonText: '<div style = "font-family:Kanit"> ตกลง </div>',
        //   });
      }
    });
  }

  changValueLeave(prefixID: any, startDate: any) {

    let birthstart = this.datepipe.transform(startDate, 'yyyy/MM/dd');

    this.emp.controls.leave.setValue('');
    this.emp.controls.leavesick.setValue('');
    this.emp.controls.leaveordination.setValue('');
    this.emp.controls.leavemilitary.setValue('');
    this.emp.controls.leaveVacation.setValue('');
    this.emp.controls.leavematernity.setValue('');
    this.APISuccess = true;
    this.addEmpService.getLeaveDay(prefixID, birthstart!).subscribe({
      next: (res: any) => {
        this.Objleave = res.data;
        if (this.Objleave.ud_gender_id == 1) {
          this.emp.controls.leave.setValue('6');
          this.emp.controls.leavesick.setValue('30');
          this.emp.controls.leaveordination.setValue('7');
          this.emp.controls.leavemilitary.setValue('60');
          this.emp.controls.leaveVacation.setValue('6');
        } else {
          this.emp.controls.leave.setValue('6');
          this.emp.controls.leavesick.setValue('30');
          this.emp.controls.leaveVacation.setValue('6');
          this.emp.controls.leavematernity.setValue('98');
        }
        this.APISuccess = false;
      },
      error: (err: any) => { },
    });
  }

  modal() { }
}
