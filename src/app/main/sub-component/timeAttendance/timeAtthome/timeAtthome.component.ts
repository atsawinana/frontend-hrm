import { Component, OnInit } from '@angular/core';
import { PaginationInstance } from 'ngx-pagination';
import { map, share, Subject, Subscription, timer } from 'rxjs';
import * as moment from 'moment';
import { TimeAttendanceService } from '../time-attendance.service';
import { async } from '@angular/core/testing';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-timeAtthome',
    templateUrl: './timeAtthome.component.html',
    styleUrls: ['./timeAtthome.component.css']
})
export class TimeAtthomeComponent implements OnInit {

    date: any

    time = new Date();
    timedatethai = new Date();
    result = this.timedatethai.toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
    })
    rxTime: any;
    intervalId: any;
    subscription: Subscription | undefined;
    role: boolean = false

    btnControl = {
        checkinbtn: false,
        checkoutbtn: false
    }

    constructor(private serviceTimeatd: TimeAttendanceService) {

    }

    ngOnInit() {

        let role = localStorage.getItem('roleUser')
        if (role == '2' || role == '3') {
            this.role = true
        }

        // Using Basic Interval
        this.intervalId = setInterval(() => {
            this.time = new Date();
        }, 1000);

        // Using RxJS Timer
        this.subscription = timer(0, 1000)
            .pipe(
                map(() => new Date()),
                share()
            )
            .subscribe(time => {
                this.rxTime = moment(time).format('HH:mm:ss');
            });

        this.serviceTimeatd.getTable().subscribe({
            next: (res: any) => {
                console.log(res)
            },
            error: (err: any) => { }
        })
        this.checkCondition();

    }

    ary: any = [1, 2, 3]
    listPerPage: any = 5

    public config: PaginationInstance = {
        id: 'custom',
        itemsPerPage: this.listPerPage,
        currentPage: 1,
    };

    listPerpage() {
        this.config.itemsPerPage = this.listPerPage
    }

    ngOnDestroy() {
        clearInterval(this.intervalId);
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    checkCondition() {
        this.serviceTimeatd.getCondition().subscribe({
            next: (res: any) => {
                console.log(res.data)
                if (res.data.status == 1) {
                    this.btnControl.checkinbtn = false
                    this.btnControl.checkoutbtn = false
                } else if (res.data.status == 2) {
                    this.btnControl.checkinbtn = true
                    this.btnControl.checkoutbtn = false
                } else if (res.data.status == 3) {
                    this.btnControl.checkinbtn = false
                    this.btnControl.checkoutbtn = true
                }

            },
            error: (err: any) => {

            }
        })
    }

    clickCheckin() {
        if (!this.btnControl.checkinbtn)
            return

        this.serviceTimeatd.checkin().subscribe({
            next: (res: any) => {
                this.checkCondition();
            },
            error: (err: any) => { }
        })

    }

    clickCheckout() {
        if (!this.btnControl.checkoutbtn)
            return

        this.serviceTimeatd.checkConditionOut().subscribe({
            next: (res: any) => {



                Swal.fire({
                    title: `<strong style = "font-family:Kanit"> ขณะนี้คุณทำงาน <br> ${res.data.time} <br> จะออกจากงานก่อนเวลาหรือไม่ </strong>`,
                    icon: 'question',
                    showCancelButton: true,
                    cancelButtonColor: '#d33',
                    cancelButtonText: '<div style = "font-family:Kanit"> ยกเลิก </div>',
                    confirmButtonText: '<div style = "font-family:Kanit"> ตกลง </div>',
                    confirmButtonColor: '#005FBC',
                    reverseButtons: true,
                }).then((e) => {
                    if(e.isConfirmed) {
                        this.serviceTimeatd.checkout().subscribe({
                            next : (res: any) => {
                                this.checkCondition();
                            },
                            error : (err: any) => {
                                
                            },
                        })
                    }
                })

                this.checkCondition();
            },
            error: (err: any) => { }
        })
    }
}
