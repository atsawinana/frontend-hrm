import { Component, OnInit } from '@angular/core';
import { PaginationInstance } from 'ngx-pagination';
import { EndContractService } from './end-contract.service';

@Component({
  selector: 'app-end-contract',
  templateUrl: './end-contract.component.html',
  styleUrls: ['./end-contract.component.css'],
})
export class EndContractComponent implements OnInit {
  constructor(private empService: EndContractService) {}

  objemployee: any;
  objemptable: any;
  listPerPage: number = 10;
  searchInput: string = '';
  elemtable: any;
  LoadingAPI: boolean = false;
  objDepartment: any;
  checkMarkAll: boolean = false;
  TestModel: any[] = [];
  aryModel: any[] = [];
  DeptIDemp: string = '';
  tableemp:any = "id"


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

        this.objemployee = res.data.users;
      },
      error: (err: any) => {},
    });

    this.empService.getAllDepartment().subscribe({
      next: (res: any) => {
        this.objDepartment = res.data.deprtments;
      },
      error: (err: any) => {},
    });
  }


  loadempFromDepartment() {
    let dept_id = '';
    for (let i = 0; i < this.aryModel.length; i++) {
      if (this.aryModel[i]) {
        dept_id += String(this.objDepartment[i].dept_id) + ',';
      }
    }

    this.empService.getEmployeefromDeptID(dept_id).subscribe({
      next: (res: any) => {
        this.objemployee = res.data.users;
      },
      error: (err: any) => {},
    });
  }

  setAllValueFilter(value: any) {
    // console.log('this.checkMarkAll', this.checkMarkAll);
    if (this.checkMarkAll) {
      for (let i = 0; i < this.objDepartment.length; i++) {
        this.aryModel[i] = true;
      }
    } else {
      for (let i = 0; i < this.objDepartment.length; i++) {
        this.aryModel[i] = false;
      }
    }
  }


  setValueDepartment(value: any) {
    // console.log('aryModel', this.aryModel);
    // console.log(value);
    this.DeptIDemp += value + ',';
    // console.log(this.DeptIDemp);
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

  
  clearAllValueFilter() {
    this.checkMarkAll = false;
    // console.log('this.checkMarkAllClear', this.checkMarkAll);
    for (let i = 0; i < this.objDepartment.length; i++) {
      this.aryModel[i] = false;
    }
  }


}
