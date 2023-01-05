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
  constructor(private profileService: ProfileService) {}
  roleHR: boolean = false;
  arylineChart: any = [];
  objdataUser: any = {};
  ApiSuccess: boolean = false;
  testleaveday: any;
  baseURL = environment.apiURL;
  whenEdit: boolean = false;
  phonenumber: any;
  confirmPath: string = '';

  // events
  public chartClicked({
    event,
    active,
  }: {
    event: ChartEvent;
    active: {}[];
  }): void {
    // console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event: ChartEvent;
    active: {}[];
  }): void {
    // console.log(event, active);
  }

  //   {
  //     label: 'ลากิจ',
  //     data: [6,3],
  //     backgroundColor: ['#FD9229','#63C8CE']
  //   },
  storageURL = environment.storageURL;

  ngOnInit() {
    if (localStorage.getItem('roleUser') == '3') {
      this.roleHR = true;
    }
    this.profileService.getProfile().subscribe({
      next: (res: any) => {
        this.objdataUser = res.data;
        localStorage.setItem('user_id', this.objdataUser.user_id);
        localStorage.setItem('ud_gender_id', this.objdataUser.ud_gender_id);
        this.phonenumber = this.objdataUser.ud_phone;
        this.testleaveday = this.objdataUser.user_maternity_day;
        this.ApiSuccess = true;
        // console.log(this.objdataUser);
      },
      error: (err: any) => {},
    });
  }

  iputNumberOnly(event: any): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  editModalCancel() {
    Swal.fire({
      title:
        '<strong style = "font-family:Kanit"> คุณต้องการยกเลิกการแก้ไขใช่หรือไม่ </strong>',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#005FBC',
      cancelButtonColor: '#d33',
      confirmButtonText: '<div style = "font-family:Kanit"> ตกลง </div>',
      cancelButtonText: '<div style = "font-family:Kanit"> ยกเลิก </div>',
      reverseButtons: true,
    }).then((e) => {
      if (e.isConfirmed) {
        location.reload();
      }
    });
  }

  editProfile() {
    // console.log('phone:', this.phonenumber);
    if (this.phonenumber.trim() == '' || this.phonenumber.trim() == null) {
      Swal.fire({
        icon: 'warning',
        title: 'กรุณาใส่เบอร์โทร',
      });
      return;
    } else if (this.phonenumber.length != 10) {
      Swal.fire({
        icon: 'warning',
        title: 'กรุณาใส่เบอร์โทรให้ครบ 10 ตัว',
      });
      return;
    }
    Swal.fire({
      title:
        '<strong style = "font-family:Kanit"> คุณต้องการยืนยันการแก้ไขใช่หรือไม่ </strong>',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#005FBC',
      cancelButtonColor: '#d33',
      confirmButtonText: '<div style = "font-family:Kanit"> ตกลง </div>',
      cancelButtonText: '<div style = "font-family:Kanit"> ยกเลิก </div>',
      reverseButtons: true,
    }).then((e) => {
      if (e.isConfirmed) {
        this.profileService.editNumber(this.phonenumber).subscribe({

          next: (res: any) => {
            this.profileService.confirmPicture(this.confirmPath).subscribe({
              next: (res: any) => {
                location.reload();
              },
              error: (err: any) => {},
            });
          },

          error: (err: any) => {},
        });
      }
    });
  }

  editData() {
    if (this.whenEdit == true) {
      this.whenEdit = false;
    } else {
      this.whenEdit = true;
    }
  }

  editPicture(event: any) {
    const file: File = event.target.files[0];

    const formData = new FormData();
    // this.picname = file.name
    formData.append('file', file);
    // console.log("file", file)
    // console.log('test form', formData)
    // console.log("test param ", this.picfile)
    let objPic;
    this.profileService.uploadImgprofile(formData).subscribe({
      next: (res: any) => {
        objPic = res;
        this.confirmPath = objPic.data;
        // console.log(objPic);
        this.objdataUser.ud_picture = objPic.data;
        // location.reload()
      },
      error: (err: any) => {},
    });
  }
}
