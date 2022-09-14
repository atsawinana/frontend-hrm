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
  onPageNext: number = this.onPage + 1;
  maxListDept?: any;
  dept_name!: string;
  dept_creat!: string;
  dept_post!: any;
  dept_manager!: any;
  deptIDDelete:any;
  countDept:number[] = []

  constructor(private DepService: ListDepartmentService) {}
  ngOnInit() {
    this.DepService.getAllDepartment().subscribe({
      next: (res: any) => {
        this.deprtmentsData = res.data.deprtments;
        this.maxListDept = res.data.max_dept;
        for (let i = 0; i < this.deprtmentsData.length ; i++) {
          this.countDept[i] = i+1;
        }
        Array(this.deprtmentsData).push({number:this.countDept})
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
    const list = (<HTMLSelectElement>document.getElementById('listPerPage')).value;
    this.listPerPage = Number(list);
    this.onPage = 1;
    this.onPageNext = this.onPage + 1
  }

  increasePage() {
    let DeptNum = this.maxListDept;
    let maxPage = Math.ceil(Number(DeptNum) / Number(this.listPerPage));
    if (this.onPage < maxPage) {
      this.onPage++;
      this.onPageNext++;
    } else {
      const list = <HTMLSelectElement>(
        document.getElementsByClassName('buttonPage')
      );

      for (var i = 0; i < list.length; i++) {
        list[i].classList.remove('buttonPage:hover');
      }
    }
  }

  DecreasePage() {
    if (this.onPage > 1) {
      this.onPage--;
      this.onPageNext--;
    }
  }
  Delete_Department() {
    this.DepService.DeleletDepartment(this.deptIDDelete).subscribe({
      next: (res: any) => {},
      error: (err: any) => {},
    });
  }

  SetDeptID(deptID: string){
    this.deptIDDelete = deptID
  } 

  DetailDept(event: any) {
    this.DepService.DetailDepartment(event).subscribe({
      next: (res: any) => {
        this.dept_name = res.data.departments.dept_name_th;
        this.dept_creat = res.data.departments.dept_created_date;
        this.dept_post = res.data.dept_positions;
        this.dept_manager = res.data.department_map_managers;
  
      },
      error: (err: any) => {},
    });
  }

  reload() {
    location.reload();
  }
}
