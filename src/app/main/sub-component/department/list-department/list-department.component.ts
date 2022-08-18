import { Component, OnInit } from '@angular/core';
import { ListDepartmentService } from './list-department.service';

@Component({
  selector: 'app-list-department',
  templateUrl: './list-department.component.html',
  styleUrls: ['./list-department.component.css'],
})
export class ListDepartmentComponent implements OnInit {
  data: any 
  searchInput: any
  depName?: string
  depNum?: string
  depMember?: string
  constructor(private DepService: ListDepartmentService) {}

  ngOnInit() {
    this.DepService.getAllDepartment().subscribe({
      next: (res: any) => {
        this.data  = res.data;
        this.depNum = this.data.dept_id
        this.depName = this.data.dept_name_en
        this.depMember = this.data.number
      },
      error: (err: any) => {},
    });

  }

  numberOnly(event: { which: any; keyCode: any; }): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      console.log('event.which',event.which)
      console.log('event.keyCode',event.keyCode)
      return true;
    }
    console.log('event.which',event.which)
    console.log('event.keyCode',event.keyCode)
    return false;

  }

}
