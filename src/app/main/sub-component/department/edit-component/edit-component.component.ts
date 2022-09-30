import { Component, OnInit, ViewChild } from '@angular/core';
import { DepartmentModule } from '../department.module';
import { Form ,FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Route, Router, RouterLink } from '@angular/router';
import { EditComponentService } from './edit-component.service';
import { DepartmentService } from '../department.service';
import { AuthService } from 'src/app/auth/auth.service';
import { NgSelectComponent } from '@ng-select/ng-select';

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
        private coreToken: AuthService
    ) {}
    form!: FormGroup;
    dept_id!: string;
    ObjDept: any = {};
    ObjDeptMana: any = {};
    ObjDeptPosit: any = {};
    DeptUserID: any[] = [];
    countDeptMana: number[] = [];
    countDeptPosit: number[] = [];
    htmlWaitLoad: boolean = false;
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

    ngOnInit(): void {
        this.Maindept.getAllUser().subscribe({
            next: (res: any) => {
                this.DeptUserID = res.data.users;
                this.UserSelected = JSON.parse(JSON.stringify(this.DeptUserID))
                // console.log(this.UserSelected)
            },
            error: (err) => {
                // console.log('Failed, input is null');
            },
        });
        this.dept_id = this.router.snapshot.params['dept_id'];
        this.WaitApiData();
    }

    async WaitApiData() {
        this.editService.editGetData(this.dept_id).subscribe({
            next: (res: any) => {
                this.ObjDept = res.data.departments;
                this.ObjDeptPosit = res.data.dept_positions;
                this.ObjDeptMana = res.data.department_map_managers;
                this.htmlWaitLoad = true;
                for (let i = 0; i < Object.keys(this.ObjDeptMana).length; i++) {
                    this.countDeptMana[i] = i + 1;
                }
                for (let i = 0; i < Object.keys(this.ObjDeptPosit).length; i++) {
                    this.countDeptPosit[i] = i + 1;
                }
                this.checkLoadAPI = true
            },
            error: (err: any) => {
                if (err.status === 401) {
                    this.coreToken.reFreshToken().subscribe({
                        next: (res: any) => {
                            this.WaitApiData();
                        },
                        error: (res: any) => {
                            this.coreToken.Logout()
                        }
                    })
                }
            },
        });
    }

    EditData() {
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
                    // console.log('success edit');
                },
                error: (err: any) => {
                    if (err.status === 401) {
                        this.coreToken.reFreshToken().subscribe({
                            next: (res: any) => {
                                this.EditData();
                            },
                            error: (res: any) => {
                                this.coreToken.Logout()
                            }
                        })
                    }
                },
            });
    }

    deleteDeptMana(index: number) {
        this.ObjDeptMana.splice(index, 1);
        this.countDeptMana.splice(index, 1);
    }

    deleteDeptPosit(index: number) {
        if (!this.ObjDeptPosit[index].can_delete) {
            this.ObjDeptPosit.splice(index, 1);
            this.countDeptPosit.splice(index, 1);
        }
    }

    checkDeltePosit(index: number): boolean {
        if (this.ObjDeptPosit[index].can_delete) {
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

        if (this.ObjDept.dept_name_en == '') {
            this.CheckNullDeptNameEN = true;
        }
        if (this.ObjDept.dept_name_th == '') {
            this.CheckNullDeptNameTH = true;
        }

        // console.log('1', this.ObjDeptPosit);
        // console.log('2', this.ObjDeptMana);
        // console.log(this.ObjDeptPosit.length);
        // console.log(Object.keys(this.ObjDeptPosit[0]).length === 0);

        for (let i = 0; i < this.ObjDeptPosit.length; i++) {
            if (Object.keys(this.ObjDeptPosit[i]).length === 0 || this.ObjDeptPosit[i].dp_name_en == "") {
                this.CheckNullPosit[i] = true;
                this.CheckallPosit = true;
            } else {
                this.CheckNullPosit[i] = false;
            }
        }

        for (let i = 0; i < this.ObjDeptMana.length; i++) {
            if (Object.keys(this.ObjDeptMana[i]).length === 0 || this.ObjDeptMana[i].ud_fullname_th == "") {
                this.CheckNullMana[i] = true;
                this.CheckallMana = true;
            } else {
                this.CheckNullMana[i] = false;
            }
        }

        if (this.CheckNullDeptNameEN == false) {
            if (this.CheckallMana == false) {
                if (this.CheckallPosit == false) {
                    this.nullCheck = true;
                }
            }
        }

        // console.log('nullen', this.CheckNullDeptNameEN);
        // console.log('nullth', this.CheckNullDeptNameTH);
        // console.log('nullposit', this.CheckNullPosit);
        // console.log('nulklmana', this.CheckNullMana);
        console.log('1234', this.ObjDeptMana);
    }

    cencelNullCheck() {
        this.nullCheck = false;
    }

    MapUsernameWithID() {
        // console.log('check len', this.DeptUserID.length);
        for (let i = 0; i < Object.keys(this.ObjDeptMana).length; i++) {
            for (let j = 0; j < this.DeptUserID.length; j++) {
                if (
                    this.ObjDeptMana[i].ud_fullname_th ===
                    this.DeptUserID[j].ud_fullname_th
                ) {
                    this.DeptUsername.push(String(this.DeptUserID[j].ud_username));
                } else if (this.ObjDeptMana[i] == "") {
                    this.ObjDeptMana[i].pop();
                }
            }
        }
    }

    addSelect(event: any) {
        console.log(event)
    }

    addInputDept() {
        console.log(this.ObjDeptMana)
        if (
            Object.keys(this.ObjDeptMana[this.countDeptMana.length - 1]).length === 0
        ) {
            alert('กรุณากรอกข้อมูลให้ครบถ้วน');
        } else {
            this.countDeptMana?.push(
                this.countDeptMana[this.countDeptMana.length - 1] + 1
            );
            this.ObjDeptMana.push({});
        }
    }

    addInputDeptPosit() {
        // console.log(this.DeptPosit[this.countDeptPosit.length - 1]);
        if (
            Object.keys(this.ObjDeptPosit[this.countDeptPosit.length - 1]).length ===
            0
        ) {
            alert('กรุณากรอกข้อมูลให้ครบถ้วน');
        } else {
            this.countDeptPosit?.push(
                this.countDeptPosit[this.countDeptPosit.length - 1] + 1
            );
            this.ObjDeptPosit.push({});
        }
    }

}
