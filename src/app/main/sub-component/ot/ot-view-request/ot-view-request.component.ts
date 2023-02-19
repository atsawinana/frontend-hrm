import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePipe, Location } from '@angular/common';
import { environment } from 'src/environments/environment';
import { OtService } from '../ot.service';

@Component({
    selector: 'app-ot-view-request',
    templateUrl: './ot-view-request.component.html',
    styleUrls: ['./ot-view-request.component.css']
})
export class OtViewRequestComponent implements OnInit {

    constructor(private route: ActivatedRoute, private _location: Location, private otService: OtService) { }
    id: any
    objDetailReq: any = ['1',]
    owner: any
    aryApprove: any = ['1',]
    storageURL = environment.apiURL
    ngOnInit() {
        this.id = this.route.snapshot.params['id'];
        this.otService.getRequestOvertimeHistory("1").subscribe({
            next: (res: any) => { },
            error: (err: any) => { }
        })
    }

    backClicked() {
        this._location.back();
    }

}
