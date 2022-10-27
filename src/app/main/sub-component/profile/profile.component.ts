import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { ProfileService } from './profile.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

    constructor(private profileService: ProfileService) { }
    roleHR: boolean = false
    lineChart: any = []
    ObjdataUser:any = {}
    ngOnInit() {

        if (localStorage.getItem('roleUser') == "3") {
            this.roleHR = true
        }

        this.profileService.getProfile().subscribe({
            next: (res: any) => {
                this.ObjdataUser = res.data
                // console.log(this.ObjdataUser)
            },
            error: (err: any) => {

            }
        })

        //     this.lineChart = new Chart("MyChart", {
        //         type: 'bar', //this denotes tha type of chart
        //         data: {// values on X-Axis
        //             labels: ['2022-05-10', '2022-05-11', '2022-05-12', '2022-05-13',
        //                 '2022-05-14', '2022-05-15', '2022-05-16', '2022-05-17',],
        //             datasets: [
        //                 {
        //                     label: "Sales",
        //                     data: ['467', '576', '572', '79', '92',
        //                         '574', '573', '576'],
        //                     backgroundColor: 'blue'
        //                 },
        //                 {
        //                     label: "Profit",
        //                     data: ['542', '542', '536', '327', '17',
        //                         '0.00', '538', '541'],
        //                     backgroundColor: 'limegreen'
        //                 }
        //             ]
        //         },
        //         options: {
        //             aspectRatio: 2.5
        //         }

        //     });
    }

}
