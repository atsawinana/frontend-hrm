import { Component, OnInit } from '@angular/core';
import { PaginationInstance } from 'ngx-pagination';
import { ListDepartmentService } from '../../department/list-department/list-department.service';
import { EndContractService } from './end-contract.service';
import * as XLSX from 'xlsx'

@Component({
  selector: 'app-end-contract',
  templateUrl: './end-contract.component.html',
  styleUrls: ['./end-contract.component.css']
})
export class EndContractComponent implements OnInit {

  constructor(private empService: EndContractService) { }

  Objemployee: any
  Objemptable: any
  listPerPage: number = 10
  searchInput: string = ''
  elemtable: any
  LoadingAPI: boolean = false

  public config: PaginationInstance = {
    id: 'custom',
    itemsPerPage: this.listPerPage,
    currentPage: 1
  }

  ngOnInit() {
    this.empService.getAllUser().subscribe({
      next: (res: any) => {
        this.Objemployee = res.data.employee
        this.Objemptable = JSON.parse(JSON.stringify(this.Objemployee))

        for (let i = 0; i < this.Objemptable.length; i++) {
          delete this.Objemptable[i].user_username
          delete this.Objemptable[i].ud_fullname_en
          delete this.Objemptable[i].id
          delete this.Objemptable[i].page
        }
        this.LoadingAPI = true
      },
      error: (err: any) => {

      }
    })
  }

  listPerpage() {
    this.config.itemsPerPage = this.listPerPage
    this.config.currentPage = 1
  }

  // exportExcel() {
  //   // const ws:XLSX:WorkSheet = XLSX.utils.table_to_sheet(this.elemtable)
  //   let elem = document.getElementById('tableemp')
  //   XLSX.writeFile((XLSX.utils.table_to_book(elem)), "text.xlsx",)
  //   // XLSX.writeFile((XLSX.utils.table_to_book(elem)),"text.xlsx",)
  // }

  showFilterBox() {
    var x = document.getElementById("filterBox");
    if (x?.style.display === "none") {
      x.style.display = "block";
    } else {
      x!.style.display = "none";
    }
  }

}
