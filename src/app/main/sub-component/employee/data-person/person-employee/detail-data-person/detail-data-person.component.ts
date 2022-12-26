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
  objDataemp: any;
  APISuccess:boolean = false
  ngOnInit() {
    this.Empid = localStorage.getItem('empPerson')

    this.dataService.getUserProfile(this.Empid).subscribe({
        next: (res: any) => {
          this.objDataemp = res.data
          if(this.objDataemp.ud_picture == null) {
              this.objDataemp.ud_picture = "/files/image/default.jpg"
          } 
          this.APISuccess = true
        },
        error: (error: any) => {},
      });
  }
}
