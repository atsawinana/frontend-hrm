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

    constructor(private _location: Location,private localeService: BsLocaleService, private serviceTimeatd: TimeAttendanceService,public datepipe: DatePipe,) { }

    ary: any = [1, 2, 3]
    listPerPage: any = 10
    date:any
    objTableHistory: any
    searchInput:any

    ngOnInit() {
        defineLocale('th', thBeLocale);
        this.localeService.use('th');


        this.serviceTimeatd.allRequestAttendanceHistory("").subscribe({
            next: (res: any) => {
                this.objTableHistory = res.data.time_attendance
            },
            error: (err: any) => {}
        })
    }

    public config: PaginationInstance = {
        id: 'custom',
        itemsPerPage: 10,
        currentPage: 1
    }

    UpdateListPerpage() {
        this.config.itemsPerPage = this.listPerPage
    }


    backClicked() {
        this._location.back();
    }

    onOpenCalendar(container: any) {
        container.monthSelectHandler = (event: any): void => {
            container._store.dispatch(container._actions.select(event.date));
        };
        container.setViewMode('month');
    }

    public exportAsExcelFile(): void {
        let ExptExcel = JSON.parse(JSON.stringify(this.objTableHistory));
        console.log(this.objTableHistory);
        for (let i = 0; i < ExptExcel.length; i++) {
            ExptExcel[i].ลำดับ = ExptExcel[i]['ta_number'];
            ExptExcel[i].รหัสพนักงาน = ExptExcel[i]['user_card_number'];
            ExptExcel[i].รายชื่อ = ExptExcel[i]['ud_fullname_th'];
            ExptExcel[i].วันที่ทำงาน = ExptExcel[i]['ta_date'];
            ExptExcel[i].จำนวนชั่วโมงที่ทำงาน = ExptExcel[i]['ta_amount'];
            ExptExcel[i].หมายเหตุ = ExptExcel[i]['ta_detail'];

            delete ExptExcel[i].ta_number;
            delete ExptExcel[i].user_card_number;
            delete ExptExcel[i].ud_fullname_th;
            delete ExptExcel[i].ta_date;
            delete ExptExcel[i].ta_amount;
            delete ExptExcel[i].ta_detail;
        }

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

    sortdate() {
        if (this.date == "" || this.date == null)
            return
        console.log(this.date)
        let startDate = this.datepipe.transform(this.date, 'yyyy-MM-dd')

        let arydate1 = startDate!.toString().split("-")
        // console.log("test1", arydate1)
        arydate1[0] = (Number(arydate1[0]) + 543).toString()


        let date = arydate1[0] + "-" + arydate1[1]

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
