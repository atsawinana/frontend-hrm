import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-employee-overbutton',
    templateUrl: './employee-overbutton.component.html',
    styleUrls: ['./employee-overbutton.component.css']
})
export class EmployeeOverbuttonComponent implements OnInit {

    role: boolean = false
    route1 = ""

    constructor(private router: Router) { }

    ngOnInit() {
        if (localStorage.getItem('roleUser') == "3")
            this.role = true

        if(this.router.url.includes('employee'))
        this.route1 = localStorage.getItem("overbtn")!

    }

    clickRouteEmployee() {
        this.route1 = "true"
        localStorage.setItem("overbtn", String(this.route1))
        this.router.navigate(['/main/employee']);
    }

    clickRouteEndContract() {
        this.route1 = "false"
        localStorage.setItem("overbtn", String(this.route1))
        this.router.navigate(['/main/employee/end-contract-employee']);

    }
}
