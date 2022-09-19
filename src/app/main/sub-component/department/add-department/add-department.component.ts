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
  DeptUsername:string[] = [];
  DeptUserID: any[] = [];

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
    console.log('check len', this.DeptUserID.length);
    for (let i = 0; i < this.DeptMana.length; i++) {
      for (let j = 0; j < this.DeptUserID.length; j++) {
        
        if(this.DeptMana[i] === this.DeptUserID[j].ud_fullname_th)
        {
          this.DeptUsername.push(String(this.DeptUserID[j].ud_username))
          console.log(this.DeptUsername[i])
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
    this.MapUsernameWithID();
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
        //   }

        //   if (this.naemposition.value == '') {
        //     console.log('not input');
        //     this.alertTextRedNull_namepos();
        //   }

        //   if (this.nameleader.value == '') {
        //     console.log('not input');
        //     this.alertTextRedNull_namelead();
        //   }
        // }
      },
    });
  }

  addInputDept() {
    // console.log(this.DeptMana);
    if (this.DeptMana[this.countDeptMana.length - 1] == null) {
      alert('cannot กรอกให้ครบหน่อย');
    } else {
      this.countDeptMana?.push(
        this.countDeptMana[this.countDeptMana.length - 1] + 1
      );
    }
  }

  addInputDeptPosit() {
    // console.log(this.DeptPosit[this.countDeptPosit.length - 1]);
    if (this.DeptPosit[this.countDeptPosit.length - 1] == null) {
      alert('cannot กรอกให้ครบหน่อย');
    } else {
      this.countDeptPosit?.push(
        this.countDeptPosit[this.countDeptPosit.length - 1] + 1
      );
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

  alertTextRedNull_namedp() {
    let alert = document.getElementById('alertnull_dp');
    alert!.style.display = 'block';
  }

  alertTextRedNull_namepos() {
    let alert = document.getElementById('alertnull_pos');
    alert!.style.display = 'block';
  }

  alertTextRedNull_namelead() {
    let alert = document.getElementById('alertnull_lead');
    alert!.style.display = 'block';
  }

  ClearAlertText_pos() {
    let alertnull = document.getElementById('alertnull_pos');
    alertnull!.style.display = 'none';
  }

  ClearAlertText_dp() {
    let alertnull = document.getElementById('alertnull_dp');
    alertnull!.style.display = 'none';
  }

  ClearAlertText_lead() {
    let alertnull = document.getElementById('alertnull_lead');
    alertnull!.style.display = 'none';
  }
}
