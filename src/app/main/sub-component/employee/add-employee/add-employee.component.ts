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
  ) {}

  emp = new FormGroup({
    idcard: new FormControl('', [
      Validators.required,
      this.noWhitespaceValidator,
    ]),
    prefix: new FormControl(null, [Validators.required]),
    nameth: new FormControl('', [
      Validators.required,
      this.noWhitespaceValidator,
    ]),
    namethlast: new FormControl('', [
      Validators.required,
      this.noWhitespaceValidator,
    ]),
    nameen: new FormControl('', [
      Validators.required,
      this.noWhitespaceValidator,
    ]),
    nameenlast: new FormControl('', [
      Validators.required,
      this.noWhitespaceValidator,
    ]),
    nickname: new FormControl('', [
      Validators.required,
      this.noWhitespaceValidator,
    ]),
    birthdate: new FormControl('', [Validators.required]),
    phonenumber: new FormControl('', [
      Validators.required,
      this.noWhitespaceValidator,
    ]),
    email: new FormControl(''),
    company: new FormControl({ value: 'Exvention Co., Ltd.', disabled: true }, [
      Validators.required,
      this.noWhitespaceValidator,
    ]),
    department: new FormControl(null, [Validators.required]),
    typecontract: new FormControl(null, [
      Validators.required,
      this.noWhitespaceValidator,
    ]),
    // empid: new FormControl('', [Validators.required, this.noWhitespaceValidator]),
    startdate: new FormControl('', [Validators.required]),
    usernameid: new FormControl({ value: '', disabled: true }, [
      Validators.required,
      this.noWhitespaceValidator,
    ]),
    password: new FormControl('', [
      Validators.required,
      this.noWhitespaceValidator,
    ]),

    leavesick: new FormControl('', [Validators.required]),
    leave: new FormControl('', [Validators.required]),
    leaveVacation: new FormControl('', [Validators.required]),
    leaveordination: new FormControl('', [Validators.required]),
    leavemilitary: new FormControl('', [Validators.required]),
    leavematernity: new FormControl('', [Validators.required]),
  });

  locale = 'th';
  today!: Date;
  objleave: any;
  APISuccess: boolean = false;
  summited: boolean = false;
  deprtmentsData: any;

  aryPosition: any[] = [];
  aryCountposit: any[] = [];
  positionDept: any;
  baseURL = environment.apiURL;
  pathPic: string = '/files/image/default.jpg';
  confirmPath: string = '';

  checknullPosit: boolean = false;

  indexSelect: any;
  stateBeforeCheck: boolean = false;
  valueStateBefore: any;

  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }

  ngOnInit() {
    this.today = new Date();
    defineLocale('th', thBeLocale);
    this.localeService.use(this.locale);
    console.log(this.aryPosition.length);
    this.aryCountposit = [1];
    this.getDepartment();
  }

  addInputDeptPosit() {
    console.log(this.aryPosition);
    // console.log(this.DeptPosit[this.countDeptPosit.length - 1]);
    if (this.aryPosition[this.aryCountposit.length - 1] == null) {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน');
    } else {
      this.aryCountposit?.push(this.aryCountposit.length + 1);
    }
  }

  iputNumberOnly(event: any): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  setUsername() {
    // console.log(this.emp.controls.nameen.value?.includes(' '));
    // if (this.emp.controls.nameen.value?.includes(' ')) {
    //   let usernameSet1 = String(this.emp.controls.nameen.value);
    //   let usernameSet2 = String(this.emp.controls.nameen.value);
    //   usernameSet1 = usernameSet1.substring(0, usernameSet1.indexOf(' '));
    //   // usernameSet2  = usernameSet2.substring(usernameSet2.indexOf(' ')+1,4)
    //   console.log('usernameSet1', usernameSet1);
    //   console.log('usernameSet2', usernameSet2);
    //   console.log('indexOf', usernameSet2.indexOf(' '));
    //   usernameSet2 = usernameSet2.substring(
    //     usernameSet2.indexOf(' ') + 1,
    //     usernameSet2.indexOf(' ') + 4
    //   );
    //   let fullUsername = usernameSet1 + '.' + usernameSet2;
    //   console.log(fullUsername);
    //   this.emp.controls.usernameid.setValue(fullUsername);
    // }

    let usernameSet1 = String(this.emp.controls.nameen.value);
    let usernameSet2 = String(this.emp.controls.nameenlast.value);
    usernameSet2 = usernameSet2.substring(usernameSet2.indexOf(' ') + 1, 3);
    let fullUsername = usernameSet1 + '.' + usernameSet2;
    this.emp.controls.usernameid.setValue(fullUsername);
  }

  deleteInputDept(index: number) {
    console.log('option', this.positionDept);
    if (this.aryPosition[index] == undefined) {
      this.aryPosition.splice(index, 1);
      this.aryCountposit.splice(index, 1);
      return;
    }

    let person = { position: String(this.aryPosition[index]) };
    this.positionDept.push(person);

    this.aryPosition.splice(index, 1);
    this.aryCountposit.splice(index, 1);

    if (this.aryPosition.length == this.aryCountposit.length) {
      this.checknullPosit = false;
      return;
    } else {
      this.checknullPosit = true;
      return;
    }
  }

  getDepartment() {
    this.addEmpService.getAllDepartment().subscribe({
      next: (res: any) => {
        this.deprtmentsData = res.data.deprtments;
        console.log(this.deprtmentsData);
      },
      error: (err: any) => {
        if (err.status === 419) {
          Swal.fire({
            icon: 'warning',
            title: 'เซสชั่นหมดอายุ',
            text: 'กรุณา Login ใหม่ เพื่อใช้งาน',
          }).then((e) => {
            this.router.navigate(['']);
          });
        }
      },
    });
  }

  positionChang() {
    console.log(this.stateBeforeCheck);

    for (let i = 0; i < this.aryPosition.length; i++) {
      for (let j = 0; j < this.positionDept.length; j++) {
        if (this.aryPosition[i] == this.positionDept[j].position) {
          this.positionDept.splice(j, 1);
        }
      }
    }

    if (!this.stateBeforeCheck) {
      console.log('not null');
      this.positionDept.push(this.valueStateBefore);
    }
  }

  settingIndex(index: any) {
    this.indexSelect = index;
    if (this.aryPosition[this.indexSelect] == undefined) {
      this.stateBeforeCheck = true;
    } else {
      this.valueStateBefore = {
        position: String(this.aryPosition[this.indexSelect]),
      };
      this.stateBeforeCheck = false;
    }
  }

  getPosition(value: any) {
    this.aryPosition = [];
    this.aryCountposit = [1];

    this.addEmpService.ShowPosition(value).subscribe({
      next: (res: any) => {
        this.positionDept = res.data.dept_potitions;
        console.log(res.data.dept_potitions);
      },
      error: (err: any) => {
        if (err.status === 419) {
          Swal.fire({
            icon: 'warning',
            title: 'เซสชั่นหมดอายุ',
            text: 'กรุณา Login ใหม่ เพื่อใช้งาน',
          }).then((e) => {
            this.router.navigate(['']);
          });
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

  cancelModal() {
    Swal.fire({
      title:
        '<strong style = "font-family:Kanit"> คุณต้องการยกเลิกการเพิ่มใช่หรือไม่ </strong>',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#005FBC',
      cancelButtonColor: '#d33',
      confirmButtonText: '<div style = "font-family:Kanit"> ตกลง </div>',
      cancelButtonText: '<div style = "font-family:Kanit"> ยกเลิก </div>',
      reverseButtons: true,
    }).then((e) => {
      if (e.isConfirmed) {
        this.router.navigate(['/main/employee']);
      }
    });
  }

  Submit() {
    console.log('test position', this.aryPosition);
    console.log('count posit', this.aryCountposit);

    this.summited = true;

    if (this.aryPosition.length == this.aryCountposit.length) {
      this.checknullPosit = false;
    } else {
      this.checknullPosit = true;
    }

    console.log('value invalid', this.emp);

    console.log('null posit', this.checknullPosit);

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

    let tempnameth =
      this.emp.controls.nameth.value?.trim() +
      ' ' +
      this.emp.controls.namethlast.value?.trim()!;
    this.emp.controls.nameth.setValue(tempnameth);

    let tempnameen =
      this.emp.controls.nameen.value?.trim() +
      ' ' +
      this.emp.controls.nameenlast.value?.trim()!;
    this.emp.controls.nameen.setValue(tempnameen);

    Swal.fire({
      title:
        '<strong style = "font-family:Kanit"> คุณต้องการเพิ่มข้อมูลพนักงาน หรือไม่ ? </strong>',
      icon: 'question',
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
            this.aryPosition,
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
            error: (err: any) => {
              if (err.status === 403) {
                Swal.fire({
                  icon: 'error',
                  title: 'รหัสบัตรประชาชนไม่ถูกต้อง',
                  text: 'กรุณาตรวจสอบเลขบัตรประชาชนอีกครั้ง',
                });
              } else {
                // this.main.Error()
              }
            },
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

  Copy() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
    });

    Toast.fire({
      icon: 'question',
      iconColor: '#56B06D',
      iconHtml: '<i class="fa-regular fa-clipboard"></i>',
      title:
        '<strong style = "font-family:Kanit"> คัดลอกลง Clipboard สำเร็จ </strong>',
    });

    // Swal.fire({
    //     position: 'top-end',
    //     icon: 'question',
    //     iconColor: '#56B06D',
    //     iconHtml: '<i class="fa-regular fa-clipboard"></i>',
    //     title: '<strong style = "font-family:Kanit"> คัดลอกลง Clipboard สำเร็จ </strong>',
    //     showConfirmButton: false,
    //     timer: 1500,
    //     backdrop: false,
    //   });

    // `<strong style = "font-family:Kanit"> </strong>`
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
        this.objleave = res.data;
        console.log(this.objleave);
        this.emp.controls.leave.setValue(this.objleave.user_leave);
        this.emp.controls.leavesick.setValue(this.objleave.user_sick);
        this.emp.controls.leaveordination.setValue(
          this.objleave.user_ordination
        );
        this.emp.controls.leavemilitary.setValue(
          this.objleave.user_military_service
        );
        this.emp.controls.leaveVacation.setValue(
          this.objleave.user_take_annual
        );
        this.emp.controls.leavematernity.setValue(this.objleave.user_maternity);
        this.APISuccess = false;
      },
      error: (err: any) => {
        this.APISuccess = false;
      },
    });
  }

  editPicture(event: any) {
    const file: File = event.target.files[0];

    const formData = new FormData();
    // this.picname = file.name
    formData.append('file', file);
    // console.log("file", file)
    // console.log('test form', formData)
    // console.log("test param ", this.picfile)
    let objPic;
    this.addEmpService.uploadImgprofile(formData).subscribe({
      next: (res: any) => {
        objPic = res;
        this.confirmPath = objPic.data;
        this.pathPic = objPic.data;
        console.log(objPic);
        // location.reload()
      },
      error: (err: any) => {},
    });
  }

  idcard() {
    if (this.emp.controls.idcard.value?.length == 13) {
      this.APISuccess = true;
      this.addEmpService
        .genDatafromIDCard(this.emp.controls.idcard.value)
        .subscribe({
          next: (res: any) => {
            console.log(res.data);
            this.emp.controls.prefix.setValue(res.data.ud_prefix_id);
            this.emp.controls.nameth.setValue(res.data.ud_firstname_th);
            this.emp.controls.namethlast.setValue(res.data.ud_lastname_th);
            this.emp.controls.nameen.setValue(res.data.ud_firstname_en);
            this.emp.controls.nameenlast.setValue(res.data.ud_lastname_en);
            this.emp.controls.nickname.setValue(res.data.ud_nickname);
            this.emp.controls.birthdate.setValue(res.data.ud_birthday);
            this.emp.controls.phonenumber.setValue(res.data.ud_phone);
            this.emp.controls.email.setValue(res.data.ud_email);
            this.emp.controls.usernameid.setValue(res.data.user_username);
            this.pathPic = res.data.ud_picture;
            this.APISuccess = false;
          },
          error: (err: any) => {
            this.APISuccess = false;
          },
        });
    }
  }
}
