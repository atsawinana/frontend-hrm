import { Component, OnInit } from '@angular/core';
import { ListDepartmentService } from './list-department.service';

@Component({
  selector: 'app-list-department',
  templateUrl: './list-department.component.html',
  styleUrls: ['./list-department.component.css']
})
export class ListDepartmentComponent implements OnInit {

  constructor(private DepService: ListDepartmentService) { }

  ngOnInit() {
    this.DepService.getAllDepartment().subscribe({
      next: (res: any) => {

        console.log('ชื่อ', res.status)
        res.data.dept_name_en

      },
      error: (err) => {
        console.log("api failed !")
      },
    });
  }

}
