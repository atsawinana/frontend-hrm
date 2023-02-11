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
    objData: any
    Position: any
    aryPositionCount: any[] = [];
    positionDept: any
    submitted: boolean = false
    dept_id: any
    UserselectedPosit: any
    objDepartment: any

    indexSelect: any
    stateBeforeCheck: boolean = false
    valueStateBefore: any

    IDcarderr: boolean = false

    APIsuccess: boolean = false

    dateInputBTH: boolean = false
    dateInputStart: boolean = false

    emp = new FormGroup({
        ud_prefix_id: new FormControl(1, [Validators.required]),

        ud_fullname_th: new FormControl('', [Validators.required, this.noWhitespaceValidator]),
        ud_fullname_en: new FormControl('', [Validators.required, this.noWhitespaceValidator]),

        ud_fullname_th2: new FormControl('', [Validators.required, this.noWhitespaceValidator]),
        ud_fullname_en2: new FormControl('', [Validators.required, this.noWhitespaceValidator]),

        ud_nickname: new FormControl('', [Validators.required, this.noWhitespaceValidator]),
        ud_birthday: new FormControl('', [Validators.required,]),
        ud_id_card: new FormControl('', [Validators.required, this.noWhitespaceValidator,]),
        ud_phone: new FormControl('', [Validators.required, this.noWhitespaceValidator]),
        ud_email: new FormControl('',),

        user_company: new FormControl({ value: 'Exvention Co., Ltd.', disabled: true }, [Validators.required, this.noWhitespaceValidator]),
        dept_name_en: new FormControl(null, [Validators.required]),
        user_contract_name: new FormControl(null, [Validators.required, this.noWhitespaceValidator]),
        user_start_date: new FormControl('', [Validators.required]),

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

    user_resign_at = new FormControl(null, [Validators.required])


    public noWhitespaceValidator(control: FormControl) {
        const isWhitespace = (control.value || '').trim().length === 0;
        const isValid = !isWhitespace;
        return isValid ? null : { 'whitespace': true };
    }

    getAllDepartment() {
        this.editservice.getAllDepartment().subscribe({
            next: (res: any) => {
                this.objDepartment = res.data.deprtments
                this.APIsuccess = true
            },
            error: (err: any) => {
            }
        })
    }




    Submit() {
        this.checkNull()
        this.submitted = true
        if (this.emp.invalid)
            return


        Swal.fire({
            title:
                '<strong style = "font-family:Kanit"> คุณต้องการแก้ไขข้อมูลพนักงาน หรือไม่ ? </strong>',
            icon: 'question',
            showCancelButton: true,
            cancelButtonColor: '#d33',
            cancelButtonText: '<div style = "font-family:Kanit"> ยกเลิก </div>',
            confirmButtonText: '<div style = "font-family:Kanit"> ตกลง </div>',
            confirmButtonColor: '#005FBC',
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {



                let user_id = localStorage.getItem('empPerson')
                let username = "A"
                let aryPosition = []

                for (let i = 0; i < this.Position.length; i++) {
                    aryPosition.push(this.Position[i].positions)
                }

                let datetemp = new Date(String(this.emp.controls.ud_birthday.value))

                let startdate = ""
                let bthdate = ""

                // console.log(this.dateInputBTH)
                // console.log(this.dateInputStart)

                if (this.dateInputBTH) {
                    bthdate = this.datepipe.transform(this.emp.controls.ud_birthday.value, 'YYYY-MM-dd')!;

                    let arydate1 = bthdate.split("-")
                    // console.log(arydate1)
                    let yeartemp = Number(arydate1[0]) + 543
                    arydate1[0] = String(yeartemp)
                    // console.log(arydate1)
                    bthdate = ""
                    for (let i = 0; i < arydate1?.length!; i++) {
                        if (i != arydate1?.length! - 1)
                            bthdate += arydate1![i] + "-"
                        else
                            bthdate += arydate1![i]
                    }
                    // console.log(arydate1)
                    // console.log(bthdate)

                } else {
                    let arydate1 = this.emp.controls.ud_birthday.value?.split("/")
                    for (let i = arydate1?.length! - 1; i > -1; i--) {
                        if (i != 0)
                            bthdate += arydate1![i] + "-"
                        else
                            bthdate += arydate1![i]
                    }
                }


                if (this.dateInputStart) {
                    startdate = this.datepipe.transform(this.emp.controls.user_start_date.value, 'YYYY-MM-dd')!;

                    let arydate1 = startdate.split("-")
                    // console.log(arydate1)
                    let yeartemp = Number(arydate1[0]) + 543
                    arydate1[0] = String(yeartemp)
                    // console.log(arydate1)
                    startdate = ""
                    for (let i = 0; i < arydate1?.length!; i++) {
                        if (i != arydate1?.length! - 1)
                        startdate += arydate1![i] + "-"
                        else
                        startdate += arydate1![i]
                    }
                    // console.log(arydate1)
                    // console.log(startdate)

                } else {
                    let arydate2 = this.emp.controls.user_start_date.value?.split("/")
                    for (let i = arydate2?.length! - 1; i > -1; i--) {
                        if (i != 0)
                            startdate += arydate2![i] + "-"
                        else
                            startdate += arydate2![i]
                    }
                }
                let enddate = null

                let year = new Date()
                let year3 = getFullYear(year)
                let year2 = getFullYear(year) + 543
                // year.setFullYear(year2+543)
                let replaceDate = null
                if (this.user_resign_at.value != null) {
                    enddate = this.datepipe.transform(this.user_resign_at.value, 'YYYY-MM-dd')
                    replaceDate = String(enddate).replace(String(year3), String(year2))
                }


                let fullnameth = this.emp.controls.ud_fullname_th.value?.trim() + " " + this.emp.controls.ud_fullname_th2.value?.trim()
                let fullnameen = this.emp.controls.ud_fullname_en.value?.trim() + " " + this.emp.controls.ud_fullname_en2.value?.trim()

                this.editservice
                    .editData(
                        user_id,
                        this.emp.controls.user_contract_name.value,
                        this.emp.controls.user_company.value,
                        this.emp.controls.ud_prefix_id.value,
                        aryPosition,
                        this.emp.controls.dept_name_en.value,
                        this.emp.controls.ud_email.value,
                        fullnameen,
                        fullnameth,
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
                    )
                    .subscribe({
                        next: (res: any) => {
                              this.router.navigate([`/main/employee/data-person/${user_id}`]);
                        },
                        error: (err: any) => {
                            if (err.status === 403) {

                                this.IDcarderr = true

                                Swal.fire({
                                    icon: 'error',
                                    title: 'รหัสบัตรประชาชนไม่ถูกต้อง',
                                    text: 'กรุณาตรวจสอบเลขบัตรประชาชนอีกครั้ง',
                                })
                            }
                        },
                    });
            }
        });
    }

    onValueChangeDateBTH(event: any) {
        this.dateInputBTH = true
        // console.log(this.dateInputBTH)
    }

    onValueChangeDateStart(event: any) {
        this.dateInputStart = true
        // console.log(this.dateInputStart)
    }

    getPosition(value: any) {
        this.addEmpService.ShowPosition(value).subscribe({
            next: (res: any) => {
                this.positionDept = res.data.dept_potitions
                for (let i = 0; i < this.Position.length; i++) {
                    for (let j = 0; j < Object.keys(this.positionDept).length; j++) {
                        if (this.Position[i].positions == this.positionDept[j].position) {
                            this.positionDept.splice(j, 1);
                        }
                    }
                }
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

    changeDepartment(value: any) {
        this.addEmpService.ShowPosition(value).subscribe({
            next: (res: any) => {
                this.positionDept = res.data.dept_potitions

                for (let i = 0; i < this.Position.length; i++) {
                    delete this.Position[i].positions
                }
                this.Position.splice(1, this.Position.length)
                this.aryPositionCount = [1]

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

    iputNumberOnly(event: any): boolean {
        const charCode = (event.which) ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;
    }

    inputMinusDetect(event: any): boolean {
        const charCode = (event.which) ? event.which : event.keyCode;
        if (charCode == 45) {
            return false;
        }
        return true;
    }

    ngOnInit() {

        this.today = new Date();
        defineLocale('th', thBeLocale);
        this.localeService.use(this.locale);

        this.emp_id = localStorage.getItem('empPerson')

        this.editservice.getUserProfile(this.emp_id).subscribe({
            next: (res: any) => {
                this.objData = res.data
                this.dept_id = this.objData.dept_id
                if (this.objData.ud_picture == null) {
                    this.objData.ud_picture = "/files/image/default.jpg"
                }

                this.Position = this.objData.positions

                for (let i = 0; i < this.Position.length; i++) {
                    this.aryPositionCount.push(i + 1)
                }

                this.getPosition(this.objData.dept_id)

                {
                    let datebth = this.objData.ud_birthday
                    let posit = String(datebth).lastIndexOf('/')
                    let tempdate = String(datebth).substring(0, posit + 1)

                    let tempyear = Number(String(datebth).substring(posit + 1, datebth.length))
                    tempyear += 543
                    this.objData.ud_birthday = tempdate + String(tempyear)
                }

                {
                    let datestart = this.objData.user_start_date
                    let posit1 = String(datestart).lastIndexOf('/')
                    let tempdate1 = String(datestart).substring(0, posit1 + 1)

                    let tempyear1 = Number(String(datestart).substring(posit1 + 1, datestart.length))
                    tempyear1 += 543
                    this.objData.user_start_date = tempdate1 + String(tempyear1)
                }


                this.emp.controls.ud_prefix_id.setValue(this.objData.ud_prefix_id)
                this.emp.controls.ud_fullname_th.setValue(this.objData.ud_firstname_th)
                this.emp.controls.ud_fullname_en.setValue(this.objData.ud_firstname_en)
                this.emp.controls.ud_fullname_th2.setValue(this.objData.ud_lastname_th)
                this.emp.controls.ud_fullname_en2.setValue(this.objData.ud_lastname_en)
                this.emp.controls.ud_nickname.setValue(this.objData.ud_nickname)
                this.emp.controls.ud_birthday.setValue(this.objData.ud_birthday)
                this.emp.controls.ud_id_card.setValue(this.objData.ud_id_card)
                this.emp.controls.ud_phone.setValue(this.objData.ud_phone)
                this.emp.controls.ud_email.setValue(this.objData.ud_email)

                this.emp.controls.user_company.setValue('Exvention Co., Ltd.')
                this.emp.controls.dept_name_en.setValue(this.objData.dept_id)
                this.emp.controls.user_contract_name.setValue(this.objData.user_contract_type, { onlySelf: true })
                this.emp.controls.user_start_date.setValue(this.objData.user_start_date)
                // this.emp.controls.enddate.setValue(this.objData.enddate)

                this.emp.controls.user_sick_day.setValue(this.objData.user_sick_day)
                this.emp.controls.user_leave_day.setValue(this.objData.user_leave_day)
                this.emp.controls.user_take_annual_day.setValue(this.objData.user_take_annual_day)
                this.emp.controls.user_ordination_day.setValue(this.objData.user_ordination_day)
                this.emp.controls.user_military_service_day.setValue(this.objData.user_military_service_day)
                this.emp.controls.user_sterilization_day.setValue(this.objData.user_sterilization_day)
                this.emp.controls.user_maternity_day.setValue(this.objData.user_maternity_day)
                this.emp.controls.user_without_pay_day.setValue(this.objData.user_without_pay_day)
                this.emp.controls.user_resign_day.setValue(this.objData.user_resign_day)

                this.getAllDepartment()
                // console.log("this.dateInputBTH2", this.dateInputBTH)
                // console.log("this.dateInputStart2", this.dateInputStart)
                this.dateInputBTH = false
                this.dateInputStart = false
            },
            error: (error: any) => { },
        });
        // console.log(this.emp_id)
        // console.log("this.aryPositionCount", this.aryPositionCount)

    }

    addInputDeptPosit() {
        // console.log(this.Position);
        let ObjNull = {}

        // console.log(Object.keys(this.Position[this.aryPositionCount.length - 1]).length === 0)


        if (Object.keys(this.Position[this.aryPositionCount.length - 1]).length === 0) {
            alert('กรุณากรอกข้อมูลให้ครบถ้วน');
        } else {
            this.aryPositionCount?.push(this.aryPositionCount.length + 1);
            this.Position.push({});
        }

        // console.log(this.Position.length)
        // console.log(this.aryPositionCount.length)
    }

    selectedPosition() {
        for (let i = 0; i < this.Position.length; i++) {
            //   console.log("loop", this.positionDept)
            //   console.log("objkey", Object.keys(this.positionDept).length)
            for (let j = 0; j < Object.keys(this.positionDept).length; j++) {
                if (this.Position[i].positions == this.positionDept[j].position) {
                    this.positionDept.splice(j, 1);
                }
            }
        }

        if (!this.stateBeforeCheck) {
            //   console.log("not null")
            this.positionDept.push(this.valueStateBefore)
        }
    }

    settingIndex(index: any) {
        this.indexSelect = index
        // console.log(Object.keys(this.Position[this.indexSelect]).length)
        if (Object.keys(this.Position[this.indexSelect]).length == 0) {
            this.stateBeforeCheck = true
        } else {
            this.valueStateBefore = { position: String(this.Position[this.indexSelect].positions) };
            this.stateBeforeCheck = false
        }

    }

    deleteDeptPosit(index: number) {
        // console.log(this.Position)
        // console.log("this.positionDept", this.positionDept)

        if (Object.keys(this.Position[index]).length != 0) {
            let person = { position: String(this.Position[index].positions) }
            this.positionDept.push(person)
        }

        this.Position.splice(index, 1);
        this.aryPositionCount.splice(index, 1);
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
