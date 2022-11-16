import { Component, OnInit, ViewChild } from '@angular/core';
import { DepartmentModule } from '../department.module';
import { Form, FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Route, Router, RouterLink } from '@angular/router';
import { EditComponentService } from './edit-component.service';
import { DepartmentService } from '../department.service';
import { AuthService } from 'src/app/auth/auth.service';
import { NgSelectComponent } from '@ng-select/ng-select';
import Swal from 'sweetalert2';
import { MainService } from 'src/app/main/main.service';

@Component({
    selector: 'app-edit-component',
    templateUrl: './edit-component.component.html',
    styleUrls: ['./edit-component.component.css'],

})

export class EditComponentComponent implements OnInit {
    @ViewChild(NgSelectComponent) ngSelect!: NgSelectComponent;

    constructor(
        private router: ActivatedRoute,
        private editService: EditComponentService,
        private Maindept: DepartmentService,
        private route: Router,
        private main: MainService
    ) { }
    form!: FormGroup;
    dept_id!: string;
    ObjDept: any = {};
    ObjDeptMana: any = {};
    ObjDeptPosit: any = {};
    DeptUserID: any[] = [];
    countDeptMana: number[] = [];
    countDeptPosit: number[] = [];
    DeptUsername: string[] = [];
    nullCheck: boolean = false;
    checkLoadAPI: boolean = false
    CheckNullMana: boolean[] = [];
    CheckNullPosit: boolean[] = [];
    CheckNullDeptNameEN = false;
    CheckNullDeptNameTH = false;
    CheckallMana = false;
    CheckallPosit = false;
    checkMapfalse: boolean = false;
    UserSelected: any[] = [];

    indexSelect: any
    stateBeforeCheck: boolean = false
    valueStateBefore: any

    ngOnInit(): void {
        this.dept_id = this.router.snapshot.params['dept_id'];
        this.WaitApiData();
    }

    async WaitApiData() {
        this.editService.editGetData(this.dept_id).subscribe({
            next: (res: any) => {
                this.ObjDept = res.data.departments;
                this.ObjDeptPosit = res.data.dept_positions;
                this.ObjDeptMana = res.data.department_map_managers;
                for (let i = 0; i < Object.keys(this.ObjDeptMana).length; i++) {
                    this.countDeptMana[i] = i + 1;
                }
                for (let i = 0; i < Object.keys(this.ObjDeptPosit).length; i++) {
                    this.countDeptPosit[i] = i + 1;
                }

                this.Maindept.getAllUser().subscribe({
                    next: (res: any) => {
                        this.DeptUserID = res.data.users;
                        this.UserSelected = JSON.parse(JSON.stringify(this.DeptUserID))

                        //check user name for select
                        for (let i = 0; i < Object.keys(this.ObjDeptMana).length; i++) {
                            for (let j = 0; j < this.DeptUserID.length; j++) {
                                if (this.ObjDeptMana[i].ud_fullname_th === this.DeptUserID[j].ud_fullname_th) {
                                    this.DeptUserID.splice(j, 1);
                                }
                            }
                        }

                        this.checkLoadAPI = true
                    },
                    error: (err) => {
                        // console.log('Failed, input is null');
                    },
                });

            },
            error: (err: any) => {
                if (err.status === 419) {
                    Swal.fire({
                        icon: 'warning',
                        title: 'เซสชั่นหมดอายุ',
                        text: 'กรุณา Login ใหม่ เพื่อใช้งาน',
                    }).then((e) => {
                        this.route.navigate(['']);
                    })
                } else {
                    this.main.Error()
                }
            },
        });
    }

    userSelected() {
        for (let i = 0; i < Object.keys(this.ObjDeptMana).length; i++) {
            for (let j = 0; j < this.DeptUserID.length; j++) {
                if (this.ObjDeptMana[i].ud_fullname_th === this.DeptUserID[j].ud_fullname_th) {
                    this.DeptUserID.splice(j, 1);
                }
            }
        }

        if (!this.stateBeforeCheck) {
            console.log("not null")
            this.DeptUserID.push(this.valueStateBefore)
        }
    }

    settingIndex(index: any) {

        console.log(this.DeptUserID)
        this.indexSelect = index
        console.log(Object.keys(this.ObjDeptMana[this.indexSelect]).length)
        if (Object.keys(this.ObjDeptMana[this.indexSelect]).length == 0) {
            this.stateBeforeCheck = true
        } else {
            this.valueStateBefore = { ud_fullname_th: String(this.ObjDeptMana[this.indexSelect].ud_fullname_th) };
            this.stateBeforeCheck = false
        }

    }

    EditData() {

    }

    deleteDeptMana(index: number) {

        let person = { ud_fullname_th: String(this.ObjDeptMana[index].ud_fullname_th) };
        // console.log(this.ObjDeptMana[index].ud_fullname_th)
        // console.log(this.DeptUserID)
        this.DeptUserID.push(person);

        this.ObjDeptMana.splice(index, 1)
        this.countDeptMana.splice(index, 1);

    }

    deleteDeptPosit(index: number) {
        if (!this.ObjDeptPosit[index].can_delete) {
            this.ObjDeptPosit.splice(index, 1);
            this.countDeptPosit.splice(index, 1);
        }
    }

    checkDeltePosit(index: number): boolean {
        if (!this.ObjDeptPosit[index].can_delete) {
            return false
        } else {
            return true
        }
    }

    checkNull() {
        this.CheckNullMana = [];
        this.CheckNullPosit = [];
        this.CheckNullDeptNameEN = false;
        this.CheckNullDeptNameTH = false;
        this.CheckallMana = false;
        this.CheckallPosit = false;

        if (this.ObjDept.dept_name_en.trim() == '') {
            this.CheckNullDeptNameEN = true;
        }
        if (this.ObjDept.dept_name_th == '') {
            this.CheckNullDeptNameTH = true;
        }

        for (let i = 0; i < this.ObjDeptPosit.length; i++) {
            if (Object.keys(this.ObjDeptPosit[i]).length === 0 || this.ObjDeptPosit[i].dp_name_en.trim() == "") {
                this.CheckNullPosit[i] = true;
                this.CheckallPosit = true;
            } else {
                this.CheckNullPosit[i] = false;
            }
        }

        for (let i = 0; i < this.ObjDeptMana.length; i++) {
            if (Object.keys(this.ObjDeptMana[i]).length === 0 || this.ObjDeptMana[i].ud_fullname_th.trim() == "") {
                this.CheckNullMana[i] = true;
                this.CheckallMana = true;
            } else {
                this.CheckNullMana[i] = false;
            }
        }

        if (this.CheckNullDeptNameEN == false) {
            if (this.CheckallMana == false) {
                if (this.CheckallPosit == false) {
                    Swal.fire({
                        title: '<strong style = "font-family:Kanit"> คุณต้องการแก้ไขแผนกใช่หรือไม่ </strong>',
                        icon: 'warning',
                        showCancelButton: true,
                        cancelButtonColor: '#d33',
                        cancelButtonText: '<div style = "font-family:Kanit"> ยกเลิก </div>',
                        confirmButtonText: '<div style = "font-family:Kanit"> ตกลง </div>',
                        confirmButtonColor: '#005FBC',
                        reverseButtons: true
                    }).then((result) => {
                        if (result.isConfirmed) {
                            this.MapUsernameWithID();

                            this.cencelNullCheck()
                            let nameDeptEN = this.ObjDept.dept_name_en;
                            let nameDeptTH = this.ObjDept.dept_name_th;
                            let aryNamePosition = new Array<string>();
                            let aryUserManager = new Array<string>();

                            for (let i = 0; i < Object.keys(this.ObjDeptPosit).length; i++) {
                                aryNamePosition[i] = this.ObjDeptPosit[i].dp_name_en;
                            }

                            for (let i = 0; i < Object.keys(this.ObjDeptMana).length; i++) {
                                aryUserManager[i] = this.ObjDeptMana[i].dmm_username;
                            }

                            this.editService
                                .editData(
                                    this.dept_id,
                                    nameDeptEN,
                                    aryNamePosition,
                                    this.DeptUsername,
                                    'fix',
                                    nameDeptTH
                                )
                                .subscribe({
                                    next: (res: any) => {
                                        Swal.fire({
                                            title: '<strong style = "font-family:Kanit"> แก้ไขแผนกสำเร็จ </strong>',
                                            html: '<div style = "font-family:Kanit"> คุณได้แก้ไขข้อมูลแผนกนี้เรียบร้อยแล้ว </div>',
                                            icon: 'success',
                                            confirmButtonColor: '#005FBC',
                                            confirmButtonText: '<div style = "font-family:Kanit"> ตกลง </div>'

                                        }).then((e) => {
                                            this.route.navigate(["../main/department"])
                                        })
                                    },
                                    error: (err: any) => {
                                        // console.log(err.status)
                                        if (err.status === 419) {
                                            Swal.fire({
                                                icon: 'warning',
                                                title: 'เซสชั่นหมดอายุ',
                                                text: 'กรุณา Login ใหม่ เพื่อใช้งาน',
                                            }).then((e) => {
                                                this.route.navigate(['']);
                                            })
                                        } else {
                                            this.main.Error()
                                        }
                                    },
                                });
                        }
                    })
                }
            }
        }

        // console.log('nullen', this.CheckNullDeptNameEN);
        // console.log('nullth', this.CheckNullDeptNameTH);
        // console.log('nullposit', this.CheckNullPosit);
        // console.log('nulklmana', this.CheckNullMana);
        // console.log('1234', this.ObjDeptMana);
    }

    cencelNullCheck() {
        this.nullCheck = false;
    }

    MapUsernameWithID() {
        // console.log('check len', this.DeptUserID.length);
        // console.log('1', this.ObjDeptMana);
        // console.log('2', this.UserSelected);
        for (let i = 0; i < Object.keys(this.ObjDeptMana).length; i++) {
            for (let j = 0; j < this.UserSelected.length; j++) {
                if (
                    this.ObjDeptMana[i].ud_fullname_th ==
                    this.UserSelected[j].ud_fullname_th
                ) {
                    this.DeptUsername.push(String(this.UserSelected[j].ud_username));
                } else if (this.ObjDeptMana[i] == "") {
                    this.ObjDeptMana[i].pop();
                }
            }
        }
    }

    addSelect(event: any) {
        // console.log(event)
    }

    addInputDept() {
        // console.log(this.ObjDeptMana)
        if (Object.keys(this.ObjDeptMana).length == 0) {
            this.countDeptMana?.push(
                this.countDeptMana[this.countDeptMana.length - 1] + 1
            );
            this.ObjDeptMana.push({});
        } else
            if (
                Object.keys(this.ObjDeptMana[this.countDeptMana.length - 1]).length === 0
            ) {
                Swal.fire({
                    icon: 'warning',
                    title: '<strong style = "font-family:Kanit"> กรุณากรอกข้อมูลให้ครบถ้วน </strong>',
                    showConfirmButton: false,
                    backdrop: true,
                    timer: 1000,
                    allowOutsideClick: true
                })
            } else {
                this.countDeptMana?.push(
                    this.countDeptMana[this.countDeptMana.length - 1] + 1
                );
                this.ObjDeptMana.push({});
            }
    }

    addInputDeptPosit() {
        // console.log(this.DeptPosit[this.countDeptPosit.length - 1]);

        if (Object.keys(this.ObjDeptPosit).length == 0) {
            this.countDeptPosit?.push(
                this.countDeptPosit[this.countDeptPosit.length - 1] + 1
            );
            this.ObjDeptPosit.push({});
        } else

            if (
                Object.keys(this.ObjDeptPosit[this.countDeptPosit.length - 1]).length ===
                0
            ) {
                Swal.fire({
                    icon: 'warning',
                    title: '<strong style = "font-family:Kanit"> กรุณากรอกข้อมูลให้ครบถ้วน </strong>',
                    showConfirmButton: false,
                    backdrop: true,
                    timer: 1000,
                    allowOutsideClick: true
                })
            } else {
                this.countDeptPosit?.push(
                    this.countDeptPosit[this.countDeptPosit.length - 1] + 1
                );
                this.ObjDeptPosit.push({});
            }
    }
    checkCancel() {
        Swal.fire({
            title: '<strong style = "font-family:Kanit"> คุณต้องการยกเลิกการแก้ไขแผนกใช่หรือไม่ </strong>',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#005FBC',
            cancelButtonColor: '#d33',
            confirmButtonText: '<div style = "font-family:Kanit"> ตกลง </div>',
            cancelButtonText: '<div style = "font-family:Kanit"> ยกเลิก </div>',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                this.route.navigate(['../main/department']);
            }
        })
    }

}
