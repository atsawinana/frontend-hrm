import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { NotiService } from '../noti.service';

@Component({
    selector: 'app-noti-list',
    templateUrl: './noti-list.component.html',
    styleUrls: ['./noti-list.component.css']
})
export class NotiListComponent implements OnInit {


    constructor(private router: Router, private service: NotiService) {}
    role: any = localStorage.getItem('roleUser')

    all: boolean = false;
    worknoti: boolean = false;
    leaveHnoti: boolean = false;
    otnoti: boolean = false;
    noti:any

    APIsuccess:boolean = false

    ngOnInit() {

        this.URLcheck("")
        this.showNumOfNotification()
        this.navigateActive()
    }

    navigateActive() {

        if (this.router.url.includes('work-notification')) {
            this.worknoti = true;
        } if (this.router.url.includes('leave-notification')) {
            this.leaveHnoti = true;
        } if (this.router.url.includes('ot-notification')) {
            this.otnoti = true;
        } if (this.router.url.includes('all-notification')) {
            this.all = true;
        }
    }

    URLcheck(event: any) {
        this.router.events.subscribe((val) => {
            this.all = false;
            this.worknoti = false;
            this.leaveHnoti = false;
            this.otnoti = false;
            this.navigateActive();
        });
    }

    routerLinkNoti(){
        if(this.router.url == '/main/notification/all-notification')
            return 
        
        this.router.navigate(['/main/notification/all-notification'])
    }

    showNumOfNotification() {
        this.service.showNumOfNotification().subscribe({
            next: (res: any) => {
                localStorage.setItem('notification',res.data.sum_notification)
                this.noti = res.data
                this.APIsuccess = true;
            },
            error: (error: any) => { },
        })
    }

}
