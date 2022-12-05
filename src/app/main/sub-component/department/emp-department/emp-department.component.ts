import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaginationInstance } from 'ngx-pagination';
import { EmpDepartmentService } from './emp-department.service';
import * as XLSX from 'xlsx';
import * as fileSaver from 'file-saver';
const EXCEL_TYPE =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Component({
  selector: 'app-emp-department',
  templateUrl: './emp-department.component.html',
  styleUrls: ['./emp-department.component.css'],
})
export class EmpDepartmentComponent implements OnInit {
  constructor(
    private router: ActivatedRoute,
    private service: EmpDepartmentService
  ) {}
  dept_id: any;
  objemployee: any;
  objemptable: any;
  listPerPage: number = 10;
  searchInput: string = '';

  ngOnInit() {
    this.dept_id = this.router.snapshot.params['dept_id'];

    this.service.showEmployeeInDepartment(this.dept_id).subscribe({
      next: (res: any) => {
          this.objemployee = res.data.employee;
          this.objemptable = JSON.parse(JSON.stringify(this.objemployee));
          for (let i = 0; i < this.objemptable.length; i++) {
            delete this.objemptable[i].user_username;
            delete this.objemptable[i].ud_fullname_en;
            delete this.objemptable[i].page;
            delete this.objemptable[i].user_created_at;
          }
        console.log(res.data.employee);
        //   this.ApiSuccess = true;
      },
      error: (err: any) => {},
    });
  }

  listPerpage() {
    this.config.itemsPerPage = this.listPerPage;
    this.config.currentPage = 1;
  }

  public config: PaginationInstance = {
    id: 'custom',
    itemsPerPage: this.listPerPage,
    currentPage: 1,
  };

  exportExcel() {
    // const ws:XLSX:WorkSheet = XLSX.utils.table_to_sheet(this.elemtable)
    let elem = document.getElementById('tableemp');
    // XLSX.writeFile((XLSX.utils.to), "text.xlsx",)
    // XLSX.writeFile((XLSX.utils.table_to_book(elem)),"text.xlsx",)
  }

  public exportAsExcelFile(): void {
    let ExptExcel = JSON.parse(JSON.stringify(this.objemptable));
    console.log(this.objemptable);
    for (let i = 0; i < ExptExcel.length; i++) {
      ExptExcel[i].ไอดีพนักงาน = ExptExcel[i]['number'];
      ExptExcel[i].รหัสพนักงาน = ExptExcel[i]['user_card_number'];
      ExptExcel[i]['ชื่อ-สกุล'] = ExptExcel[i]['ud_fullname_th'];
      ExptExcel[i].ตำแหน่ง = ExptExcel[i]['positions'];
      ExptExcel[i].วันที่เข้างาน = ExptExcel[i]['start_date'];
      delete ExptExcel[i].user_id;
      delete ExptExcel[i].positions;
      delete ExptExcel[i].ud_fullname_th;
      delete ExptExcel[i].user_card_number;
      delete ExptExcel[i].user_created_at;
      delete ExptExcel[i].dept_name_en;
      delete ExptExcel[i].number;
      delete ExptExcel[i].start_date;
      delete ExptExcel[i].user_start_date;
      
    }
    console.log(ExptExcel);

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
}
