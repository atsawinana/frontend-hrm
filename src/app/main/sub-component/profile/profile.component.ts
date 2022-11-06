import { Component, OnInit } from '@angular/core';
import {
  Chart,
  ChartConfiguration,
  ChartOptions,
  ChartData,
  ChartEvent,
  ChartType,
} from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ProfileService } from './profile.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(private profileService: ProfileService) { }
  roleHR: boolean = false;
  lineChart: any = [];
  ObjdataUser: any = {};
  ApiSuccess: boolean = false;
  testleaveday: any;
  ObjTestCircle1 = { l1: 4, l2: 12, l3: 7 };
  ObjTestCircle2 = { l1: 13, l2: 2, l3: 3, l4: 5 };
  baseURL = environment.apiURL;
  whenEdit: boolean = false
  phonenumber: any

  // events
  public chartClicked({
    event,
    active,
  }: {
    event: ChartEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event: ChartEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }

  //   {
  //     label: 'ลากิจ',
  //     data: [6,3],
  //     backgroundColor: ['#FD9229','#63C8CE']
  //   },

  ngOnInit() {
    if (localStorage.getItem('roleUser') == '3') {
      this.roleHR = true;
    }
    this.profileService.getProfile().subscribe({
      next: (res: any) => {
        this.ObjdataUser = res.data;
        localStorage.setItem('user_id', this.ObjdataUser.user_id)
        this.phonenumber = this.ObjdataUser.ud_phone
        this.testleaveday = this.ObjdataUser.user_maternity_day;
        this.ApiSuccess = true;
        console.log(this.ObjdataUser);
      },
      error: (err: any) => { },
    });
  }

  numberOnly(event:any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  editcalcel(){
    location.reload()
  }

  editProfile() {
    console.log("phone:", this.phonenumber)
    if (this.phonenumber.trim() == "" || this.phonenumber.trim() == null) {
      Swal.fire({
        icon: 'warning',
        title: 'กรุณาใส่เบอร์โทร',
      })
      return
    } else if (this.phonenumber.length != 10) {
      Swal.fire({
        icon: 'warning',
        title: 'กรุณาใส่เบอร์โทรให้ครบ 10 ตัว',
      })
      return
    }
    this.profileService.editNumber(this.phonenumber).subscribe({
      next: (res: any) => {
        location.reload()
      },
      error: (err: any) => {

      }
    })
  }

  editData() {
    if (this.whenEdit == true) {
      this.whenEdit = false
    } else {
      this.whenEdit = true
    }
  }

  editPicture(event: any) {
    const file: File = event.target.files[0];

    const formData = new FormData()
    // this.picname = file.name
    formData.append("file", file)
    // console.log("file", file)
    // console.log('test form', formData)
    // console.log("test param ", this.picfile)

    this.profileService.uploadImgprofile(formData).subscribe({
      next: (res: any) => {
        // location.reload()
      },
      error: (err: any) => {

      }
    })
  }

}
