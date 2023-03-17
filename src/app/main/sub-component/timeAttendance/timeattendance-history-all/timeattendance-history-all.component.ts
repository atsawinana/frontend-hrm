import { Component, OnInit } from '@angular/core';
import { PaginationInstance } from 'ngx-pagination';
import { DatePipe, Location } from '@angular/common';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale, thBeLocale } from 'ngx-bootstrap/chronos';
import { TimeAttendanceService } from '../time-attendance.service';
import * as XLSX from 'xlsx';
import * as fileSaver from 'file-saver';
const EXCEL_TYPE =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';


@Component({
    selector: 'app-timeattendance-history-all',
    templateUrl: './timeattendance-history-all.component.html',
    styleUrls: ['./timeattendance-history-all.component.css']
})
export class TimeattendanceHistoryAllComponent implements OnInit {

    constructor(private _location: Location, private localeService: BsLocaleService, private serviceTimeatd: TimeAttendanceService, public datepipe: DatePipe,) { }

    ary: any = [1, 2, 3]
    listPerPage: any = 10
    date: any
    objTableHistory: any
    searchInput: any
    checkState: boolean = true
    tableemp: any = "id"
    ngOnInit() {
        defineLocale('th', thBeLocale);
        this.localeService.use('th');


        this.serviceTimeatd.allRequestAttendanceHistory("").subscribe({
            next: (res: any) => {
                this.objTableHistory = res.data.time_attendance
                this.checkState = false;
            },
            error: (err: any) => { }
        })
    }

    searchObject() {

        let startDate = new Date(this.date[0])
        let endDate = new Date(this.date[1])
        let date
        if (isNaN(Number(startDate)) || isNaN(Number(endDate))) {
            date = ""
        }
        else {
            let startDateFormat = startDate.getFullYear() + "-" + Number(startDate.getMonth() + 1) + "-" + startDate.getDate()
            // console.log(startDateFormat)

            let endDateFormat = endDate.getFullYear() + "-" + Number(endDate.getMonth() + 1) + "-" + endDate.getDate()
            // console.log(endDateFormat)
            date = startDateFormat + "," + endDateFormat
        }

        this.serviceTimeatd.getSearch(this.searchInput, date).subscribe({
            next: (res: any) => {
                this.objTableHistory = res.data.time_attendance
            },
            error: (res: any) => { }
        })
    }

    public config: PaginationInstance = {
        id: 'custom',
        itemsPerPage: 10,
        currentPage: 1
    }

    UpdateListPerpage() {
        this.config.itemsPerPage = this.listPerPage
        this.config.currentPage = 1
    }


    backClicked() {
        this._location.back();
    }

    // onOpenCalendar(container: any) {
    //     container.monthSelectHandler = (event: any): void => {
    //         container._store.dispatch(container._actions.select(event.date));
    //     };
    //     container.setViewMode('month');
    // }

    public exportAsExcelFile(): void {
        // let element = document.getElementById(this.tableemp);
        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(JSON.parse(JSON.stringify(this.objTableHistory)));
        // console.log(worksheet)
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
        this.serviceTimeatd.allRequestAttendanceHistory(date).subscribe({
            next: (res: any) => {
                // console.log(res.data)
                this.objTableHistory = res.data.time_attendance
            },
            error: (err: any) => {

            }
        })
    }
}
