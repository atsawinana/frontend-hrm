import { Component, OnInit } from '@angular/core';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { LeaveHistoryService } from '../leave-history.service';
import { defineLocale, thBeLocale } from 'ngx-bootstrap/chronos';
import { DatePipe } from '@angular/common';
import * as XLSX from 'xlsx';
import * as fileSaver from 'file-saver';
import { PaginationInstance } from 'ngx-pagination';
const EXCEL_TYPE =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Component({
    selector: 'app-history',
    templateUrl: './history.component.html',
    styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {


    constructor(private localeService: BsLocaleService, private leavehistoryservice: LeaveHistoryService, public datepipe: DatePipe,) { }
    locale = 'th';
    today!: Date;
    objdataTable: any
    role: boolean = false
    objdata: any

    date: any

    searchInput: any

    listPerPage: number = 10

    checkState: boolean = true

    tableemp:any = "id"

    public config: PaginationInstance = {
        id: 'custom',
        itemsPerPage: this.listPerPage,
        currentPage: 1
    }

    ngOnInit() {
        if (localStorage.getItem('roleUser') == "2" || localStorage.getItem('roleUser') == "3") {
            this.role = true
        }

        this.today = new Date();
        defineLocale('th', thBeLocale);
        this.localeService.use(this.locale);

        this.leavehistoryservice.getAllUserHistory("").subscribe({
            next: (res: any) => {
                this.objdataTable = res.data.leave_online
                // console.log(this.objdataTable)

                let startDate = new Date()
                this.date = startDate

                this.checkState = false
            },
            error: (err: any) => {

            }
        })
    }

    UpdateListPerpage() {
        this.config.itemsPerPage = this.listPerPage
        this.config.currentPage = 1
    }

    sortDate() {
        let startDate = new Date(this.date[0])
        let endDate = new Date(this.date[1])

        if (isNaN(Number(startDate)) || isNaN(Number(endDate)))
            return

        let startDateFormat = startDate.getFullYear() + "-" + Number(startDate.getMonth() + 1) + "-" + startDate.getDate()
        // console.log(startDateFormat)

        let endDateFormat = endDate.getFullYear() + "-" + Number(endDate.getMonth() + 1) + "-" + endDate.getDate()
        // console.log(endDateFormat)
        let date = startDateFormat + "," + endDateFormat

        this.leavehistoryservice.getAllUserHistory(date).subscribe({
            next: (res: any) => {
                // console.log(res.data)
                this.objdata = res.data.leave_online
                this.objdataTable = JSON.parse(JSON.stringify(this.objdata));
                delete this.objdataTable.rvac_id;
                delete this.objdataTable.rvac_user_id;
                delete this.objdataTable.rvac_type;
                delete this.objdataTable.rvac_date_start;
                delete this.objdataTable.rvac_date_end;
                delete this.objdataTable.rvac_duration;
                delete this.objdataTable.rvac_amount;
                delete this.objdataTable.rvac_status;
                delete this.objdataTable.rvac_detail;
                delete this.objdataTable.rvac_reason;
                delete this.objdataTable.rvac_special_case;
                delete this.objdataTable.rvac_is_canceled;
                delete this.objdataTable.rvac_update_at;
                delete this.objdataTable.ud_user_id;
                delete this.objdataTable.ud_fullname_en;
                delete this.objdataTable.rvac_approve_status;
                delete this.objdataTable.page;

            },
            error: (err: any) => {

            }
        })
    }

    backClicked() {
        history.back()
    }

    public exportAsExcelFile(): void {
        let element = document.getElementById(this.tableemp);
        const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element, { raw: true } );
        delete worksheet['H1']
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





