import { Component, OnInit } from '@angular/core';
import { PaginationInstance } from 'ngx-pagination';
import { map, share, Subject, Subscription, timer } from 'rxjs';
import * as moment from 'moment';
import { TimeAttendanceService } from '../time-attendance.service';
import Swal from 'sweetalert2';
import { Locale } from 'ngx-bootstrap/chronos/locale/locale.class';

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
    objTable: any

    btnControl = {
        checkinbtn: false,
        checkoutbtn: false
    }

    checkState: boolean = false
    checkstateTable: boolean = true
    checkstateCondition: boolean = true

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
                this.objTable = res.data.time_attendance
                this.checkstateTable = false
            },
            error: (err: any) => { }
        })
        this.checkCondition();

    }

    listPerPage: any = 10

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
                this.checkState = false
                this.checkstateCondition = false
            },
            error: (err: any) => {

            }
        })
    }

    clickCheckin() {

        this.checkState = true

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

        this.checkState = true
        if (!this.btnControl.checkoutbtn)
            return

        this.serviceTimeatd.checkConditionOut().subscribe({
            next: (res: any) => {


                if (res.data.alert) {
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
                        if (e.isConfirmed) {
                            this.serviceTimeatd.checkout().subscribe({
                                next: (res: any) => {
                                    this.checkCondition();
                                    location.reload()
                                },
                                error: (err: any) => {

                                },
                            })
                        }
                    })
                } else {
                    this.serviceTimeatd.checkout().subscribe({
                        next: (res: any) => {
                            this.checkCondition();
                            location.reload()
                        },
                        error: (err: any) => {

                        },
                    })
                }

                this.checkCondition();
            },
            error: (err: any) => { }
        })
    }
}
