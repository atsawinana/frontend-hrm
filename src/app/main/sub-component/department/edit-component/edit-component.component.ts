import { Component, ComponentFactoryResolver, OnInit, resolveForwardRef } from '@angular/core';
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
  ArrayPosnumberIndex: number = 0
  deptPosArray = new Array<string>;

  ngOnInit(): void {

    // let promise = new Promise<string>((resolve, reject) => {
    this.dept_id = this.router.snapshot.params['dept_id'];
    //   this.editService.editGetData(this.dept_id).subscribe({
    //     next: (res: any) => {
    //       this.deptInfo = res.data.departments
    //       this.deptMM = res.data.department_map_managers
    //       this.deptPosition = res.data.dept_positions

    //       if (Object.keys(this.deptMM).length > 1) {
    //         for (let i = 0; i < Object.keys(this.deptMM).length; i++) {
    //           var fullname = this.deptMM[i].ud_prefix + " " + this.deptMM[i].ud_fullname_th
    //           this.nameArray = Array(fullname);
    //         }
    //       }
    //       else {
    //         var fullname = this.deptMM[0].ud_prefix + " " + this.deptMM[0].ud_fullname_th
    //         this.nameArray = Array(fullname)
    //       }

    //       if (Object.keys(this.deptPosition).length > 1) {
    //         for (let i = 0; i < Object.keys(this.deptPosition).length; i++) {
    //           var deptName = this.deptPosition[i]!.dp_name_en
    //           this.deptPosArray.push(deptName)
    //         }
    //       } else {
    //       }
    //       resolve('aaa');
    //     },
    //     error: (err) => {
    //       reject();
    //     },
    //   });
    // })

    // promise.then((event) => {


    //   for (let j = 1; j < Object.keys(this.deptPosition).length; j++) {
    //     this.addPos()//เพิ่มช่องตามตัวแปล 
    //   } //เพิ่มช่องตามตัวแปล 

    //   setTimeout(function() {
    //   }, 3000);





    // })

  }

  ngAfterViewInit() {
    this.WaitApiData().then(() => {

      for (let j = 1; j < Object.keys(this.deptPosition).length; j++) {
        this.addPos()//เพิ่มช่องตามตัวแปล 
      } //เพิ่มช่องตามตัวแปล 


      for (let i = 0; i < this.posArray.length + 1; i++) {
        const arrayInput = <HTMLInputElement>document.getElementById(`add-pos${i}`)
        console.log(this.posArray.length)
        console.log(arrayInput)
      }
    })
  }

  async WaitApiData(): Promise<any> {
    this.editService.editGetData(this.dept_id).subscribe({
      next: (res: any) => {
        this.deptInfo = res.data.departments
        this.deptMM = res.data.department_map_managers
        this.deptPosition = res.data.dept_positions

        if (Object.keys(this.deptMM).length > 1) {
          for (let i = 0; i < Object.keys(this.deptMM).length; i++) {
            var fullname = this.deptMM[i].ud_prefix + " " + this.deptMM[i].ud_fullname_th
            this.nameArray = Array(fullname);
          }
        }
        else {
          var fullname = this.deptMM[0].ud_prefix + " " + this.deptMM[0].ud_fullname_th
          this.nameArray = Array(fullname)
        }

        if (Object.keys(this.deptPosition).length > 1) {
          for (let i = 0; i < Object.keys(this.deptPosition).length; i++) {
            var deptName = this.deptPosition[i]!.dp_name_en
            this.deptPosArray.push(deptName)
          }
        } else {
        }

    
      },
      error: (err) => { },
    });
  }

  deptName() {
    var en = <HTMLInputElement>document.getElementById("deptNameEn");
    en.value = this.deptInfo[0].dept_name_en;
    var th = <HTMLInputElement>document.getElementById("deptNameTh");
    th.value = this.deptInfo[0].dept_name_th;
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

  //Remove Position Fields
  removePos(index: number): void {
    this.posArray.removeAt(index);
  }
  //Fields Position Array
  get posArray(): FormArray {
    return <FormArray>this.posForm.get('pos');
  }
}
