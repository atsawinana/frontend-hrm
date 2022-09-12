import { Component, OnInit } from '@angular/core';
import { DepartmentModule } from '../department.module';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { EditComponentService } from './edit-component.service';

@Component({
  selector: 'app-edit-component',
  templateUrl: './edit-component.component.html',
  styleUrls: ['./edit-component.component.css']
})
export class EditComponentComponent implements OnInit {

 

  public bossForm: FormGroup;
  public posForm: FormGroup;
  constructor(private _fb: FormBuilder,private editService : EditComponentService) {
    this.bossForm = this._fb.group({
      boss: this._fb.array([this.addBossField()])
    });
    this.posForm = this._fb.group({
      pos: this._fb.array([this.addPosField()])
    });
  }

  ngOnInit() {
    this.editService.editGetData("");
  }

  //Append Boss Fields Set
  private addBossField(): FormGroup {
    return this._fb.group({
      Name: []
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
      Position: []
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
