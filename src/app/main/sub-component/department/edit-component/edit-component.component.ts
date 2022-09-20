import { Component, OnInit } from '@angular/core';
import { DepartmentModule } from '../department.module';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router, RouterLink } from '@angular/router';
import { EditComponentService } from './edit-component.service';
import { DepartmentService } from '../department.service';

@Component({
  selector: 'app-edit-component',
  templateUrl: './edit-component.component.html',
  styleUrls: ['./edit-component.component.css'],
})
export class EditComponentComponent implements OnInit {
  dept_id!: string;

  constructor(
    private router: ActivatedRoute,
    private editService: EditComponentService,
    private Maindept: DepartmentService
  ) {}

  ObjDept: any = {};
  ObjDeptMana: any = {};
  ObjDeptPosit: any = {};
  DeptUserID: any[] = [];
  countDeptMana: number[] = [];
  countDeptPosit: number[] = [];
  htmlWaitLoad: boolean = false;
  DeptUsername: string[] = [];

  ngOnInit(): void {
    this.Maindept.getAllUser().subscribe({
      next: (res: any) => {
        this.DeptUserID = res.data.users;
      },
      error: (err) => {
        console.log('Failed, input is null');
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

        console.log('res from api', this.ObjDeptMana);

        for (let i = 0; i < Object.keys(this.ObjDeptMana).length; i++) {
          this.countDeptMana[i] = i + 1;
        }
        for (let i = 0; i < Object.keys(this.ObjDeptPosit).length; i++) {
          this.countDeptPosit[i] = i + 1;
        }
      },
      error: (err: any) => {},
    });
  }

  EditData() {
    let nameDeptEN = this.ObjDept.dept_name_en;
    let nameDeptTH = this.ObjDept.dept_name_th;
    let aryNamePosition = new Array<string>();
    let aryUserManager = new Array<string>();

    this.MapUsernameWithID();

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
          console.log('success edit');
          const myModal = document.getElementById('submitEditDone');
          myModal!.focus();
        },
        error: (err: any) => {},
      });
  }

  deleteDeptMana(index: number) {
    this.ObjDeptMana.splice(index, 1);
    this.countDeptMana.splice(index, 1);
    console.log(this.ObjDeptMana);
  }

  deleteDeptPosit(index: number) {
    this.ObjDeptPosit.splice(index, 1);
    this.countDeptPosit.splice(index, 1);
    console.log(this.ObjDeptPosit);
  }

  check() {
    // let aryNamePosition = new Array<string>();
    // for (let i = 0; i < Object.keys(this.ObjDeptPosit).length; i++) {
    //   aryNamePosition[i] = this.ObjDeptPosit[i].dp_name_en;
    // }
    // console.log(aryNamePosition)
    // this.MapUsernameWithID()
    // console.log(this.ObjDeptMana);
    // console.log(this.ObjDeptPosit)
  }

  MapUsernameWithID() {
    console.log('check len', this.DeptUserID.length);
    for (let i = 0; i < Object.keys(this.ObjDeptMana).length; i++) {
      for (let j = 0; j < this.DeptUserID.length; j++) {
        if (
          this.ObjDeptMana[i].ud_fullname_th ===
          this.DeptUserID[j].ud_fullname_th
        ) {
          this.DeptUsername.push(String(this.DeptUserID[j].ud_username));
          console.log(this.DeptUsername[i]);
        }
      }
    }
  }

  addInputDept() {
    // console.log(this.DeptMana);
    console.log(this.countDeptMana.length);
    if (this.countDeptMana.length == 0) {
      this.countDeptMana?.push(
        this.countDeptMana[this.countDeptMana.length - 1] + 1
      );
    } else if (this.ObjDeptMana[this.countDeptMana.length - 1] == null) {
      alert('cannot กรอกให้ครบหน่อย');
    } else {
      this.countDeptMana?.push(
        this.countDeptMana[this.countDeptMana.length - 1] + 1
      );
    }
  }

  addInputDeptPosit() {
    // console.log(this.DeptPosit[this.countDeptPosit.length - 1]);
    console.log(this.countDeptPosit.length);
    if (this.countDeptPosit.length == 0) {
      this.countDeptPosit?.push(
        this.countDeptPosit[this.countDeptPosit.length - 1] + 1
      );
    } else if (this.ObjDeptPosit[this.countDeptPosit.length - 1] == null) {
      alert('cannot กรอกให้ครบหน่อย');
    } else {
      this.countDeptPosit?.push(
        this.countDeptPosit[this.countDeptPosit.length - 1] + 1
      );
    }
  }
}
