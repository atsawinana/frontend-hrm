import { Component, OnInit } from '@angular/core';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale, thBeLocale } from 'ngx-bootstrap/chronos';
import Swal from 'sweetalert2';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-add-employee',
    templateUrl: './add-employee.component.html',
    styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

    constructor(private localeService: BsLocaleService) { }

    locale = 'th';
    today!: Date;

    emp = new FormGroup({
        idcard: new FormControl('', Validators.required),
        prefix: new FormControl('', Validators.required),
        fname: new FormControl('', Validators.required),
        lname: new FormControl('', Validators.required),
        nickname: new FormControl('', Validators.required),
        birthdate: new FormControl('', Validators.required),
        phonenumber: new FormControl('', Validators.required),
        email: new FormControl('', Validators.required),
        company: new FormControl('', Validators.required),
        department: new FormControl('', Validators.required),
        posit: new FormControl('', Validators.required),
        typecontract: new FormControl('', Validators.required),
        empid: new FormControl('', Validators.required),
        startdate: new FormControl('', Validators.required),
        usernameid: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
        leavesick: new FormControl('', Validators.required),
        leave: new FormControl('', Validators.required),
        leaveVacation: new FormControl('', Validators.required),
        leaveordination: new FormControl('', Validators.required),
        leavemilitary: new FormControl('', Validators.required),
    })

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
