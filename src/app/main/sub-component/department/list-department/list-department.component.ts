import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ListDepartmentService } from './list-department.service';

@Component({
  selector: 'app-list-department',
  templateUrl: './list-department.component.html',
  styleUrls: ['./list-department.component.css'],
})
export class ListDepartmentComponent implements OnInit {
  selected?: any
  data: any 
  searchInput: any
  listPage:any
  constructor(private DepService: ListDepartmentService) {}
  ngOnInit() {
    this.DepService.getAllDepartment().subscribe({
      next: (res: any) => {
        this.data  = res.data;
      },
      error: (err: any) => {},
    });

  }

  numberOnly(event: { which: any; keyCode: any; }): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return true;
    }
    return false;
  }

  listPerpage()
  {
    const list = (<HTMLSelectElement>document.getElementById('listPerPage')).value
    console.log(list)

    return list
  }
<<<<<<< Updated upstream

}
=======
  DeletePage() {
    this.DepService.deleteDepartment().subscribe({
      next: (res: any) => {
        console.log("1")
      },
      error: (err: any) => {
        
      },
    });
  }
  }
>>>>>>> Stashed changes
