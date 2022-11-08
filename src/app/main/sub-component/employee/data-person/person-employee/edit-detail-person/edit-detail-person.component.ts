import { Component, OnInit } from '@angular/core';
import { defineLocale, getFullYear, thBeLocale } from 'ngx-bootstrap/chronos';
import Swal from 'sweetalert2';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { DataPersonService } from '../../data-person.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AddEmployeeService } from '../../../add-employee/add-employee.service';
import { Router } from '@angular/router';
import { EditDetailService } from './edit-detail.service';
import { DatePipe } from '@angular/common';
import { start } from '@popperjs/core';

@Component({
  selector: 'app-edit-detail-person',
  templateUrl: './edit-detail-person.component.html',
  styleUrls: ['./edit-detail-person.component.css']
})
export class EditDetailPersonComponent implements OnInit {

  constructor(private localeService: BsLocaleService, private dataService: DataPersonService, private addEmpService: AddEmployeeService, private router: Router, private editservice: EditDetailService, public datepipe: DatePipe) { }
  locale = 'th';
  today!: Date;
  emp_id: any
  Objdata: any
  Position: any
  PositionCount: any[] = [];
  positionDept: any
  submitted: boolean = false
  dept_id: any
  UserselectedPosit: any

  emp = new FormGroup({
    ud_prefix_id: new FormControl(1, [Validators.required]),
    ud_fullname_th: new FormControl('', [Validators.required, this.noWhitespaceValidator]),
    ud_fullname_en: new FormControl('', [Validators.required, this.noWhitespaceValidator]),
    ud_nickname: new FormControl('', [Validators.required, this.noWhitespaceValidator]),
    ud_birthday: new FormControl('', [Validators.required,]),
    ud_id_card: new FormControl('', [Validators.required, this.noWhitespaceValidator,]),
    ud_phone: new FormControl('', [Validators.required, this.noWhitespaceValidator]),
    ud_email: new FormControl('', [Validators.required, this.noWhitespaceValidator]),

    user_company: new FormControl('Exvention', [Validators.required, this.noWhitespaceValidator]),
    dept_name_en: new FormControl(null, [Validators.required]),
    user_contract_name: new FormControl(null, [Validators.required, this.noWhitespaceValidator]),
    user_created_at: new FormControl('', [Validators.required]),

    user_sick_day: new FormControl('', [Validators.required]),
    user_leave_day: new FormControl('', [Validators.required]),
    user_take_annual_day: new FormControl('', [Validators.required]),
    user_ordination_day: new FormControl('', [Validators.required]),
    user_military_service_day: new FormControl('', [Validators.required]),
    user_sterilization_day: new FormControl('', [Validators.required]),
    user_maternity_day: new FormControl('', [Validators.required]),
    user_without_pay_day: new FormControl('', [Validators.required]),
    user_resign_day: new FormControl('', [Validators.required]),
  });

  user_deleted_at = new FormControl(null, [Validators.required])


  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }

  Submit() {
    this.checkNull()
    this.submitted = true
    console.log(this.emp)
    console.log(this.emp.invalid)


    console.log(this.emp.controls.user_contract_name.invalid,
      this.emp.controls.user_company.invalid,
      this.emp.controls.ud_prefix_id.invalid,
      this.emp.controls.ud_email.invalid,
      this.emp.controls.ud_fullname_en.invalid,
      this.emp.controls.ud_fullname_th.invalid,
      this.emp.controls.ud_nickname.invalid,
      this.emp.controls.ud_phone.invalid,
      this.emp.controls.ud_id_card.invalid,
      this.emp.controls.ud_birthday.invalid,
      this.emp.controls.user_leave_day.invalid,
      this.emp.controls.user_sick_day.invalid,
      this.emp.controls.user_take_annual_day.invalid,
      this.emp.controls.user_ordination_day.invalid,
      this.emp.controls.user_maternity_day.invalid,
      this.emp.controls.user_sterilization_day.invalid,
      this.emp.controls.user_military_service_day.invalid,
      this.emp.controls.user_without_pay_day.invalid,
      this.emp.controls.user_resign_day.invalid,)


    if (this.emp.invalid)
      return


    let user_id = localStorage.getItem('empPerson')
    let username = "A"
    let aryPosition = []

    for (let i = 0; i < this.Position.length; i++) {
      aryPosition.push(this.Position[i].positions)
    }


    let startdate = this.datepipe.transform(this.emp.controls.user_created_at.value, 'YYYY-dd-MM');
    let bthdate = this.datepipe.transform(this.emp.controls.user_created_at.value, 'YYYY-dd-MM')
    let enddate = null

    let year = new Date()
    let year3 = getFullYear(year)
    let year2 = getFullYear(year) + 543
    // year.setFullYear(year2+543)
    let replaceDate = null
    if(this.user_deleted_at.value != null){
      enddate = this.datepipe.transform(this.user_deleted_at.value, 'YYYY-MM-dd')
      replaceDate = String(enddate).replace(String(year3),String(year2))
      console.log(replaceDate)
    }
    
    this.editservice.editData(
      user_id,
      this.emp.controls.user_contract_name.value,
      this.emp.controls.user_company.value,
      this.emp.controls.ud_prefix_id.value,
      aryPosition,
      this.dept_id,
      this.emp.controls.ud_email.value,
      this.emp.controls.ud_fullname_en.value,
      this.emp.controls.ud_fullname_th.value,
      this.emp.controls.ud_nickname.value,
      this.emp.controls.ud_phone.value,
      this.emp.controls.ud_id_card.value,
      bthdate,
      this.emp.controls.user_leave_day.value,
      this.emp.controls.user_sick_day.value,
      this.emp.controls.user_take_annual_day.value,
      this.emp.controls.user_ordination_day.value,
      this.emp.controls.user_maternity_day.value,
      this.emp.controls.user_sterilization_day.value,
      this.emp.controls.user_military_service_day.value,
      this.emp.controls.user_without_pay_day.value,
      this.emp.controls.user_resign_day.value,
      replaceDate,
      startdate

    ).subscribe({
      next: (res: any) => {
        this.router.navigate([`/main/employee/data-person/${user_id}`]); 
      },
      error: (err: any) => {
      }
    })
  }

  getPosition(value: any) {
    this.addEmpService.ShowPosition(value).subscribe({
      next: (res: any) => {
        this.positionDept = res.data.dept_potitions
        for (let i = 0; i < this.Position.length; i++) {
          console.log("loop", this.positionDept)
          console.log("objkey", Object.keys(this.positionDept).length)
          for (let j = 0; j < Object.keys(this.positionDept).length; j++) {
            if (this.Position[i].positions == this.positionDept[j].position) {
              this.positionDept.splice(j, 1);
            }
          }
        }
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



  ngOnInit() {
    this.today = new Date();
    defineLocale('th', thBeLocale);
    this.localeService.use(this.locale);

    this.emp_id = localStorage.getItem('empPerson')

    this.dataService.getUserProfile(this.emp_id).subscribe({
      next: (res: any) => {
        this.Objdata = res.data
        this.dept_id = this.Objdata.dept_id
        console.log(this.Objdata)
        if (this.Objdata.ud_picture == null) {
          this.Objdata.ud_picture = "/files/image/default.jpg"
        }
        console.log("edit", this.Objdata)

        this.Position = this.Objdata.positions

        for (let i = 0; i < this.Position.length; i++) {
          this.PositionCount.push(i + 1)
        }

        this.getPosition(this.Objdata.dept_id)
        console.log("position", this.Position)



        this.emp.controls.ud_prefix_id.setValue(this.Objdata.ud_prefix_id)
        this.emp.controls.ud_fullname_th.setValue(this.Objdata.ud_fullname_th)
        this.emp.controls.ud_fullname_en.setValue(this.Objdata.ud_fullname_en)
        this.emp.controls.ud_nickname.setValue(this.Objdata.ud_nickname)
        this.emp.controls.ud_birthday.setValue(this.Objdata.ud_birthday)
        this.emp.controls.ud_id_card.setValue(this.Objdata.ud_id_card)
        this.emp.controls.ud_phone.setValue(this.Objdata.ud_phone)
        this.emp.controls.ud_email.setValue(this.Objdata.ud_email)

        this.emp.controls.user_company.setValue(this.Objdata.user_company)
        this.emp.controls.dept_name_en.setValue(this.Objdata.dept_name_en)
        this.emp.controls.user_contract_name.setValue(this.Objdata.user_contract_name)
        this.emp.controls.user_created_at.setValue(this.Objdata.user_created_at)
        // this.emp.controls.enddate.setValue(this.Objdata.enddate)

        this.emp.controls.user_sick_day.setValue(this.Objdata.user_sick_day)
        this.emp.controls.user_leave_day.setValue(this.Objdata.user_leave_day)
        this.emp.controls.user_take_annual_day.setValue(this.Objdata.user_take_annual_day)
        this.emp.controls.user_ordination_day.setValue(this.Objdata.user_ordination_day)
        this.emp.controls.user_military_service_day.setValue(this.Objdata.user_military_service_day)
        this.emp.controls.user_sterilization_day.setValue(this.Objdata.user_sterilization_day)
        this.emp.controls.user_maternity_day.setValue(this.Objdata.user_maternity_day)
        this.emp.controls.user_without_pay_day.setValue(this.Objdata.user_without_pay_day)
        this.emp.controls.user_resign_day.setValue(this.Objdata.user_resign_day)

      },
      error: (error: any) => { },
    });
    console.log(this.emp_id)
    console.log("this.PositionCount", this.PositionCount)

  }

  addInputDeptPosit() {
    console.log(this.Position);
    // console.log(this.DeptPosit[this.countDeptPosit.length - 1]);
    let ObjNull = {}

    console.log(Object.keys(this.Position[this.PositionCount.length - 1]).length === 0)


    if (Object.keys(this.Position[this.PositionCount.length - 1]).length === 0) {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน');
    } else {
      this.PositionCount?.push(this.PositionCount.length + 1);
      this.Position.push({});
    }

    console.log(this.Position.length)
    console.log(this.PositionCount.length)
  }

  Userselected() {
    for (let i = 0; i < this.Position.length; i++) {
      console.log("loop", this.positionDept)
      console.log("objkey", Object.keys(this.positionDept).length)
      for (let j = 0; j < Object.keys(this.positionDept).length; j++) {
        if (this.Position[i].positions == this.positionDept[j].position) {
          this.positionDept.splice(j, 1);
        }
      }
    }
  }

  deleteDeptPosit(index: number) {
    console.log(this.Position)
    console.log("this.positionDept", this.positionDept)
    let person = { position: String(this.Position[index].positions) };
    this.positionDept.push(person)
    this.Position.splice(index, 1);
    this.PositionCount.splice(index, 1);
  }

  checkNull(): boolean {

    for (let j = 0; j < this.Position.length; j++) {
      if (this.Position[j] == null) {
        return true
      }
    }

    return false
  }

}
