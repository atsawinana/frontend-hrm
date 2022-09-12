import { Component, OnInit } from '@angular/core';
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

  dept_name_eng!: string;

  ngOnInit() {
    this.dept_id = this.router.snapshot.params['dept_id'];
    this.editService.editGetData(this.dept_id).subscribe({
      next: (res: any) => {
      //   this.dept_name_eng = res.data.departments.dept_id;

      //   if (res.data.department_map_managers.length != 0) {
      //     console.log(res.data.department_map_managers[0].dmm_id);
      //     console.log(res.data.department_map_managers[0].dmm_username);
      //     console.log(res.data.department_map_managers[0].ud_fullname_th);
      //     console.log(res.data.department_map_managers[0].ud_prefix);
      //   }

      //   console.log(res.data.departments[0].dept_id);
      //   console.log(res.data.departments[0].dept_name_en);
      //   console.log(res.data.departments[0].dept_name_th);

      //   console.log(res.data.dept_positions[0].dp_id);
      //   console.log(res.data.dept_positions[0].dp_name_en);
      //   console.log(res.data.dept_positions[0].dp_name_th);
      },
      error: (err) => {},
    });
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
