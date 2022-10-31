import { Component, OnInit } from '@angular/core';
import {
  Chart,
  ChartConfiguration,
  ChartOptions,
  ChartData,
  ChartEvent,
  ChartType,
} from 'chart.js';

@Component({
  selector: 'app-chart-leave',
  templateUrl: './chart-leave.component.html',
  styleUrls: ['./chart-leave.component.css'],
})
export class ChartLeaveComponent implements OnInit {
  constructor() {}

  ObjTestCircle1 = { l1: 4, l2: 12, l3: 7 };
  ObjTestCircle2 = { l1: 13, l2: 2, l3: 3, l4: 5 };

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

  ngOnInit() {}
}
