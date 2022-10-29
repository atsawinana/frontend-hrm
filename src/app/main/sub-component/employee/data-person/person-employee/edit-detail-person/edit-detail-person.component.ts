import { Component, OnInit } from '@angular/core';
import { defineLocale, thBeLocale } from 'ngx-bootstrap/chronos';
import Swal from 'sweetalert2';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-edit-detail-person',
  templateUrl: './edit-detail-person.component.html',
  styleUrls: ['./edit-detail-person.component.css']
})
export class EditDetailPersonComponent implements OnInit {

  constructor(private localeService: BsLocaleService) { }
  locale = 'th';
    today!: Date;

  ngOnInit() {
    this.today = new Date();
        defineLocale('th', thBeLocale);
        this.localeService.use(this.locale);
  }

}
