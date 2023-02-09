import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ot-btn-over',
  templateUrl: './ot-btn-over.component.html',
  styleUrls: ['./ot-btn-over.component.css']
})
export class OtBtnOverComponent implements OnInit {

    role: boolean = false
    route1 = localStorage.getItem("overbtnOt")

    constructor(private router: Router) { }

    ngOnInit() {

      

        if (localStorage.getItem('roleUser') == "3" || localStorage.getItem('roleUser') == "2") 
            this.role = true


        // this.route1 = localStorage.getItem("overbtnOt")
        // if(this.route1 == "false"){
        //     this.clickRouteHistoryall()
        // }
        
    }

    clickRouteHistory() {
        this.route1 = "true"
        localStorage.setItem("overbtnOt",String(this.route1))
        this.router.navigate(['/main/ot/history']);
    }

    clickRouteHistoryall() {
        this.route1 = "false"
        localStorage.setItem("overbtnOt",String(this.route1))
        this.router.navigate(['/main/ot/all-history']);
    }
}
