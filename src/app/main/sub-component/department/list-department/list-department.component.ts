import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { PaginationInstance } from 'ngx-pagination';
import { DepartmentService } from '../department.service';

@Component({
    selector: 'app-list-department',
    templateUrl: './list-department.component.html',
    styleUrls: ['./list-department.component.css'],
})
export class ListDepartmentComponent implements OnInit {

    public searchFilter: any = '';

    selected?: any;
    deprtmentsData: any;
    deptTable: any;
    searchInput: string = "";
    listPerPage: number = 10;
    onPage: number = 1;
    onPageNext: number = this.onPage + 1;
    maxListDept?: any;
    dept_name!: string;
    dept_nameEN!: string;
    dept_creat!: string;
    dept_post!: any;
    dept_manager!: any;
    deptIDDelete: any;
    checkLoadAPI: boolean = false;
    countDept: number[] = [];
    ModalCheck: boolean = false;
    deptID_Detail: string = ""
    maxPage!: any

    constructor(private department_service: DepartmentService) { }
    ngOnInit() {
        this.getAllDepartment()
    }

    public config: PaginationInstance = {
        id: 'custom',
        itemsPerPage: this.listPerPage,
        currentPage: 1
    }

    setLocal(dept_id: any) {
        localStorage.setItem('dept_id_emp', dept_id)
    }

    getAllDepartment() {
        this.department_service.getAllDepartment().subscribe({
            next: (res: any) => {

                this.deprtmentsData = res.data.deprtments;
                this.deptTable = JSON.parse(JSON.stringify(this.deprtmentsData))

                for (let i = 0; i < this.deptTable.length; i++) {
                    delete this.deptTable[i].dept_created_date
                    delete this.deptTable[i].can_delete
                }

                this.maxListDept = res.data.max_dept;
                for (let i = 0; i < this.deprtmentsData.length; i++) {
                    this.countDept[i] = i + 1;
                }

                Array(this.deprtmentsData).push({ number: this.countDept })
                this.maxPage = Math.ceil(Number(this.maxListDept) / Number(this.listPerPage));
                this.checkLoadAPI = true;
            },
            error: (err: any) => {
               
            },
        });
    }

    numberOnly(event: { which: any; keyCode: any }): boolean {
        const charCode = event.which ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return true;
        }
        return false;
    }

    listPerpage() {
        this.config.itemsPerPage = this.listPerPage
        this.config.currentPage = 1
        this.maxPage = Math.ceil(Number(this.maxListDept) / Number(this.listPerPage));
        this.onPage = 1;
        this.onPageNext = this.onPage + 1
    }

    increasePage() {

        const countrow = document.querySelectorAll('#rowContent')!
        // console.log(countrow)

        this.maxPage = Math.ceil(Number(this.maxListDept) / Number(this.listPerPage));
        if (this.onPage < this.maxPage) {
            this.onPage++;
            this.onPageNext++;
        } else {
            const list = <HTMLSelectElement>(document.getElementsByClassName('buttonPage'));

            for (var i = 0; i < list.length; i++) {
                list[i].classList.remove('buttonPage:hover');
            }
        }
    }

    DecreasePage() {
        if (this.onPage > 1) {
            this.onPage--;
            this.onPageNext--;
        }
    }

    Delete_Department() {
        this.cancelModal()

    }

    checkDel(deptID: string): boolean {

        let index = 0
        for (let i = 0; i < Object.keys(this.deprtmentsData).length; i++) {
            if (this.deprtmentsData[i].dept_id === deptID) {
                index = i
                break;
            }
        }

        if (this.deprtmentsData[index].can_delete) {
            return false
        } else {
            return true
        }
    }

    cancelModal() {
        this.ModalCheck = false
    }

    SetDeptID(deptID: string) {

        let index = 0
        for (let i = 0; i < Object.keys(this.deprtmentsData).length; i++) {
            if (this.deprtmentsData[i].dept_id === deptID) {
                index = i
                break;
            }
        }

        if (this.deprtmentsData[index].can_delete) {
            this.deptIDDelete = deptID

            Swal.fire({
                title: '<strong style = "font-family:Kanit"> คุณต้องการลบแผนกใช่หรือไม่ </strong>',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#005FBC',
                cancelButtonColor: '#d33',
                confirmButtonText: '<div style = "font-family:Kanit"> ตกลง </div>',
                cancelButtonText: '<div style = "font-family:Kanit"> ยกเลิก </div>',
                reverseButtons: true
            }).then((result) => {
                if (result.isConfirmed) {
                    this.department_service.DeleletDepartment(this.deptIDDelete).subscribe({
                        next: (res: any) => {
                            Swal.fire({
                                title: '<strong style = "font-family:Kanit"> ลบแผนกสำเร็จ </strong>',
                                html: '<div style = "font-family:Kanit"> คุณได้ลบแผนกนี้ออกเรียบร้อยแล้ว </div>',
                                icon: 'success',
                                confirmButtonColor: '#005FBC',
                                confirmButtonText: '<div style = "font-family:Kanit"> ตกลง </div>'
                            }).then((e) => {
                                location.reload()
                            })
                        },
                        error: (err: any) => {
                            
                        },
                    });

                    // this.Delete_Department()

                }
            })

        }
    }

    DetailDept(event: any) {
        this.deptID_Detail = event
        this.department_service.DetailDepartment(this.deptID_Detail).subscribe({
            next: (res: any) => {
                this.dept_nameEN = res.data.departments.dept_name_en;
                this.dept_name = res.data.departments.dept_name_th;
                this.dept_creat = res.data.departments.dept_created_date;
                this.dept_post = res.data.dept_positions;
                this.dept_manager = res.data.department_map_managers;

            },
            error: (err: any) => {

            },
        });
    }

    reload() {
        location.reload();
    }

}
