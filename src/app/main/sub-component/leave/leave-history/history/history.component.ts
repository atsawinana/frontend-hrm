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
    objdata:any

    date: any

    searchInput:any

    listPerPage: number = 10

    ApiSuccess:boolean = false

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

                this.ApiSuccess = true
            },
            error: (err: any) => {

            }
        })
    }

    UpdateListPerpage(){
        this.config.itemsPerPage = this.listPerPage
    }

    onOpenCalendar(container: any) {
        container.monthSelectHandler = (event: any): void => {
            container._store.dispatch(container._actions.select(event.date));
        };
        container.setViewMode('month');
    }

    sortdate() {
        if(this.date == "" || this.date == null)
            return
        // console.log(this.date)
        let startDate = this.datepipe.transform(this.date, 'yyyy-MM-dd')

        let arydate1 = startDate!.toString().split("-")
        // console.log("test1", arydate1)
        arydate1[0] = (Number(arydate1[0]) + 543).toString()


        let date = arydate1[0] + "-" + arydate1[1]

        this.leavehistoryservice.getAllUserHistory(date).subscribe({
            next: (res: any) => {
                // console.log(res.data)
                this.objdata =  res.data.leave_online
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

    public exportAsExcelFile(): void {
        let ExptExcel = JSON.parse(JSON.stringify(this.objdataTable));
        // console.log(this.objdataTable);
        for (let i = 0; i < ExptExcel.length; i++) {
          ExptExcel[i].ลำดับ = ExptExcel[i]['number'];
          ExptExcel[i].รหัสพนักงาน	 = ExptExcel[i]['user_card_number'];
          ExptExcel[i].รายชื่อ = ExptExcel[i]['ud_fullname_th'];
          ExptExcel[i].ประเภทการลา	 = ExptExcel[i]['rvac_type_name'];
          ExptExcel[i].วันที่ยื่นลา = ExptExcel[i]['rvac_created_at'];
          ExptExcel[i].วันที่ต้องการลา = ExptExcel[i]['rvac_date'];
          ExptExcel[i].ช่วงเวลาในการลา = ExptExcel[i]['rvac_duration_time'];
          ExptExcel[i]['รวมวันที่ลา/ชั่วโมง'] = ExptExcel[i]['rvac_sum_duration'];
          ExptExcel[i]['สถานะ'] = ExptExcel[i]['rvac_status_name'];
          
          delete ExptExcel[i].number;
          delete ExptExcel[i].user_card_number;
          delete ExptExcel[i].ud_fullname_th;
          delete ExptExcel[i].rvac_type_name;
          delete ExptExcel[i].rvac_created_at;
          delete ExptExcel[i].rvac_date;
          delete ExptExcel[i].rvac_duration_time;
          delete ExptExcel[i].rvac_sum_duration;
          delete ExptExcel[i].rvac_status_name;

          delete ExptExcel[i].rvac_id;
          delete ExptExcel[i].rvac_user_id;
          delete ExptExcel[i].rvac_type;
          delete ExptExcel[i].rvac_date_start;
          delete ExptExcel[i].rvac_date_end;
          delete ExptExcel[i].rvac_duration;
          delete ExptExcel[i].rvac_amount;
          delete ExptExcel[i].rvac_status;
          delete ExptExcel[i].rvac_detail;
          delete ExptExcel[i].rvac_reason;
          delete ExptExcel[i].rvac_special_case;
          delete ExptExcel[i].rvac_is_canceled;
          delete ExptExcel[i].rvac_update_at;
          delete ExptExcel[i].ud_user_id;
          delete ExptExcel[i].ud_fullname_en;
          delete ExptExcel[i].rvac_approve_status;
          delete ExptExcel[i].page;

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

}





