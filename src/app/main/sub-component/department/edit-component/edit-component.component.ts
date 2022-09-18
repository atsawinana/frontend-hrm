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
  dept_id!: string;

  constructor(
    private _fb: FormBuilder,
    private router: ActivatedRoute,
    private editService: EditComponentService
  ) {}

  deptInfo!: any;
  deptMM!: any;
  deptPosition!: any;
  nameArray!: Array<any>;
  ArrayPosnumberIndex: number = 0;
  deptPosArray = new Array<string>();

  ObjDept: any;
  ObjDeptMana: any;
  ObjDeptPosit: any;

  ngOnInit(): void {
    this.dept_id = this.router.snapshot.params['dept_id'];
    this.WaitApiData()
  }

  WaitApiData() {
    this.editService.editGetData(this.dept_id).subscribe({
      next: (res: any) => {
        // this.ObjDept = res.data.departments
        // this.ObjDeptPosit = res.data.dept_positions
        // this.ObjDeptMana = res.data.department_map_managers
        // console.log(this.ObjDept)
        // console.log(this.ObjDeptPosit)
        // console.log(this.ObjDeptMana)
      },
      error: (err: any) => {

      },
    });
  }
}
