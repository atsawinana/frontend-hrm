import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { DetailViewRequestService } from './detail-view-request.service';

@Component({
    selector: 'app-detail-view-request',
    templateUrl: './detail-view-request.component.html',
    styleUrls: ['./detail-view-request.component.css']
})
export class DetailViewRequestComponent implements OnInit {

    constructor(private router: ActivatedRoute, private serviceDetail: DetailViewRequestService) { }

    Empid: any
    objProfile:any
    baseURL = environment.apiURL;

    APISuccess:boolean = false



    ngOnInit() {
        this.Empid = this.router.snapshot.params['id'];
        this.serviceDetail.getUserProfile(this.Empid).subscribe({
            next: (res: any) => { 
                this.objProfile = res.data
                this.APISuccess = true
                console.log(this.objProfile)
            },
            error: (err: any) => { }
        })
    }

}
