import { Component, OnInit } from '@angular/core';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale, thBeLocale } from 'ngx-bootstrap/chronos';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  constructor(private localeService: BsLocaleService) { }

    role:boolean = false

    locale = 'th';
    today!: Date;
    
  ngOnInit() {
    if(localStorage.getItem('roleUser') == "2" || localStorage.getItem('roleUser') == "3"){
        this.role = true
    }

    this.today = new Date();
        defineLocale('th', thBeLocale);
        this.localeService.use(this.locale);
  }

}
