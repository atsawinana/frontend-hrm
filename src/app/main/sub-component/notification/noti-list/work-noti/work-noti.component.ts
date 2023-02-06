import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { NotiService } from '../../noti.service';

@Component({
  selector: 'app-work-noti',
  templateUrl: './work-noti.component.html',
  styleUrls: ['./work-noti.component.css']
})
export class WorkNotiComponent implements OnInit {

  constructor(private notiservice: NotiService, private router: Router) { }

  objDataNoti: any
  baseURL = environment.apiURL;

  ApiSuccess: boolean = false
  storageURL: any = environment.storageURL;

  ngOnInit() {
    this.notiservice.notificationRequestAttendance().subscribe({
      next: (res: any) => {
        this.objDataNoti = res.data
        this.ApiSuccess = true
      },
      error: (error: any) => { },
    })

  }

  NavigateTotimeattendance(id: any, noti_id: any) {

    this.notiservice.updateHasSeen(noti_id).subscribe({
        next: (res: any) => {
        },
        error: (error: any) => { },
    })

    this.router.navigate([`/main/timeattendance/time-view-request/${id}`]);
}

}
