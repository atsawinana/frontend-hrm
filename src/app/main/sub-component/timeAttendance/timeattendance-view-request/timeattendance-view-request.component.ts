import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { TimeAttendanceService } from '../time-attendance.service';

@Component({
    selector: 'app-timeattendance-view-request',
    templateUrl: './timeattendance-view-request.component.html',
    styleUrls: ['./timeattendance-view-request.component.css']
})
export class TimeattendanceViewRequestComponent implements OnInit {

    constructor(private route: ActivatedRoute,private _location: Location,private serviceatd: TimeAttendanceService) { }

    storageURL = environment.apiURL
    ary: any = [1, 2, 3]
    id:any
    objDetailReq:any
    owner:boolean = false;
    aryApprove:any
    ngOnInit() {
        this.id = this.route.snapshot.params['id'];
        this.serviceatd.getDetailsRequestAttendances(this.id).subscribe({
            next: (res:any) => {
              this.objDetailReq = res.data.req_attendances
              this.aryApprove = res.data.approve_reqs
              this.owner = res.data.owner
            },
            error: (err:any) => {}
        })
    }

    backClicked() {
        this._location.back();
    }

}
