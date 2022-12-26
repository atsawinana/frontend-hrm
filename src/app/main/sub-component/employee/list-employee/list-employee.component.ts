import { Component, OnInit } from '@angular/core';
import { PaginationInstance } from 'ngx-pagination';
import { ListDepartmentService } from '../../department/list-department/list-department.service';
import { ListEmployeeService } from './list-employee.service';
import * as XLSX from 'xlsx';
import * as fileSaver from 'file-saver';
const EXCEL_TYPE =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css'],
})
export class ListEmployeeComponent implements OnInit {
  constructor(private empService: ListEmployeeService) {}

  objemployee: any;
  objemptable: any;
  listPerPage: number = 10;
  searchInput: string = '';
  elemtable: any;
  objDepartment: any;
  DeptIDemp: string = '';
  aryModel: any[] = [];
  ApiSuccess: boolean = false;

  checkMarkAll: boolean = false;

  role:any = localStorage.getItem('roleUser')

  listPerpage() {
    this.config.itemsPerPage = this.listPerPage;
    this.config.currentPage = 1;
  }

  public config: PaginationInstance = {
    id: 'custom',
    itemsPerPage: this.listPerPage,
    currentPage: 1,
  };

  setValueDepartment(value: any) {
    // console.log('aryModel', this.aryModel);
    // console.log(value);
    this.DeptIDemp += value + ',';
    // console.log(this.DeptIDemp);
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

  clearAllValueFilter() {
    this.checkMarkAll = false;
    // console.log('this.checkMarkAllClear', this.checkMarkAll);
    for (let i = 0; i < this.objDepartment.length; i++) {
      this.aryModel[i] = false;
    }
  }

  ngOnInit() {
    localStorage.setItem('overbtn', 'true');
    this.empService.getAllUser().subscribe({
      next: (res: any) => {
        this.objemployee = res.data.employee;
        this.objemptable = JSON.parse(JSON.stringify(this.objemployee));
        for (let i = 0; i < this.objemptable.length; i++) {
          delete this.objemptable[i].user_username;
          delete this.objemptable[i].ud_fullname_en;
          delete this.objemptable[i].page;
          delete this.objemptable[i].user_created_at;
        }
        // console.log(this.objemptable)
        this.ApiSuccess = true;
      },
      error: (err: any) => {},
    });

    this.empService.getAllDepartment().subscribe({
      next: (res: any) => {
        this.objDepartment = res.data.deprtments;
        // console.log(this.objDepartment)
        // for (let i = 0; i < this.objDepartment.length; i++) {
        //     this.aryModel.push(true)
        // }
      },
      error: (err: any) => {},
    });
  }

  loadempFromDepartment() {
    let dept_id = '';
    // console.log('dept', this.objDepartment);
    for (let i = 0; i < this.aryModel.length; i++) {
      if (this.aryModel[i]) {
        dept_id += String(this.objDepartment[i].dept_id) + ',';
      }
    }

    // console.log(dept_id);

    this.empService.getEmployeefromDeptID(dept_id).subscribe({
      next: (res: any) => {
        // console.log(res.data.employee);
        this.objemptable = res.data.employee;
        for (let i = 0; i < this.objemptable.length; i++) {
          delete this.objemptable[i].user_username;
          delete this.objemptable[i].ud_fullname_en;
          delete this.objemptable[i].page;
        }
        // console.log(this.objemptable);
      },
      error: (err: any) => {},
    });
  }

  exportExcel() {
    // const ws:XLSX:WorkSheet = XLSX.utils.table_to_sheet(this.elemtable)
    let elem = document.getElementById('tableemp');
    // XLSX.writeFile((XLSX.utils.to), "text.xlsx",)
    // XLSX.writeFile((XLSX.utils.table_to_book(elem)),"text.xlsx",)
  }

  public exportAsExcelFile(): void {
    let ExptExcel = JSON.parse(JSON.stringify(this.objemptable));
    // console.log(this.objemptable);
    for (let i = 0; i < ExptExcel.length; i++) {
      ExptExcel[i].ไอดีพนักงาน = ExptExcel[i]['number'];
      ExptExcel[i].รหัสพนักงาน = ExptExcel[i]['user_card_number'];
      ExptExcel[i].แผนก = ExptExcel[i]['dept_name_en'];
      ExptExcel[i].ตำแหน่ง = ExptExcel[i]['position'];
      ExptExcel[i]['ชื่อ-สกุล'] = ExptExcel[i]['ud_fullname_th'];
      ExptExcel[i].วันที่เข้างาน = this.objemployee[i]['user_created_at'];
      delete ExptExcel[i].id;
      delete ExptExcel[i].position;
      delete ExptExcel[i].ud_fullname_th;
      delete ExptExcel[i].user_card_number;
      delete ExptExcel[i].user_created_at;
      delete ExptExcel[i].dept_name_en;
      delete ExptExcel[i].number;
    }
    // console.log(ExptExcel);

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(ExptExcel);
    const workbook: XLSX.WorkBook = {
      Sheets: { data: worksheet },
      SheetNames: ['data'],
    };
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });
    this.saveAsExcelFile(excelBuffer, 'data');
  }
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    fileSaver.saveAs(
      data,
      fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION
    );
  }

  showFilterBox() {
    var x = document.getElementById('filterBox');
    if (x?.style.display === 'none') {
      x.style.display = 'block';
    } else {
      x!.style.display = 'none';
    }
  }
}
