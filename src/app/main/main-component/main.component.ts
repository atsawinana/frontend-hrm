import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MainService } from '../main.service';
import { CoreService } from 'src/app/core.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {

  constructor(private MainService: MainService,private router: ActivatedRoute, private coreToken: CoreService) {}
  token?: any;
  ud_fullname_th?: string
  ud_prefix?: string
  role?: string
  position_th?: string

  ngOnInit() {
    this.token = this.coreToken.token
    this.MainService.profileRequest({ token: this.token }).subscribe({
      next: (res: any) => {
        this.ud_fullname_th = res.data.ud_fullname_th
        this.ud_prefix = res.data.ud_prefix
        this.position_th = res.data.position_th
        this.role = res.data.role
      },
      error: (err) => {
        
      },
    });
  }

}
