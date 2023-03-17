import { Component, ComponentRef, Input, OnInit,HostListener } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';

@Component({
    selector: 'app-buttun-over-page',
    templateUrl: './buttun-over-page.component.html',
    styleUrls: ['./buttun-over-page.component.css']
})
export class ButtunOverPageComponent implements OnInit {

    @Input() leftLabel = ""
    @Input() rightLabel = ""
    @Input() leftPath = ""
    @Input() rightPath = ""
    @Input() identifyStorage = ""
    @Input() pathOnShow = ""

    role: boolean = false
    route1 = sessionStorage.getItem(this.identifyStorage)
    setShow: boolean = false
    path: any

    constructor(private router: Router) {

    }

    ngOnInit() {

        this.route1 = sessionStorage.getItem(this.identifyStorage)
        if(this.route1 == null)
            sessionStorage.setItem(this.identifyStorage, "true")



        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.path = (this.pathOnShow.split(","))
                if (this.router.url == this.path[1] || this.router.url == this.path[0])
                    this.setShow = true
                else
                    this.setShow = false

                if (!this.setShow) {
                    sessionStorage.setItem(this.identifyStorage, "true")
                }
                this.route1 = sessionStorage.getItem(this.identifyStorage)
            }
        });

        this.path = this.pathOnShow.split(",")
        if (this.router.url == this.path[1] || this.router.url == this.path[0])
            this.setShow = true
        else
            this.setShow = false

        if (localStorage.getItem('roleUser') == "3" || localStorage.getItem('roleUser') == "2")
            this.role = true


    }

    clickFirstPath() {
        this.route1 = "true"
        sessionStorage.setItem(this.identifyStorage, "true")
        this.router.navigate([this.leftPath]);
    }

    clickSecondPath() {
        this.route1 = "false"
        sessionStorage.setItem(this.identifyStorage, "false")
        this.router.navigate([this.rightPath]);
    }

    ngOnDestroy() {


        sessionStorage.setItem(this.identifyStorage, "true")
    }

    @HostListener('window:popstate', ['$event'])
    onPopState() {

        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                if (this.router.url == this.path[0])
                    sessionStorage.setItem(this.identifyStorage, "true")
                else
                    sessionStorage.setItem(this.identifyStorage, "false")

                this.route1 = sessionStorage.getItem(this.identifyStorage)
            }
        });


    }
}
