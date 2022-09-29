import { Component, HostListener, OnInit } from '@angular/core';
import { MainService } from '../main.service';
import { Route, Router, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Subject } from 'rxjs/internal/Subject';
import { LoadingComponent } from 'src/app/login/loading/loading-template/loading.component';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
    constructor(
        private MainService: MainService,
        private router: Router,
        private coreToken: AuthService,
    ) {
        this.setTimeout();
        this.userInactive.subscribe(() => {
            console.log('user has been inactive (30 mins)');
            this.coreToken.Logout()
        });
    }

    token!: any;
    ud_fullname_th!: string;
    ud_prefix!: string;
    role: string = "";
    position_th!: string;
    tokenLocal!: string;
    tokenCheck!: boolean;
    photo!: string
    checkApi: boolean = false;

    ngOnInit() {
        this.getProfile();
    }

    getProfile() {
        this.tokenLocal = localStorage.getItem('tokenLocal')!;
        this.MainService.profileRequest({ token: this.tokenLocal! }).subscribe({
            next: (res: any) => {
                this.ud_fullname_th = res.data.ud_fullname_th;
                this.ud_prefix = res.data.ud_prefix;
                this.position_th = res.data.position_th;
                this.role = res.data.role;
                this.photo = res.data.ud_picture
                this.checkApi = true;
                localStorage.setItem('roleUser', this.role)
                this.coreToken.UserRole = this.role
            },
            error: (err: any) => {
                if (err.status === 401) {
                    this.coreToken.reFreshToken().subscribe({
                        next: (res: any) => {
                            this.getProfile()
                        },
                        error: (res: any) => {
                            this.coreToken.Logout()
                        }
                    })
                }
            },
        });
    }

    logout() {
        this.coreToken.Logout().subscribe({
            next: (res: any) => {
            },
            error: (err: any) => {
            },
        });
    }

    userActivity: any;
    userInactive: Subject<any> = new Subject();
    timeMin: number = 30; //Change Minute Here

    setTimeout() {
        this.userActivity = setTimeout(
            () => this.userInactive.next(undefined),
            this.timeMin * 60000 // 1000 = 1sec
        );
    }

    @HostListener('window:mousemove') refreshUserStateMouse() {
        clearTimeout(this.userActivity);
        this.setTimeout();
    }

    @HostListener('window:keydown') refreshUserStateKeyborad() {
        clearTimeout(this.userActivity);
        this.setTimeout();
    }
}
