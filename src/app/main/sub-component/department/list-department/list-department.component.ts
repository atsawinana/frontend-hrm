import { Component, OnInit } from '@angular/core';
import { ListDepartmentService } from './list-department.service';

@Component({
  selector: 'app-list-department',
  templateUrl: './list-department.component.html',
  styleUrls: ['./list-department.component.css'],
})
export class ListDepartmentComponent implements OnInit {
  selected?: any;
  deprtmentsData: any;
  searchInput: any;
  listPerPage: number = 5;
  onPage: number = 1;
  onPageNext: number = this.onPage+1;
  maxListDept?: any;
  dept_name!:string
  dept_creat!:string
  dept_post!:any
  dept_manager!:any

  constructor(private DepService: ListDepartmentService) {}
  ngOnInit() {
    this.DepService.getAllDepartment().subscribe({
      next: (res: any) => {
        this.deprtmentsData = res.data.deprtments;
        this.maxListDept = res.data.max_dept;
      },
      error: (err: any) => {},
    });
  }

  numberOnly(event: { which: any; keyCode: any }): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return true;
    }
    return false;
  }

  listPerpage() {
    const list = (<HTMLSelectElement>document.getElementById('listPerPage'))
      .value;
    this.listPerPage = Number(list);
  }

  increasePage() {
    let DeptNum = this.maxListDept;
    let maxPage = Math.ceil(Number(DeptNum) / Number(this.listPerPage));
    if (this.onPage < maxPage) {
      this.onPage++;
      this.onPageNext++;
    }
  }
  DecreasePage() {
    if (this.onPage > 1) {
      this.onPage--;
      this.onPageNext--;
    }
  }
  Delete_Department(deptID:string) {
    this.DepService.DeleletDepartment(deptID).subscribe({
      next: (res: any) => {
      },
      error: (err: any) => {},
    });
  }

  DetailDept(event:any){
    this.DepService.DetailDepartment(event).subscribe({
      next: (res: any) => {
        this.dept_name = res.data.departments.dept_name_th
        this.dept_creat = res.data.departments.dept_created_date
        this.dept_post = res.data.dept_positions
        this.dept_manager = res.data.department_map_managers
      },
      error: (err: any) => {},
    });
  }

  reload(){
    location.reload()

  }
}
