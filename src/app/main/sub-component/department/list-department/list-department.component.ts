import { Component, OnInit } from '@angular/core';
import { ListDepartmentService } from './list-department.service';

@Component({
  selector: 'app-list-department',
  templateUrl: './list-department.component.html',
  styleUrls: ['./list-department.component.css']
})
export class ListDepartmentComponent implements OnInit {

  data: any

  constructor(private DepService: ListDepartmentService) { }

  ngOnInit() {
    this.DepService.getAllDepartment().subscribe({
      next: (res: any) => {
        this.data = res.data
        // console.log("api success !")
        console.log(this.data)
      },
      error: (err: any) => {
        // console.log("api failed !")
      },
    });
  }

}
