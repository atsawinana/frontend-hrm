import { Component, OnInit } from '@angular/core';
import { DatePipe, Location } from '@angular/common';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale, thBeLocale } from 'ngx-bootstrap/chronos';
import { PaginationInstance } from 'ngx-pagination';
import { OtService } from '../ot.service';


@Component({
    selector: 'app-ot-list-request',
    templateUrl: './ot-list-request.component.html',
    styleUrls: ['./ot-list-request.component.css']
})
export class OtListRequestComponent implements OnInit {

    constructor(private _location: Location, public datepipe: DatePipe, private localeService: BsLocaleService, private otService: OtService) { }

    listPerPage: any = 10
    objTableHistory: any ;
    date: any = ""

    ngOnInit() {
        defineLocale('th', thBeLocale);
        this.localeService.use('th');
        this.otService.getUnapproved("").subscribe({
            next: (res: any) => {
                this.objTableHistory = res.data.request_overtimes
            },
            error: (err: any) => { }
        })
    }

    public config: PaginationInstance = {
        id: 'custom',
        itemsPerPage: 10,
        currentPage: 1
    }

    UpdateListPerpage() {
        this.config.itemsPerPage = this.listPerPage
    }

    backClicked() {
        this._location.back();
    }

    onOpenCalendar(container: any) {
        container.monthSelectHandler = (event: any): void => {
            container._store.dispatch(container._actions.select(event.date));
        };
        container.setViewMode('month');
    }

   

}
