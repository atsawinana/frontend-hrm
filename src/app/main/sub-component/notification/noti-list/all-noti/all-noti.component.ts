import { Component, OnInit } from '@angular/core';
import { NotiService } from '../../noti.service';

@Component({
    selector: 'app-all-noti',
    templateUrl: './all-noti.component.html',
    styleUrls: ['./all-noti.component.css']
})
export class AllNotiComponent implements OnInit {

    constructor(private notiservice: NotiService) { }

    objDataNoti:any

    ngOnInit() {
        this.notiservice.getAllNoti().subscribe({
            next: (res: any) => {
                console.log(res.data)
                this.objDataNoti = res.data
            },
            error: (error: any) => {},
        })

    }
}

