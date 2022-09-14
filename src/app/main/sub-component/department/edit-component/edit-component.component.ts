import {
  Component,
  ComponentFactoryResolver,
  OnInit,
  resolveForwardRef,
} from '@angular/core';
import { DepartmentModule } from '../department.module';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router, RouterLink } from '@angular/router';
import { EditComponentService } from './edit-component.service';

@Component({
  selector: 'app-edit-component',
  templateUrl: './edit-component.component.html',
  styleUrls: ['./edit-component.component.css'],
})
export class EditComponentComponent implements OnInit {
  public bossForm: FormGroup;
  public posForm: FormGroup;
  dept_id!: string;

  constructor(
    private _fb: FormBuilder,
    private router: ActivatedRoute,
    private editService: EditComponentService
  ) {
    this.bossForm = this._fb.group({
      boss: this._fb.array([this.addBossField()]),
    });
    this.posForm = this._fb.group({
      pos: this._fb.array([this.addPosField()]),
    });
  }

  deptInfo!: any;
  deptMM!: any;
  deptPosition!: any;
  nameArray!: Array<any>;
  ArrayPosnumberIndex: number = 0;
  deptPosArray = new Array<string>();

  ObjDept: any;
  ObjDeptMana: any;
  ObjDeptPosit: any;
  dept_name_en!: string;
  dept_name_th!: string;

  ngOnInit(): void {
    this.dept_id = this.router.snapshot.params['dept_id'];

    let promise = new Promise<void>((resolve, reject) => {
      this.WaitApiData();
      resolve();
    });
    promise.then(() => {});
  }

  WaitApiData() {
    this.editService.editGetData(this.dept_id).subscribe({
      next: (res: any) => {
        this.dept_name_en = res.data.departments.dept_name_en;
        this.dept_name_th = res.data.departments.dept_name_th;
        this.ObjDeptMana = res.data.department_map_managers;
        this.ObjDeptPosit = res.data.dept_positions;

        console.log(this.dept_name_en);
        console.log(this.dept_name_th);
        // console.log(this.ObjDeptMana);
        // console.log(this.ObjDeptPosit);

        this.deptName();

        for (let i = 0; i < Object.keys(this.ObjDeptMana).length; i++) {
          if(i>=1)
          this.addBoss()
          console.log(this.ObjDeptMana[i].ud_fullname_en)
          let nameId = "add-boss"+String(i)
          const deptmana = <HTMLInputElement>document.getElementById(nameId)
          deptmana.value = this.ObjDeptMana[i].ud_fullname_en
        }

        for (let i = 0; i < Object.keys(this.ObjDeptPosit).length; i++) {

          if(i>=1)
          this.addPos()
            // console.log(this.ObjDeptPosit.length)
          // console.log(this.ObjDeptPosit[i].dp_name_en)
          // this.posArray.push(this.addPosField().setValue({}));
          // let nameId = "add-pos"+String(i)
          const deptmana = <HTMLInputElement><unknown>document.getElementsByClassName("add-pos")[i]
          console.log(deptmana)

          // if(i>=1)
          // this.addposVal(this.ObjDeptPosit[i])

          // console.log(nameId)
          // console.log("boss array",this.bossArray.at(0))
          // deptmana.value = this.ObjDeptPosit[i].dp_name_en
        }

        return;
      },
      error: (err: any) => {},
    });
  }

  deptName() {
    var en = <HTMLInputElement>document.getElementById('deptNameEn');
    en.value = this.dept_name_en;
    var th = <HTMLInputElement>document.getElementById('deptNameTh');
    th.value = this.dept_name_th;
  }

  //Append Boss Fields Set
  private addBossField(): FormGroup {
    return this._fb.group({
      Name: [],
    });
  }
  //Add Boss Fields
  addBoss(): void {
    this.bossArray.push(this.addBossField());
  }

  //Remove Boss Fields
  removeBoss(index: number): void {
    this.bossArray.removeAt(index);
  }
  //Fields Boss Array
  get bossArray(): FormArray {
    return <FormArray>this.bossForm.get('boss');
  }

  //Append Position Fields Set
  private addPosField(): FormGroup {
    return this._fb.group({
      Position: [],
    });
  }
  //Add Position Fields
  addPos(): void {
    this.posArray.push(this.addPosField());
  }

  // addposVal(value:string)
  // {
  //   this.posArray.push(this.addPosField().setValue(value))
  // }

  //Remove Position Fields
  removePos(index: number): void {
    this.posArray.removeAt(index);
  }
  //Fields Position Array
  get posArray(): FormArray {
    return <FormArray>this.posForm.get('pos');
  }
}
