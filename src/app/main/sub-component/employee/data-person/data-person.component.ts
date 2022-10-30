import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataPersonService } from './data-person.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-data-person',
  templateUrl: './data-person.component.html',
  styleUrls: ['./data-person.component.css'],
})
export class DataPersonComponent implements OnInit {
  constructor(
    private dataService: DataPersonService,
    private router: ActivatedRoute
  ) {}
  Empid: any;
  baseURL = environment.apiURL;
  ObjDataemp: any;
  APISuccess:boolean = false
  ngOnInit() {
    this.Empid = this.router.snapshot.params['id'];
    localStorage.setItem('empPerson',this.Empid)
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
