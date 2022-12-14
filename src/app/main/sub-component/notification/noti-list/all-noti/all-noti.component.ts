import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { NotiService } from '../../noti.service';

@Component({
    selector: 'app-all-noti',
    templateUrl: './all-noti.component.html',
    styleUrls: ['./all-noti.component.css']
})
export class AllNotiComponent implements OnInit {

    constructor(private notiservice: NotiService,private router: Router) { }

    objDataNoti:any
    baseURL = environment.apiURL;

    ngOnInit() {
        this.notiservice.getAllNoti().subscribe({
            next: (res: any) => {
                console.log(res.data)
                this.objDataNoti = res.data
            },
            error: (error: any) => {},
        })

    }

    NavigateToLeave(id:any){
        this.router.navigate([`/main/leave/view-request-detail/${id}`]);
    }
}

