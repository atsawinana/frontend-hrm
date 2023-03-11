import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginationInstance } from 'ngx-pagination';
import { EmpDepartmentService } from './emp-department.service';
import * as XLSX from 'xlsx';
import * as fileSaver from 'file-saver';
import { DepartmentService } from '../department.service';
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
        private active_route: ActivatedRoute,
        private department_service: DepartmentService,
        private router: Router
    ) { }
    dept_id: any;
    objemployee: any;
    objemptable: any;
    listPerPage: number = 10;
    searchInput: string = '';
    tableemp: any = "id"

    ngOnInit() {
        this.dept_id = this.active_route.snapshot.params['dept_id'];

        this.department_service.showEmployeeInDepartment(this.dept_id).subscribe({
            next: (res: any) => {
                this.objemployee = res.data.employee;
                this.objemptable = JSON.parse(JSON.stringify(this.objemployee));
                for (let i = 0; i < this.objemptable.length; i++) {
                    delete this.objemptable[i].user_username;
                    delete this.objemptable[i].ud_fullname_en;
                    delete this.objemptable[i].page;
                    delete this.objemptable[i].user_created_at;
                }
                //   this.ApiSuccess = true;
            },
            error: (err: any) => { },
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
        let element = document.getElementById(this.tableemp);
        console.log(element)
        const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element, { raw: true });
        console.log(worksheet)
        delete worksheet['F1']
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

    navigateEmp(id: any) {
        this.router.navigate([`/main/employee/data-person/${id}`]);
    }
}
