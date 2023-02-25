import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DepartmentService } from '../department.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
    selector: 'app-add-department',
    templateUrl: './add-department.component.html',
    styleUrls: ['./add-department.component.css'],
})
export class AddDepartmentComponent implements OnInit {
    name = 'Dynamic Add Fields';
    namedepartment_en = new FormControl('');
    namedepartment_th = new FormControl('');
    nameleader = new FormControl('');
    naemposition = new FormControl('');
    isSuccess?: boolean;
    countDeptMana!: number[];
    countDeptPosit!: number[];
    DeptMana: string[] = [];
    DeptPosit: string[] = [];
    DeptUsername: string[] = [];
    DeptUserID: any[] = [];
    CheckNullMana: boolean[] = [];
    CheckNullPosit: boolean[] = [];
    CheckNullDeptNameEN!: boolean;
    CheckNullDeptNameTH!: boolean;
    ModalCheck: boolean = false;
    CheckallMana: boolean = false;
    CheckallPosit: boolean = false;
    checkLoadAPI: boolean = false;
    UserSelected: any[] = [];


    indexSelect: any
    stateBeforeCheck: boolean = false
    valueStateBefore: any

    constructor(
        private department_service: DepartmentService,
        private Maindept: DepartmentService,
        private router: Router,
    ) { }

    ngOnInit() {
        this.getAllUser();

        this.countDeptMana = [1];
        this.countDeptPosit = [1];
        this.checkLoadAPI = true;
    }

    MapUsernameWithID() {

        for (let i = 0; i < this.countDeptMana.length; i++) {
            for (let j = 0; j < this.UserSelected.length; j++) {
                if (this.DeptMana[i] == this.UserSelected[j].ud_fullname_th) {
                    this.DeptUsername.push(String(this.UserSelected[j].ud_username));
                    // console.log('map check', this.DeptUsername[i]);
                } else if (this.DeptMana[i] == '') {
                    this.DeptUsername.pop();
                }
            }
        }
    }

    onSubmit() { }

    getAllUser() {
        this.Maindept.getAllUser().subscribe({
            next: (res: any) => {
                this.DeptUserID = res.data.users;
                this.UserSelected = JSON.parse(JSON.stringify(this.DeptUserID));
            },
            error: (err) => {
            },
        });
    }

    userSelected() {
        for (let i = 0; i < Object.keys(this.DeptMana).length; i++) {
            for (let j = 0; j < this.DeptUserID.length; j++) {
                if (this.DeptMana[i] === this.DeptUserID[j].ud_fullname_th) {
                    this.DeptUserID.splice(j, 1);
                }
            }
        }

        if (!this.stateBeforeCheck) {
            this.DeptUserID.push(this.valueStateBefore)
        }
    }

    settingIndex(index: any) {
        this.indexSelect = index
        if (this.DeptMana[this.indexSelect] == undefined) {
            this.stateBeforeCheck = true
        } else {
            this.valueStateBefore = { ud_fullname_th: String(this.DeptMana[this.indexSelect]) };
            this.stateBeforeCheck = false
        }
    }

    addInputDept() {
        if (this.DeptMana[this.countDeptMana.length - 1] == null) {
            Swal.fire({
                icon: 'warning',
                title: '<strong style = "font-family:Kanit"> กรุณากรอกข้อมูลให้ครบถ้วน </strong>',
                showConfirmButton: false,
                backdrop: true,
                timer: 1000,
                allowOutsideClick: true
            }).then((m)=>{
                if(m.dismiss){
                    Swal.close()
                }
            })
        } else {
            this.countDeptMana?.push(this.countDeptMana.length + 1);
        }
    }

    addInputDeptPosit() {
        if (this.DeptPosit[this.countDeptPosit.length - 1] == null) {
            Swal.fire({
                icon: 'warning',
                title: '<strong style = "font-family:Kanit"> กรุณากรอกข้อมูลให้ครบถ้วน </strong>',
                showConfirmButton: false,
                backdrop: true,
                timer: 1000,
                allowOutsideClick: true
            })
        } else {
            this.countDeptPosit?.push(this.countDeptPosit.length + 1);
        }
    }

    deleteDept(index: number) {
        let person = { ud_fullname_th: String(this.DeptMana[index]) };
        // console.log(this.ObjDeptMana[index].ud_fullname_th)
        // console.log(this.DeptUserID)
        this.DeptUserID.push(person);

        this.countDeptMana.splice(index, 1);
        this.DeptMana.splice(index, 1);
    }

    deleteInputDept(index: number) {
        this.countDeptPosit.splice(index, 1);
        this.DeptPosit.splice(index, 1);
    }

    checkCancel() {
        Swal.fire({
            title: '<strong style = "font-family:Kanit"> คุณต้องการยกเลิกการเพิ่มแผนกใช่หรือไม่ </strong>',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#005FBC',
            cancelButtonColor: '#d33',
            confirmButtonText: '<div style = "font-family:Kanit"> ตกลง </div>',
            cancelButtonText: '<div style = "font-family:Kanit"> ยกเลิก </div>',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                this.router.navigate(['../main/department']);
            }
        })
    }
    checkNull() {
        this.CheckNullMana = [false];
        this.CheckNullPosit = [false];
        this.CheckNullDeptNameEN = false;
        this.CheckNullDeptNameTH = false;
        this.CheckallMana = false;
        this.CheckallPosit = false;

        if (
            this.namedepartment_en.value?.trim() == '' &&
            this.namedepartment_en.value != null
        ) {
            this.CheckNullDeptNameEN = true;
        }
        if (
            this.namedepartment_th.value?.trim() == '' &&
            this.namedepartment_th.value != null
        ) {
            this.CheckNullDeptNameTH = true;
        }

        // if (this.namedepartment_th.value. == ''){}

        for (let i = 0; i < this.countDeptPosit.length; i++) {
            // console.log('check posit', this.DeptPosit[i]);
            if (this.DeptPosit[i] == undefined || this.DeptPosit[i].trim() == '') {
                this.CheckNullPosit[i] = true;
                this.CheckallPosit = true;
            } else {
                this.CheckNullPosit[i] = false;
            }
        }

        for (let i = 0; i < this.countDeptMana.length; i++) {
            // console.log('check mana', this.DeptMana[i]);
            if (
                this.DeptMana[i] == undefined ||
                Object.keys(this.DeptMana[i]).length === 0
            ) {
                this.CheckNullMana[i] = true;
                this.CheckallMana = true;
            } else {
                this.CheckNullMana[i] = false;
            }
        }
        // console.log("asd", this.DeptUsername);
        // console.log(this.CheckNullDeptNameEN);
        // console.log(this.CheckallMana);
        // console.log(this.CheckallPosit);

        if (this.CheckNullDeptNameEN == false) {
            if (this.CheckallMana == false) {
                if (this.CheckallPosit == false) {
                    Swal.fire({
                        title: '<strong style = "font-family:Kanit"> คุณต้องการเพิ่มแผนกใช่หรือไม่ </strong>',
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#005FBC',
                        cancelButtonColor: '#d33',
                        confirmButtonText: '<div style = "font-family:Kanit"> ตกลง </div>',
                        cancelButtonText: '<div style = "font-family:Kanit"> ยกเลิก </div>',
                        reverseButtons: true
                    }).then((result) => {
                        if (result.isConfirmed) {
                            this.cancelModal();
                            this.MapUsernameWithID();

                            this.department_service.adddepartment(
                                this.namedepartment_en.value!,
                                this.namedepartment_th.value!,
                                this.DeptPosit!,
                                this.DeptUsername!
                            ).subscribe({
                                next: (res: any) => {
                                    Swal.fire({
                                        title: '<strong style = "font-family:Kanit"> เพิ่มแผนกสำเร็จ </strong>',
                                        html: ' <div style = "font-family:Kanit"> คุณได้เพิ่มแผนกนี้เรียบร้อยแล้ว </div>',
                                        icon: 'success',
                                        confirmButtonColor: '#005FBC',
                                        confirmButtonText: '<div style = "font-family:Kanit"> ตกลง </div>'
                                    }).then((e) => {
                                        this.router.navigate(['../main/department']);
                                    });
                                },
                                error: (err) => {
                                },
                            });
                        }
                    });
                }
            }
        }

    }

    cancelModal() {
        this.ModalCheck = false;
    }

}
