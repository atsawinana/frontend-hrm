import { Component, OnInit } from '@angular/core';
import { DepartmentModule } from '../department.module';

@Component({
  selector: 'app-edit-component',
  templateUrl: './edit-component.component.html',
  styleUrls: ['./edit-component.component.css']
})
export class EditComponentComponent implements OnInit {

  constructor() { }

  countDept:any = 0
  countBoss:number = 0

  ngOnInit() {
  }

  getOnlyElement(){
    let elem = document.getElementsByClassName("iconDept")[this.countBoss]
    elem.classList.add('showDisplay');
    // elem.addEventListener('click',this.deleteDept()!)

  }

  addDept() {
     const add = document.getElementById("deptOrigin")!
     const clone = add.cloneNode(true)
     document.getElementById("dept")?.appendChild(clone) 
     this.countBoss++
     this.getOnlyElement()
  }

   deleteDept(){
    console.log('delete')
    let elem1 = document.getElementsByClassName("OriginalDiv")[this.countBoss]
    elem1.remove()
    this.countBoss--
  }

  addPos() {
    const add = document.getElementById("add-pos")!
    const clone = add.cloneNode(true)
    document.getElementById("pos")?.appendChild(clone) 
    this.countDept++
 }
}
