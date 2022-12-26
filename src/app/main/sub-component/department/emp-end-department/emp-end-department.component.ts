import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaginationInstance } from 'ngx-pagination';
import { EmpDepartmentService } from '../emp-department/emp-department.service';

@Component({
  selector: 'app-emp-end-department',
  templateUrl: './emp-end-department.component.html',
  styleUrls: ['./emp-end-department.component.css'],
})
export class EmpEndDepartmentComponent implements OnInit {
  constructor(
    private router: ActivatedRoute,
    private service: EmpDepartmentService
  ) {}
  dept_id: any;
  objemployee: any;
  objemptable: any;
  listPerPage: number = 10;
  searchInput: string = '';

  ngOnInit() {
    this.dept_id = this.router.snapshot.params['dept_id'];

    this.service.showResignInDepartment(this.dept_id).subscribe({
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
