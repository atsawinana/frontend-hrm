import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AdddepartmentService } from './adddepartment.service';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.css']
})
export class AddDepartmentComponent implements OnInit {
  name = 'Dynamic Add Fields';
  values = [];
  namedepartment_en = new FormControl('');
  namedepartment_th = new FormControl('');
  nameleader = new FormControl('');
  naemposition = new FormControl('');
  isSuccess?: boolean;

  constructor(private _fb: FormBuilder,private Add_dp: AdddepartmentService) {
    this.bossForm = this._fb.group({
      boss: this._fb.array([this.addBossField()])
    });
    this.posForm = this._fb.group({
      pos: this._fb.array([this.addPosField()])
    });
  }

  ngOnInit() {
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

  onSubmit()
  {
    this.ClearAlertText_dp();
    this.ClearAlertText_lead();
    this.ClearAlertText_pos();

    this.Add_dp.adddepartment(this.namedepartment_en.value!,this.namedepartment_th.value!,this.naemposition.value!,this.nameleader.value!).subscribe({
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
      }
  })
  }


  public bossForm: FormGroup;
  public posForm: FormGroup;
  
  

  //Append Boss Fields Set
  private addBossField(): FormGroup {
    return this._fb.group({
      Name: []
    });
  }
  //Add Boss Fields
  addBoss(): void {
    this.bossArray.push(this.addBossField());
    console.log("bossArray: ",this.bossArray.length)
  }

  //Remove Boss Fields
  removeBoss(index: number): void {
    this.bossArray.removeAt(index);
    console.log("bossArray: ",this.bossArray.length)
  }
  //Fields Boss Array
  get bossArray(): FormArray {
    return <FormArray>this.bossForm.get('boss');
  }

  //Append Position Fields Set
  private addPosField(): FormGroup {
    return this._fb.group({
      Position: []
    });
  }
  //Add Position Fields
  addPos(): void {
    const check = document.getElementById('')
    this.posArray.push(this.addPosField());
    console.log("posArray: ",this.posArray.length)
  }

  //Remove Position Fields
  removePos(index: number): void {
    this.posArray.removeAt(index);
    console.log("posArray: ",this.posArray.length)
  }
  //Fields Position Array
  get posArray(): FormArray {
    return <FormArray>this.posForm.get('pos');
  }

}


