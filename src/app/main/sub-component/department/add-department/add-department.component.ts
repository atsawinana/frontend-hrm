import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
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
  OpString!: number[];
  DeptMana: string[] = [];

  constructor(private Add_dp: AdddepartmentService) {}

  ngOnInit() {
    this.OpString = [1];
  }

  onSubmit() {
    this.ClearAlertText_dp();
    this.ClearAlertText_lead();
    this.ClearAlertText_pos();

    this.Add_dp.adddepartment(
      this.namedepartment_en.value!,
      this.namedepartment_th.value!,
      this.naemposition.value!,
      this.nameleader.value!
    ).subscribe({
      next: (res: any) => {
        console.log('Success, input are correct');
        this.isSuccess = true;
      },
      error: (err) => {
        console.log('Failed, input is null');
        this.isSuccess = false;
        if (this.isSuccess == false) {
          if (this.namedepartment_en.value == '') {
            console.log('not input');
            this.alertTextRedNull_namedp();
          }

          if (this.naemposition.value == '') {
            console.log('not input');
            this.alertTextRedNull_namepos();
          }

          if (this.nameleader.value == '') {
            console.log('not input');
            this.alertTextRedNull_namelead();
          }
        }
      },
    });
  }

  addInputDept() {
    console.log(this.DeptMana[this.OpString.length - 1])
    if (this.DeptMana[this.OpString.length - 1] == null) {
      alert('cannot กรอกให้ครบหน่อย');
    } else {
      this.OpString?.push(this.OpString[this.OpString.length - 1] + 1);
    }
  }

  deleteInputDept() {}

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
