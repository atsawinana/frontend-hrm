import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd } from '@angular/router';
import { MainService } from '../main.service';
import { core, Token } from '@angular/compiler';
import { Route, Router, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  constructor(
    private MainService: MainService,
    private router: Router,
    private coreToken: AuthService
  ) {}
  token?: any;
  ud_fullname_th?: string;
  ud_prefix?: string;
  role?: string;
  position_th?: string;
  tokenLocal?: string;
  tokenCheck?: boolean;

  async ngOnInit() {
    if (this.router.url == '/main') {
      const addClass = document.getElementById('profile');
      addClass?.classList.add('bg-active');
    }

    this.refresh();
    if (await this.coreToken.CheckTokenTimeOut()) {
      this.router.navigate(['']);
    }
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
      error: (err: any) => {},
    });
  }

  logout() {
    this.coreToken.Logout();
  }



 
}
