import { Component, Input, OnInit } from '@angular/core';
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

    role: boolean = false
    route1 = localStorage.getItem(this.identifyStorage)

    constructor(private router: Router) { }

    ngOnInit() {

        if (localStorage.getItem('roleUser') == "3" || localStorage.getItem('roleUser') == "2")
            this.role = true


        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.route1 = localStorage.getItem(this.identifyStorage)
                console.log(this.route1)
            }
        });
    }

    clickFirstPath() {
        this.route1 = "true"
        localStorage.setItem(this.identifyStorage, String(this.route1))
        this.router.navigate([this.firstPath]);
    }

    clickSecondPath() {
        this.route1 = "false"
        localStorage.setItem(this.identifyStorage, String(this.route1))
        this.router.navigate([this.secondPath]);
    }




    ngOnDestroy() {
        localStorage.setItem(this.identifyStorage, String(this.route1))
    }
}
