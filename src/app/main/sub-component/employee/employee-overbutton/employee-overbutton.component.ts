import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-employee-overbutton',
    templateUrl: './employee-overbutton.component.html',
    styleUrls: ['./employee-overbutton.component.css']
})
export class EmployeeOverbuttonComponent implements OnInit {

    role: boolean = false
    route1 = localStorage.getItem("overbtn")

    constructor(private router: Router) { }

    ngOnInit() {
        if (localStorage.getItem('roleUser') == "2" || localStorage.getItem('roleUser') == "3") 
            this.role = true
    }

    clickRoute1() {
        this.route1 = "true"
        localStorage.setItem("overbtn",String(this.route1))
        this.router.navigate(['/main/employee']);
    }

    clickRoute2() {
        this.route1 = "false"
        localStorage.setItem("overbtn",String(this.route1))
        this.router.navigate(['/main/employee/end-contract-employee']);

    }
}
