import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { DataPersonService } from '../../data-person.service';

@Component({
  selector: 'app-detail-data-person',
  templateUrl: './detail-data-person.component.html',
  styleUrls: ['./detail-data-person.component.css'],
})
export class DetailDataPersonComponent implements OnInit {
  constructor(
    private dataService: DataPersonService,
    private router: ActivatedRoute
  ) {}
  Empid: any;
  baseURL = environment.apiURL;
  ObjDataemp: any;
  APISuccess:boolean = false
  ngOnInit() {
    this.Empid = localStorage.getItem('empPerson')

    this.dataService.getUserProfile(this.Empid).subscribe({
        next: (res: any) => {
          this.ObjDataemp = res.data
          console.log(this.ObjDataemp)
          if(this.ObjDataemp.ud_picture == null) {
              this.ObjDataemp.ud_picture = "/files/image/default.jpg"
          } 
          this.APISuccess = true
        },
        error: (error: any) => {},
      });
  }
}
