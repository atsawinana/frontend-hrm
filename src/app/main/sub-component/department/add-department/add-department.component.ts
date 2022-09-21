import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DepartmentService } from '../department.service';
import { AdddepartmentService } from './adddepartment.service';

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

  constructor(
    private Add_dp: AdddepartmentService,
    private Maindept: DepartmentService
  ) {}

  ngOnInit() {
    this.Maindept.getAllUser().subscribe({
      next: (res: any) => {
        this.DeptUserID = res.data.users;
      },
      error: (err) => {
        console.log('Failed, input is null');
      },
    });

    this.countDeptMana = [1];
    this.countDeptPosit = [1];
  }

  MapUsernameWithID() {
    console.log('check mana', this.countDeptMana.length);
    console.log('check len', this.DeptUserID.length);

    for (let i = 0; i < this.countDeptMana.length; i++) {
      for (let j = 0; j < this.DeptUserID.length; j++) {
        if (this.DeptMana[i] == this.DeptUserID[j].ud_fullname_th) {
          this.DeptUsername.push(String(this.DeptUserID[j].ud_username));
          console.log('map check', this.DeptUsername[i]);
        } else if (this.DeptMana[i] == '') {
          this.DeptUsername.pop();
        }
        // console.log('mana i',this.DeptMana[i]);
        // console.log('uid j',this.DeptUserID[j].ud_fullname_th,'id',this.DeptUserID[j].ud_id);
      }
      // if (this.DeptMana[i] == this.DeptUserID[i].ud_fullname_th) {
      //   console.log(this.DeptUserID[i].ud_id);
      // }
    }
  }

  onSubmit() {
    this.cancelModal()
    console.log(this.namedepartment_en.value);
    console.log(this.namedepartment_th.value);
    console.log(this.DeptPosit);
    console.log(this.DeptUsername);

    this.Add_dp.adddepartment(
      this.namedepartment_en.value!,
      this.namedepartment_th.value!,
      this.DeptPosit!,
      this.DeptUsername!
    ).subscribe({
      next: (res: any) => {
        console.log('Success, input are correct');
        this.isSuccess = true;
      },
      error: (err) => {
        console.log('Failed, input is null');
        this.isSuccess = false;
      },
    });
  }

  addInputDept() {
    // console.log(this.DeptMana);
    if (this.DeptMana[this.countDeptMana.length - 1] == null) {
      alert('cannot กรอกให้ครบหน่อย');
    } else {
      this.countDeptMana?.push(this.countDeptMana.length + 1);
      console.log(this.countDeptMana);
    }
  }

  addInputDeptPosit() {
    // console.log(this.DeptPosit[this.countDeptPosit.length - 1]);
    if (this.DeptPosit[this.countDeptPosit.length - 1] == null) {
      alert('cannot กรอกให้ครบหน่อย');
    } else {
      this.countDeptPosit?.push(this.countDeptPosit.length + 1);
    }
  }

  deleteDept(index: number) {
    this.countDeptMana.splice(index, 1);
    this.DeptMana.splice(index, 1);
  }

  deleteInputDept(index: number) {
    this.countDeptPosit.splice(index, 1);
    this.DeptPosit.splice(index, 1);
  }

  checkNull() {
    this.CheckNullMana = [];
    this.CheckNullPosit = [];
    this.CheckNullDeptNameEN = false;
    this.CheckNullDeptNameTH = false;

    this.CheckallMana = false;
    this.CheckallPosit = false;

    this.MapUsernameWithID();
    if (this.namedepartment_en.value == '') {
      this.CheckNullDeptNameEN = true;
    }
    if (this.namedepartment_th.value == '') {
      this.CheckNullDeptNameTH = true;
    }

    for (let i = 0; i < this.countDeptPosit.length; i++) {
      console.log('check posit', this.DeptPosit[i]);
      if (this.DeptPosit[i] == undefined || this.DeptPosit[i] == '') {
        this.CheckNullPosit[i] = true;
        this.CheckallPosit = true;
      } else {
        this.CheckNullPosit[i] = false;
      }
    }

    for (let i = 0; i < this.countDeptMana.length; i++) {
      console.log('check mana', this.DeptUsername[i]);
      if (this.DeptUsername[i] == undefined) {
        this.CheckNullMana[i] = true;
        this.CheckallMana = true;
      } else {
        this.CheckNullMana[i] = false;
      }
    }

    console.log(this.CheckNullDeptNameEN);
    console.log(this.CheckallMana);
    console.log(this.CheckallPosit);

    if (this.CheckNullDeptNameEN == false) {
      if (this.CheckallMana == false) {
        if (this.CheckallPosit == false) {
          this.ModalCheck = true;
        }
      }
    }

    console.log('nullen', this.CheckNullDeptNameEN);
    console.log('nullth', this.CheckNullDeptNameTH);
    console.log('nullposit', this.CheckNullPosit);
    console.log('nulklmana', this.CheckNullMana);
    console.log('check deptPosit ', this.DeptPosit);
  }

  cancelModal() {
    this.ModalCheck = false;
  }
}
