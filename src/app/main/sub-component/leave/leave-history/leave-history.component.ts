import { JsonpClientBackend } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale, thBeLocale } from 'ngx-bootstrap/chronos';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-leave-history',
  templateUrl: './leave-history.component.html',
  styleUrls: ['./leave-history.component.css']
})
export class LeaveHistoryComponent implements OnInit {

  
  constructor(private localeService: BsLocaleService) { }

  locale = 'th';
  today!: Date;

  ngOnInit() {
    this.today = new Date();
        defineLocale('th', thBeLocale);
        this.localeService.use(this.locale);
  }
  

}
