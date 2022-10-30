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

  ObjTestCircle1 = {l1:4,l2:12,l3:7}
  ObjTestCircle2 = {l1:13,l2:2,l3:3,l4:5}


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
        data: [this.ObjTestCircle1.l1, this.ObjTestCircle1.l2, this.ObjTestCircle1.l3],
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
        data: [this.ObjTestCircle2.l1, this.ObjTestCircle2.l2, this.ObjTestCircle2.l3, this.ObjTestCircle2.l4],
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
        // console.log(this.ObjdataUser)
      },
      error: (err: any) => {},
    });

    this.createChart();
  }

  createChart() {
    // this.lineChart = new Chart("MyChart", {
    //     type: 'bar', //this denotes tha type of chart
    //     data: {// values on X-Axis
    //         labels: ['2022-05-10', '2022-05-11', '2022-05-12', '2022-05-13',
    //             '2022-05-14', '2022-05-15', '2022-05-16', '2022-05-17',],
    //         datasets: [
    //             {
    //                 label: "Sales",
    //                 data: ['467', '576', '572', '79', '92',
    //                     '574', '573', '576'],
    //                 backgroundColor: 'blue'
    //             },
    //             {
    //                 label: "Profit",
    //                 data: ['542', '542', '536', '327', '17',
    //                     '0.00', '538', '541'],
    //                 backgroundColor: 'limegreen'
    //             }
    //         ]
    //     },
    //     options: {
    //         aspectRatio: 2.5
    //     }
    // });
  }
}
