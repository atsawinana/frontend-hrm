import { Component, OnInit } from '@angular/core';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale, thBeLocale } from 'ngx-bootstrap/chronos';
import Swal from 'sweetalert2';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AddEmployeeService } from './add-employee.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

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
    idcard: new FormControl('', [Validators.required, this.noWhitespaceValidator]),
    prefix: new FormControl(null, [Validators.required]),
    nameth: new FormControl('', [Validators.required, this.noWhitespaceValidator]),
    nameen: new FormControl('', [Validators.required, this.noWhitespaceValidator]),
    nickname: new FormControl('', [Validators.required, this.noWhitespaceValidator]),
    birthdate: new FormControl('', [Validators.required,]),
    phonenumber: new FormControl('', [Validators.required, this.noWhitespaceValidator]),
    email: new FormControl('',),
    company: new FormControl('Exvention', [Validators.required, this.noWhitespaceValidator]),
    department: new FormControl(null, [Validators.required]),
    typecontract: new FormControl(null, [Validators.required, this.noWhitespaceValidator]),
    // empid: new FormControl('', [Validators.required, this.noWhitespaceValidator]),
    startdate: new FormControl('', [Validators.required]),
    usernameid: new FormControl('', [Validators.required, this.noWhitespaceValidator]),
    password: new FormControl('', [Validators.required, this.noWhitespaceValidator]),

    leavesick: new FormControl('', [Validators.required]),
    leave: new FormControl('', [Validators.required]),
    leaveVacation: new FormControl('', [Validators.required]),
    leaveordination: new FormControl('', [Validators.required]),
    leavemilitary: new FormControl('', [Validators.required]),
    leavematernity: new FormControl('', [Validators.required]),
  });

  locale = 'th';
  today!: Date;
  Objleave: any;
  APISuccess: boolean = false;
  summited: boolean = false;
  deprtmentsData: any

  position: any[] = [];
  countposit: any[] = [];
  positionDept: any;
  baseURL = environment.apiURL;
  pathPic: string = "/files/image/default.jpg"
  confirmPath: string = ""

  checknullPosit: boolean = false

  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }

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

  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

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

    console.log("option", this.positionDept)
    if (this.positionDept.length == 0) {
      this.position.splice(index, 1);
      this.countposit.splice(index, 1);
      return
    }

    let person = { position: String(this.position[index]) };
    this.positionDept.push(person)

    this.position.splice(index, 1);
    this.countposit.splice(index, 1);

    if (this.position.length == this.countposit.length) {
      this.checknullPosit = false
      return;
    } else {
      this.checknullPosit = true
      return;
    }
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

  PositionChang() {

    for (let i = 0; i < this.position.length; i++) {
      for (let j = 0; j < this.positionDept.length; j++) {
        if (this.position[i] == this.positionDept[j].position) {
          this.positionDept.splice(j, 1)
        }
      }
    }
  }

  getPosition(value: any) {

    this.position = []
    this.countposit = [1]

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

    console.log("test position", this.position)
    console.log("count posit", this.countposit)


    this.summited = true;

    if (this.position.length == this.countposit.length) {
      this.checknullPosit = false
    } else {
      this.checknullPosit = true
    }



    console.log('value invalid', this.emp);

    console.log("null posit", this.checknullPosit)

    if (this.emp.invalid || this.checknullPosit) {
      return;
    }

    let birthdate = this.datepipe.transform(
      this.emp.controls.birthdate.value,
      'yyyy-MM-dd'
    );
    let datestart = this.datepipe.transform(
      this.emp.controls.startdate.value,
      'yyyy-MM-dd'
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
            datestart!,
            // วันลา
            this.emp.controls.leave.value!,
            this.emp.controls.leavesick.value!,
            this.emp.controls.leaveVacation.value!,
            this.emp.controls.leaveordination.value!,
            this.emp.controls.leavematernity.value!,
            null,
            this.emp.controls.leavemilitary.value!,
            null,
            null,
            this.confirmPath
          )
          .subscribe({
            next: (res: any) => {
              console.log('success');
              this.router.navigate(['/main/employee']);
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
        console.log(this.Objleave)
        this.emp.controls.leave.setValue(this.Objleave.user_leave);
        this.emp.controls.leavesick.setValue(this.Objleave.user_sick);
        this.emp.controls.leaveordination.setValue(this.Objleave.user_ordination);
        this.emp.controls.leavemilitary.setValue(this.Objleave.user_military_service);
        this.emp.controls.leaveVacation.setValue(this.Objleave.user_take_annual);
        this.emp.controls.leavematernity.setValue(this.Objleave.user_maternity);
        this.APISuccess = false;
      },
      error: (err: any) => { },
    });
  }

  editPicture(event: any) {
    const file: File = event.target.files[0];

    const formData = new FormData()
    // this.picname = file.name
    formData.append("file", file)
    // console.log("file", file)
    // console.log('test form', formData)
    // console.log("test param ", this.picfile)
    let objPic
    this.addEmpService.uploadImgprofile(formData).subscribe({
      next: (res: any) => {
        objPic = res
        this.confirmPath = objPic.data
        this.pathPic = objPic.data
        console.log(objPic)
        // location.reload()
      },
      error: (err: any) => {

      }
    })
  }

}
