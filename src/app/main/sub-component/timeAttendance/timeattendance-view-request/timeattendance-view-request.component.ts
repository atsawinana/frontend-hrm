import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-timeattendance-view-request',
    templateUrl: './timeattendance-view-request.component.html',
    styleUrls: ['./timeattendance-view-request.component.css']
})
export class TimeattendanceViewRequestComponent implements OnInit {

    constructor(private route: ActivatedRoute,private _location: Location) { }

    storageURL = environment.apiURL
    ary: any = [1, 2, 3]
    id:any

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];
    }

    backClicked() {
        this._location.back();
    }

}
