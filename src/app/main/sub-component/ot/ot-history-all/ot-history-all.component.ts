import { Component, OnInit } from '@angular/core';
import { DatePipe, Location } from '@angular/common';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale, thBeLocale } from 'ngx-bootstrap/chronos';
import { PaginationInstance } from 'ngx-pagination';
import { OtService } from '../ot.service';
import * as XLSX from 'xlsx';
import * as fileSaver from 'file-saver';
const EXCEL_TYPE =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Component({
    selector: 'app-ot-history-all',
    templateUrl: './ot-history-all.component.html',
    styleUrls: ['./ot-history-all.component.css']
})
export class OtHistoryAllComponent implements OnInit {


    constructor(private _location: Location, public datepipe: DatePipe, private localeService: BsLocaleService, private otService: OtService) { }

    checkState: boolean = true
    listPerPage: any = 10
    objTableHistory: any;
    date: any = ""
    tableemp: any = "idTable"

    ngOnInit() {
        defineLocale('th', thBeLocale);
        this.localeService.use('th');

        this.otService.requestOvertimeAllHistory("").subscribe({
            next: (res: any) => {
                this.objTableHistory = res.data.req_overtimes
                this.checkState = false
            },
            error: (err: any) => { }
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
        history.back()
    }

    onOpenCalendar(container: any) {
        container.monthSelectHandler = (event: any): void => {
            container._store.dispatch(container._actions.select(event.date));
        };
        container.setViewMode('month');
    }

    sortDate() {
        // console.log((this.date))

        let startDate = new Date(this.date[0])
        let endDate = new Date(this.date[1])

        if (isNaN(Number(startDate)) || isNaN(Number(endDate)))
            return

        let startDateFormat = startDate.getFullYear() + "-" + Number(startDate.getMonth() + 1) + "-" + startDate.getDate()
        // console.log(startDateFormat)

        let endDateFormat = endDate.getFullYear() + "-" + Number(endDate.getMonth() + 1) + "-" + endDate.getDate()
        // console.log(endDateFormat)
        let date = startDateFormat + "," + endDateFormat
        this.otService.requestOvertimeAllHistory(date).subscribe({
            next: (res: any) => { this.objTableHistory = res.data.req_overtimes },
            error: (err: any) => { }
        })
    }

    public exportAsExcelFile(): void {
  
        let element = document.getElementById(this.tableemp);
        const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
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
