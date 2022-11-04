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
  selector: 'app-chart-ot',
  templateUrl: './chart-ot.component.html',
  styleUrls: ['./chart-ot.component.css'],
})
export class ChartOtComponent implements OnInit {
  constructor() {}

  ObjTestCircle1 = { l1: 4, l2: 12, l3: 7 };
  ObjTestCircle2 = { l1: 13, l2: 2, l3: 3, l4: 5 };

  public doughnutChartLabels2: string[] = [
    'Developer',
    'Designer',
    'Marketing',
    'Temporary',
  ];
  public doughnutChartData2: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels2,
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
  public doughnutChartType2: ChartType = 'doughnut';

  ngOnInit() {}
}
