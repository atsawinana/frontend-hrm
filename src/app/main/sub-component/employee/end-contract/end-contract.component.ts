import { Component, OnInit } from '@angular/core';
import { PaginationInstance } from 'ngx-pagination';
import { ListDepartmentService } from '../../department/list-department/list-department.service';
import { EndContractService } from './end-contract.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-end-contract',
  templateUrl: './end-contract.component.html',
  styleUrls: ['./end-contract.component.css'],
})
export class EndContractComponent implements OnInit {
  constructor(private empService: EndContractService) {}

  Objemployee: any;
  Objemptable: any;
  listPerPage: number = 10;
  searchInput: string = '';
  elemtable: any;
  LoadingAPI: boolean = false;
  ObjDepartment: any;
  TestModel: any[] = [];

  listPerpage() {
    this.config.itemsPerPage = this.listPerPage;
    this.config.currentPage = 1;
  }

  public config: PaginationInstance = {
    id: 'custom',
    itemsPerPage: this.listPerPage,
    currentPage: 1,
  };

  ngOnInit() {
    this.empService.getAllUser().subscribe({
      next: (res: any) => {
        this.LoadingAPI = true;

        this.Objemployee = res.data.users;
      },
      error: (err: any) => {},
    });

    this.empService.getAllDepartment().subscribe({
      next: (res: any) => {
        this.ObjDepartment = res.data.deprtments;
      },
      error: (err: any) => {},
    });
  }

  loadempFromDepartment() {
    let dept_id = '';
    for (let i = 0; i < this.TestModel.length; i++) {
      if (this.TestModel[i]) {
        dept_id += String(this.ObjDepartment[i].dept_id) + ',';
      }
    }

    this.empService.getEmployeefromDeptID(dept_id).subscribe({
      next: (res: any) => {
        this.Objemployee = res.data.users;
      },
      error: (err: any) => {},
    });
  }

  // exportExcel() {
  //   // const ws:XLSX:WorkSheet = XLSX.utils.table_to_sheet(this.elemtable)
  //   let elem = document.getElementById('tableemp')
  //   XLSX.writeFile((XLSX.utils.table_to_book(elem)), "text.xlsx",)
  //   // XLSX.writeFile((XLSX.utils.table_to_book(elem)),"text.xlsx",)
  // }

  showFilterBox() {
    var x = document.getElementById('filterBox');
    if (x?.style.display === 'none') {
      x.style.display = 'block';
    } else {
      x!.style.display = 'none';
    }
  }
}
