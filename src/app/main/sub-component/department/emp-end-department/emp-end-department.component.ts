import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginationInstance } from 'ngx-pagination';
import { DepartmentService } from '../department.service';
import { EmpDepartmentService } from '../emp-department/emp-department.service';

@Component({
  selector: 'app-emp-end-department',
  templateUrl: './emp-end-department.component.html',
  styleUrls: ['./emp-end-department.component.css'],
})
export class EmpEndDepartmentComponent implements OnInit {
  constructor(
    private active_route: ActivatedRoute,
    private department_service: DepartmentService,
    private router:Router
  ) {}
  dept_id: any;
  objemployee: any;
  objemptable: any;
  listPerPage: number = 10;
  searchInput: string = '';


  ngOnInit() {
    this.dept_id = this.active_route.snapshot.params['dept_id'];

    this.department_service.showResignInDepartment(this.dept_id).subscribe({
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
      error: (err: any) => {},
    });
  }

  navigateEmp(id:any){
    this.router.navigate([`/main/employee/data-person/${id}`]);
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
}
