import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ActivatedRoute, Route, Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LeaveEditDateleaveService } from './leave-edit-dateleave.service';
import { Location } from '@angular/common';

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
  ) { }
  leaveDays = new FormGroup({
    leave: new FormControl('', [Validators.required]),
    sick : new FormControl('', [Validators.required]),
    takeAnnual1 : new FormControl('', [Validators.required]),
    takeAnnual2 : new FormControl('', [Validators.required]),
    takeAnnual3 : new FormControl('', [Validators.required]),
    takeAnnual4 : new FormControl('', [Validators.required]),
    ordination : new FormControl('', [Validators.required]),
    maternity : new FormControl('', [Validators.required]),
    militaryService : new FormControl('', [Validators.required]),
  });
  objData: any;
  APISuccess: boolean = false
  summited: boolean = false;
  today!: Date;
  
  
  ngOnInit() {

    this.editService.showPresetVacation().subscribe({
      next: (res: any) => {
          this.objData = res.data
          this.leaveDays.controls.leave.setValue(this.objData.amout_vacation.av_leave)
          this.leaveDays.controls.sick.setValue(this.objData.amout_vacation.av_sick)
          this.leaveDays.controls.takeAnnual1.setValue(this.objData.amout_vacation.av_take_annual1)
          this.leaveDays.controls.takeAnnual2.setValue(this.objData.amout_vacation.av_take_annual2)
          this.leaveDays.controls.takeAnnual3.setValue(this.objData.amout_vacation.av_take_annual3)
          this.leaveDays.controls.takeAnnual4.setValue(this.objData.amout_vacation.av_take_annual4)
          this.leaveDays.controls.ordination.setValue(this.objData.amout_vacation.av_ordination)
          this.leaveDays.controls.maternity.setValue(this.objData.amout_vacation.av_maternity)
          this.leaveDays.controls.militaryService.setValue(this.objData.amout_vacation.av_military_service)
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
  checkSummit(){
    this.summited = true;
    if (this.leaveDays.invalid)
    return;

    console.log(this.leaveDays.controls.sick.value)
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
          this.editService.editVacationDays(
            this.leaveDays.controls.leave.value, 
            this.leaveDays.controls.sick.value, 
            this.leaveDays.controls.takeAnnual1.value, 
            this.leaveDays.controls.takeAnnual2.value, 
            this.leaveDays.controls.takeAnnual3.value, 
            this.leaveDays.controls.takeAnnual4.value,
            this.leaveDays.controls.ordination.value,
            this.leaveDays.controls.maternity.value,
            this.leaveDays.controls.militaryService.value
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
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }




  


}
