import { Component, OnInit } from '@angular/core';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale, thBeLocale} from 'ngx-bootstrap/chronos';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  constructor(private localeService: BsLocaleService) { }

  locale = 'th';
  today!: Date;

  ngOnInit() {
    this.today = new Date();
    defineLocale('th', thBeLocale);
    this.localeService.use(this.locale);
  }

}
