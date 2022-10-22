import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-overbutton',
    templateUrl: './overbutton.component.html',
    styleUrls: ['./overbutton.component.css']
})
export class OverbuttonComponent implements OnInit {

    role: boolean = false

    ngOnInit() {
        if (localStorage.getItem('roleUser') == "2" || localStorage.getItem('roleUser') == "3") {
            this.role = true
        }
    }
}
