import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MainService } from '../main.service';
import { AuthService } from 'src/app/auth.service';
import { core, Token } from '@angular/compiler';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  constructor(
    private MainService: MainService,
    private router: ActivatedRoute,
    private coreToken: AuthService
  ) {}
  token?: any;
  ud_fullname_th?: string;
  ud_prefix?: string;
  role?: string;
  position_th?: string;
  tokenLocal?: string;
  tokenCheck?: boolean;

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.tokenLocal = localStorage.getItem('tokenLocal')!;
    this.MainService.profileRequest({ token: this.tokenLocal! }).subscribe({
      next: (res: any) => {
        this.ud_fullname_th = res.data.ud_fullname_th;
        this.ud_prefix = res.data.ud_prefix;
        this.position_th = res.data.position_th;
        this.role = res.data.role;
      },
      error: (err: any) => {
        
      },
    });
  }
}
