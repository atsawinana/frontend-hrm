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
    @Input() firstPath = ""
    @Input() secondPath = ""
    @Input() identifyStorage = ""
    @Input() pathOnShow = ""

    role: boolean = false
    route1 = localStorage.getItem(this.identifyStorage)
    setShow: boolean = false
    path: any

    constructor(private router: Router) {

    }

    ngOnInit() {

        this.route1 = localStorage.getItem(this.identifyStorage)
        if(this.route1 == null)
            localStorage.setItem(this.identifyStorage, "true")



        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.path = (this.pathOnShow.split(","))
                if (this.router.url == this.path[1] || this.router.url == this.path[0])
                    this.setShow = true
                else
                    this.setShow = false

                if (!this.setShow) {
                    localStorage.setItem(this.identifyStorage, "true")
                }
                this.route1 = localStorage.getItem(this.identifyStorage)
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
        localStorage.setItem(this.identifyStorage, "true")
        this.router.navigate([this.firstPath]);
    }

    clickSecondPath() {
        this.route1 = "false"
        localStorage.setItem(this.identifyStorage, "false")
        this.router.navigate([this.secondPath]);
    }

    ngOnDestroy() {


        localStorage.setItem(this.identifyStorage, "true")
    }

    @HostListener('window:popstate', ['$event'])
    onPopState() {

        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                if (this.router.url == this.path[0])
                    localStorage.setItem(this.identifyStorage, "true")
                else
                    localStorage.setItem(this.identifyStorage, "false")

                this.route1 = localStorage.getItem(this.identifyStorage)
            }
        });


    }
}
