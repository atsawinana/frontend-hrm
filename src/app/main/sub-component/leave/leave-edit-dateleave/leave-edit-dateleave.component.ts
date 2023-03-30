import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ActivatedRoute, Route, Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LeaveEditDateleaveService } from './leave-edit-dateleave.service';
import { Location } from '@angular/common';
import { LeaveService } from '../leave.service';

@Component({
    selector: 'app-leave-edit-dateleave',
    templateUrl: './leave-edit-dateleave.component.html',
    styleUrls: ['./leave-edit-dateleave.component.css']
})

export class LeaveEditDateleaveComponent implements OnInit {

    constructor(
        private route: Router,
        private _location: Location,
        private editService: LeaveEditDateleaveService,
        private leaveService: LeaveService
    ) { }
    leaveDays = new FormGroup({
        leave: new FormControl('', [Validators.required]),
        sick: new FormControl('', [Validators.required]),
        ordination: new FormControl('', [Validators.required]),
        maternity: new FormControl('', [Validators.required]),
        militaryService: new FormControl('', [Validators.required]),
        v_take_annual0_12: new FormControl('', [Validators.required]),
        v_take_annual13_15: new FormControl('', [Validators.required]),
        v_take_annual16_18: new FormControl('', [Validators.required]),
        v_take_annual19_21: new FormControl('', [Validators.required]),
        v_take_annual22_24: new FormControl('', [Validators.required]),
        v_take_annual25_27: new FormControl('', [Validators.required]),
        v_take_annual28_30: new FormControl('', [Validators.required]),
        v_take_annual31_33: new FormControl('', [Validators.required]),
        v_take_annual34_36: new FormControl('', [Validators.required]),
        v_take_annual37_39: new FormControl('', [Validators.required]),
        v_take_annual40_42: new FormControl('', [Validators.required]),
        v_take_annual43_45: new FormControl('', [Validators.required]),
        v_take_annual46: new FormControl('', [Validators.required]),
        v_without_pay: new FormControl('', [Validators.required]),
        v_resign: new FormControl('', [Validators.required]),
    });
    objData: any;
    APISuccess: boolean = false
    summited: boolean = false;
    today!: Date;

    ngOnInit() {

        this.leaveService.getleaveOnlineEdit().subscribe({
            next: (res: any) => {
                this.objData = res.data
                this.leaveDays.controls.leave.setValue(this.objData.vacation.v_leave)
                this.leaveDays.controls.sick.setValue(this.objData.vacation.v_sick)
                this.leaveDays.controls.ordination.setValue(this.objData.vacation.v_ordination)
                this.leaveDays.controls.maternity.setValue(this.objData.vacation.v_maternity)
                this.leaveDays.controls.militaryService.setValue(this.objData.vacation.v_military_service)
                this.leaveDays.controls.v_take_annual0_12.setValue(this.objData.vacation.v_take_annual0_12)
                this.leaveDays.controls.v_take_annual13_15.setValue(this.objData.vacation.v_take_annual13_15)
                this.leaveDays.controls.v_take_annual16_18.setValue(this.objData.vacation.v_take_annual16_18)
                this.leaveDays.controls.v_take_annual19_21.setValue(this.objData.vacation.v_take_annual19_21)
                this.leaveDays.controls.v_take_annual22_24.setValue(this.objData.vacation.v_take_annual22_24)
                this.leaveDays.controls.v_take_annual25_27.setValue(this.objData.vacation.v_take_annual25_27)
                this.leaveDays.controls.v_take_annual28_30.setValue(this.objData.vacation.v_take_annual28_30)
                this.leaveDays.controls.v_take_annual31_33.setValue(this.objData.vacation.v_take_annual31_33)
                this.leaveDays.controls.v_take_annual34_36.setValue(this.objData.vacation.v_take_annual34_36)
                this.leaveDays.controls.v_take_annual37_39.setValue(this.objData.vacation.v_take_annual37_39)
                this.leaveDays.controls.v_take_annual40_42.setValue(this.objData.vacation.v_take_annual40_42)
                this.leaveDays.controls.v_take_annual43_45.setValue(this.objData.vacation.v_take_annual43_45)
                this.leaveDays.controls.v_take_annual46.setValue(this.objData.vacation.v_take_annual46)
                this.leaveDays.controls.v_without_pay.setValue(this.objData.vacation.v_without_pay),
                    this.leaveDays.controls.v_resign.setValue(this.objData.vacation.v_resign)


                // console.log(res.data)
                // console.log(this.leaveDays)
                this.APISuccess = true
            },
            error: (err: any) => {
            }
        });

    }



    checkCancel() {
        Swal.fire({
            title:
                '<strong style = "font-family:Kanit"> คุณต้องการยกเลิกการแก้ไขวันลา ใช่หรือไม่ </strong>',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#d33',
            cancelButtonText: '<div style = "font-family:Kanit"> ยกเลิก </div>',
            confirmButtonText: '<div style = "font-family:Kanit"> ตกลง </div>',
            confirmButtonColor: '#005FBC',
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                this.route.navigate(['../main/leave']);
            }
        });
    }
    checkSummit() {
        this.summited = true;
        if (this.leaveDays.invalid)
            return;

        Swal.fire({
            title: '<strong style = "font-family:Kanit"> คุณต้องการบันทึกการเเก้ไขวันลา ใช่หรือไม่ </strong>',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#d33',
            cancelButtonText: '<div style = "font-family:Kanit"> ยกเลิก </div>',
            confirmButtonText: '<div style = "font-family:Kanit"> ตกลง </div>',
            confirmButtonColor: '#005FBC',
            reverseButtons: true,
        }).then((e) => {
            if (e.isConfirmed) {
                this.leaveService.leaveOnline(
                    this.leaveDays.controls.leave.value,
                    this.leaveDays.controls.sick.value,
                    this.leaveDays.controls.ordination.value,
                    this.leaveDays.controls.maternity.value,
                    this.leaveDays.controls.militaryService.value,
                    this.leaveDays.controls.v_without_pay.value,
                    this.leaveDays.controls.v_resign.value,
                    this.leaveDays.controls.v_take_annual0_12.value,
                    this.leaveDays.controls.v_take_annual13_15.value,
                    this.leaveDays.controls.v_take_annual16_18.value,
                    this.leaveDays.controls.v_take_annual19_21.value,
                    this.leaveDays.controls.v_take_annual22_24.value,
                    this.leaveDays.controls.v_take_annual25_27.value,
                    this.leaveDays.controls.v_take_annual28_30.value,
                    this.leaveDays.controls.v_take_annual31_33.value,
                    this.leaveDays.controls.v_take_annual34_36.value,
                    this.leaveDays.controls.v_take_annual37_39.value,
                    this.leaveDays.controls.v_take_annual40_42.value,
                    this.leaveDays.controls.v_take_annual43_45.value,
                    this.leaveDays.controls.v_take_annual46.value,
                ).subscribe({
                    next: (res: any) => {
                        this.route.navigate(['../main/leave']);
                    },
                    error: (res: any) => {
                    }
                });
            }
        })

    }


    inputNumberOnly(event: any): boolean {
        const charCode = event.which ? event.which : event.keyCode;

        if(charCode == 46){
            return true
        }

        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;
    }







}
