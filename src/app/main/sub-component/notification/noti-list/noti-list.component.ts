import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-noti-list',
    templateUrl: './noti-list.component.html',
    styleUrls: ['./noti-list.component.css']
})
export class NotiListComponent implements OnInit {


    constructor(private router: Router) { }
    role: any = localStorage.getItem('roleUser')

    all: boolean = false;
    worknoti: boolean = false;
    leaveHnoti: boolean = false;
    otnoti: boolean = false;

    ngOnInit() {
        this.navigateActive()
        console.log(this.all)
        console.log(this.worknoti)
        console.log(this.leaveHnoti)
        console.log(this.otnoti)
    }

    navigateActive() {

        // <div class="col-2 text-center noti-type" routerLink="../notification">ทั้งหมด</div>
        // <div *ngIf="role != 1" class="col-2 text-center noti-type" routerLink="work-notification">อนุมัติทำงาน</div>
        // <div *ngIf="role != 1" class="col-2 text-center noti-type " routerLink="leave-notification">อนุมัติลา</div>
        // <div *ngIf="role != 1" class="col-2 text-center noti-type" routerLink="ot-notification">อนุมัติโอที</div>

        if (this.router.url.includes('work-notification')) {
            this.worknoti = true;
        } else if (this.router.url.includes('leave-notification')) {
            this.leaveHnoti = true;
        } else if (this.router.url.includes('ot-notification')) {
            this.otnoti = true;
        } else if (this.router.url.includes('all-notification')) {
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



}
