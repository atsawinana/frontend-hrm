import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

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
  
  constructor() { }

  ngOnInit() {
  }

  onSubmit()
  {
    console.log(this.namedepartment_en.value);
    console.log(this.namedepartment_th.value);
    console.log(this.nameleader.value);
    console.log(this.naemposition.value);
      if(this.namedepartment_en.value == ''){
        console.log('1');
      }
  }

  addvalue_lead(){
    var x = document.createElement("INPUT");
    x.setAttribute("_ngcontent-opi-c54","");
    x.setAttribute("type", "text");
    x.setAttribute("class", "form-control-xs h-100 p-12 w-100 style-input");
    var y = document.createElement("DIV");

    document.getElementById("add_lead")!.appendChild(y);
    y.appendChild(x);
  }

  addvalue_position(){
    var element = document.createElement("INPUT");
    element.setAttribute("type", "text");
    element.setAttribute("class", "form-control-xs h-100 p-12 w-100 style-input");

    var y = document.createElement("DIV");

    document.getElementById("add_position")!.appendChild(y);
    y.appendChild(element);
  }

  alertTextRed() {
    let alert = document.getElementById('alert');
    alert!.style.display = 'block';
  }

  alertTextRedNull() {
    let alert = document.getElementById('alertnull');
    alert!.style.display = 'block';
  }

  ClearAlertText() {
    let alertnull = document.getElementById('alertnull');
    alertnull!.style.display = 'none';

    let alert = document.getElementById('alert');
    alert!.style.display = 'none';
  }
  
}
