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

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(private profileService: ProfileService) {}
  roleHR: boolean = false;
  lineChart: any = [];
  ObjdataUser: any = {};
  ApiSuccess: boolean = false;
  testleaveday: any;
  ObjTestCircle1 = { l1: 4, l2: 12, l3: 7 };
  ObjTestCircle2 = { l1: 13, l2: 2, l3: 3, l4: 5 };

  //  กราฟผู้ชาย
  public ChartData: ChartData<'bar'> = {
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
  public ChartType: ChartType = 'bar';

  //  กราฟผู้หญิง
  public ChartLabels2: string[] = [''];
  public ChartData2: ChartData<'bar'> = {
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
  public ChartType2: ChartType = 'bar';

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

  public doughnutChartLabels: string[] = ['ลากิจ', 'ลาป่วย', 'ลาพักร้อน'];
  public doughnutChartData: ChartData<'doughnut'> = {
    datasets: [
      {
        data: [
          this.ObjTestCircle1.l1,
          this.ObjTestCircle1.l2,
          this.ObjTestCircle1.l3,
        ],
        backgroundColor: ['#005FBC', '#EF0303', '#EB760B'],
      },
    ],
  };
  public doughnutChartType: ChartType = 'doughnut';

  //   {
  //     label: 'ลากิจ',
  //     data: [6,3],
  //     backgroundColor: ['#FD9229','#63C8CE']
  //   },

  public doughnutChartLabels2: string[] = [
    'Developer',
    'Designer',
    'Marketing',
    'Temporary',
  ];
  public doughnutChartData2: ChartData<'doughnut'> = {
    datasets: [
      {
        data: [
          this.ObjTestCircle2.l1,
          this.ObjTestCircle2.l2,
          this.ObjTestCircle2.l3,
          this.ObjTestCircle2.l4,
        ],
        backgroundColor: ['#005FBC', '#EF0303', '#EB760B', '#239411'],
      },
    ],
  };

  ngOnInit() {
    if (localStorage.getItem('roleUser') == '3') {
      this.roleHR = true;
    }
    this.profileService.getProfile().subscribe({
      next: (res: any) => {
        this.ObjdataUser = res.data;
        this.testleaveday = this.ObjdataUser.user_maternity_day;
        this.ApiSuccess = true;
        console.log(this.ObjdataUser);
      },
      error: (err: any) => {},
    });
  }
}
