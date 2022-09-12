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
        location.reload()
      },
      error: (err: any) => {},
    });
  }
}
