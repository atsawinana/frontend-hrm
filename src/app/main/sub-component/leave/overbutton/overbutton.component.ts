import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-overbutton',
    templateUrl: './overbutton.component.html',
    styleUrls: ['./overbutton.component.css']
})
export class OverbuttonComponent implements OnInit {

    role: boolean = false
    route1 = localStorage.getItem("overbtnLeave")

    constructor(private router: Router) { }

    ngOnInit() {

      

        if (localStorage.getItem('roleUser') == "3") 
            this.role = true


        this.route1 = localStorage.getItem("overbtnLeave")
        if(this.route1 == "false"){
            this.clickRouteHistoryall()
        }
        
    }

    clickRouteHistory() {
        this.route1 = "true"
        localStorage.setItem("overbtnLeave",String(this.route1))
        this.router.navigate(['/main/leave/history']);
    }

    clickRouteHistoryall() {
        this.route1 = "false"
        localStorage.setItem("overbtnLeave",String(this.route1))
        this.router.navigate(['/main/leave/all-history']);
    }
}
