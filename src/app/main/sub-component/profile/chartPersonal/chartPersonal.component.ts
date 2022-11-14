import { Component, OnInit } from '@angular/core';
import {
  Chart,
  ChartConfiguration,
  ChartOptions,
  ChartData,
  ChartEvent,
  ChartType,
} from 'chart.js';
import { ProfileService } from '../profile.service';


@Component({
  selector: 'app-chartPersonal',
  templateUrl: './chartPersonal.component.html',
  styleUrls: ['./chartPersonal.component.css']
})
export class ChartPersonalComponent implements OnInit {

  constructor(private profileService: ProfileService) { }

  //  กราฟผู้ชาย
  public ChartLabels: string[] = [''];
  public ChartData: ChartData<'bar'> = {
    labels: this.ChartLabels,
    datasets: [
      {
        label: 'ลากิจ',
        data: [6],
        backgroundColor: '#FD9229',
        barPercentage: 0.5,
      },
      {
        label: 'ลาป่วย',
        data: [30],
        backgroundColor: '#63C8CE',
        barPercentage: 0.5,
      },
      {
        label: 'ลาพักร้อน',
        data: [12],
        backgroundColor: '#C83039',
        barPercentage: 0.5,
      },
      {
        label: 'ลาบวช',
        data: [7],
        backgroundColor: '#13466A',
        barPercentage: 0.5,
      },
      {
        label: 'ลาเพื่อรับราชการทหาร',
        data: [60],
        backgroundColor: '#8CC34D',
        barPercentage: 0.5,
      },
    ],
  };
  public ChartType: ChartType = 'bar';

  //  กราฟผู้หญิง
  public ChartLabels2: string[] = [''];
  public ChartData2: ChartData<'bar'> = {
    labels: this.ChartLabels2,
    datasets: [
      {
        label: 'ลากิจ',
        data: [6],
        backgroundColor: '#FD9229',
        barPercentage: 0.5,
      },
      {
        label: 'ลาป่วย',
        data: [30],
        backgroundColor: '#63C8CE',
        barPercentage: 0.5,
      },
      {
        label: 'ลาพักร้อน',
        data: [12],
        backgroundColor: '#C83039',
        barPercentage: 0.5,
      },
      {
        label: 'ลาคลอด',
        data: [90],
        backgroundColor: '#13466A',
        barPercentage: 0.5,
      },
    ],
  };
  public ChartType2: ChartType = 'bar';

  public ChartOption: ChartConfiguration['options'] = {
    plugins: {
      legend: {
        display: false,
      },
    }
  };

  roleHR: boolean = false;
  lineChart: any = [];
  ObjdataUser: any = {};
  ApiSuccess: boolean = false;
  phonenumber: any


  ngOnInit() {
    this.profileService.getProfile().subscribe({
      next: (res: any) => {
        this.ObjdataUser = res.data;
        localStorage.setItem('user_id', this.ObjdataUser.user_id)
        this.phonenumber = this.ObjdataUser.ud_phone
        this.ApiSuccess = true;
        console.log(this.ObjdataUser);

        if (this.ObjdataUser.ud_gender_id == 1) {
          this.ChartData = {
            labels: this.ChartLabels,
            datasets: [
              {
                label: 'ลากิจ',
                data: [this.ObjdataUser.user_leave_day],
                backgroundColor: '#FD9229',
                barPercentage: 0.5,
              },
              {
                label: 'ลาป่วย',
                data: [this.ObjdataUser.user_sick_day],
                backgroundColor: '#63C8CE',
                barPercentage: 0.5,
              },
              {
                label: 'ลาพักร้อน',
                data: [this.ObjdataUser.user_take_annual_day],
                backgroundColor: '#C83039',
                barPercentage: 0.5,
              },
              {
                label: 'ลาบวช',
                data: [this.ObjdataUser.user_ordination_day],
                backgroundColor: '#13466A',
                barPercentage: 0.5,
              },
              {
                label: 'ลาเพื่อรับราชการทหาร',
                data: [this.ObjdataUser.user_military_service_day],
                backgroundColor: '#8CC34D',
                barPercentage: 0.5,
              },
            ],
          };
        } else {
          this.ChartData2 = {
            labels: this.ChartLabels2,
            datasets: [
              {
                label: 'ลากิจ',
                data: [this.ObjdataUser.user_leave_day],
                backgroundColor: '#FD9229',
                barPercentage: 0.5,
              },
              {
                label: 'ลาป่วย',
                data: [this.ObjdataUser.user_sick_day],
                backgroundColor: '#63C8CE',
                barPercentage: 0.5,
              },
              {
                label: 'ลาพักร้อน',
                data: [this.ObjdataUser.user_take_annual_day],
                backgroundColor: '#C83039',
                barPercentage: 0.5,
              },
              {
                label: 'ลาคลอด',
                data: [this.ObjdataUser.user_maternity_day],
                backgroundColor: '#13466A',
                barPercentage: 0.5,
              },
            ],
          };
        }

      },
      error: (err: any) => { },
    });
  }

}
