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
  baseURL = environment.apiURL;
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
        this.testleaveday = this.ObjdataUser.user_maternity_day;
        this.ApiSuccess = true;
        console.log(this.ObjdataUser);
      },
      error: (err: any) => {},
    });
  }
}
