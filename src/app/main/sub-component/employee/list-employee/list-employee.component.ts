import { Component, OnInit } from '@angular/core';
import { PaginationInstance } from 'ngx-pagination';
import { ListDepartmentService } from '../../department/list-department/list-department.service';
import { ListEmployeeService } from './list-employee.service';
import * as XLSX from 'xlsx'
import * as fileSaver from 'file-saver';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Component({
    selector: 'app-list-employee',
    templateUrl: './list-employee.component.html',
    styleUrls: ['./list-employee.component.css']
})
export class ListEmployeeComponent implements OnInit {

    constructor(private empService: ListEmployeeService) { }

    Objemployee: any
    Objemptable: any
    listPerPage: number = 10
    searchInput: string = ''
    elemtable: any
    ObjDepartment: any
    DeptIDemp: string = ""
    TestModel: any[] = []
    ApiSuccess: boolean = false

    public config: PaginationInstance = {
        id: 'custom',
        itemsPerPage: this.listPerPage,
        currentPage: 1
    }

    setValueDepartment(value: any) {
        console.log(this.TestModel)
        console.log(value)
        this.DeptIDemp += value + ','
        console.log(this.DeptIDemp)
    }

    ngOnInit() {

        localStorage.setItem("overbtn", "true")

        this.empService.getAllUser().subscribe({
            next: (res: any) => {
                this.Objemployee = res.data.employee
                this.Objemptable = JSON.parse(JSON.stringify(this.Objemployee))
                for (let i = 0; i < this.Objemptable.length; i++) {
                    delete this.Objemptable[i].user_username
                    delete this.Objemptable[i].ud_fullname_en
                    delete this.Objemptable[i].page
                }
                this.ApiSuccess = true
            },
            error: (err: any) => {

            }
        })

        this.empService.getAllDepartment().subscribe({
            next: (res: any) => {
                this.ObjDepartment = res.data.deprtments
                // console.log(this.ObjDepartment)
                // for (let i = 0; i < this.ObjDepartment.length; i++) {
                //     this.TestModel.push(true)
                // }
            },
            error: (err: any) => {
            }
        })
    }



    loadempFromDepartment() {

        let dept_id = ""
        console.log("dept", this.ObjDepartment)
        for (let i = 0; i < this.TestModel.length; i++) {
            if (this.TestModel[i]) {
                dept_id += String(this.ObjDepartment[i].dept_id) + ","
            }
        }

        console.log(dept_id)

        this.empService.getEmployeefromDeptID(dept_id).subscribe({
            next: (res: any) => {
                console.log(res.data.employee)
                this.Objemptable = res.data.employee
                for (let i = 0; i < this.Objemptable.length; i++) {
                    delete this.Objemptable[i].user_username
                    delete this.Objemptable[i].ud_fullname_en
                    delete this.Objemptable[i].page
                }
                console.log(this.Objemptable)
            },
            error: (err: any) => { }
        })
    }


    listPerpage() {
        this.config.itemsPerPage = this.listPerPage
        this.config.currentPage = 1
    }

    exportExcel() {
        // const ws:XLSX:WorkSheet = XLSX.utils.table_to_sheet(this.elemtable)
        let elem = document.getElementById('tableemp')
        // XLSX.writeFile((XLSX.utils.to), "text.xlsx",)
        // XLSX.writeFile((XLSX.utils.table_to_book(elem)),"text.xlsx",)
    }

    public exportAsExcelFile(): void {

        let ExptExcel = JSON.parse(JSON.stringify(this.Objemptable))
        console.log(this.Objemptable)
        for (let i = 0; i < ExptExcel.length; i++) {
            ExptExcel[i].ไอดีพนักงาน = ExptExcel[i]['number'];
            ExptExcel[i].ตำแหน่ง = ExptExcel[i]['position'];
            ExptExcel[i].ชื่อภาษาไทย = ExptExcel[i]['ud_fullname_th'];
            ExptExcel[i].รหัสพนักงาน = ExptExcel[i]['user_card_number'];
            ExptExcel[i].วันที่เข้างาน = ExptExcel[i]['user_created_at'];
            ExptExcel[i].แผนก = ExptExcel[i]['dept_name_en'];
            delete ExptExcel[i].id;
            delete ExptExcel[i].position;
            delete ExptExcel[i].ud_fullname_th;
            delete ExptExcel[i].user_card_number;
            delete ExptExcel[i].user_created_at;
            delete ExptExcel[i].dept_name_en;
            delete ExptExcel[i].number;
        }
        console.log(ExptExcel)

        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(ExptExcel);
        const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "data");
    }
    private saveAsExcelFile(buffer: any, fileName: string): void {
        const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
        fileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    }

    showFilterBox() {
        var x = document.getElementById("filterBox");
        if (x?.style.display === "none") {
            x.style.display = "block";
        } else {
            x!.style.display = "none";
        }
    }
}
