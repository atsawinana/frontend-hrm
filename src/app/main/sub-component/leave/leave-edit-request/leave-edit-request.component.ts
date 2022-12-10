import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { defineLocale, thBeLocale } from 'ngx-bootstrap/chronos';
import Swal from 'sweetalert2';
import { LeaveEditRequestService } from './leave-edit-request.service';

@Component({
    selector: 'app-leave-edit-request',
    templateUrl: './leave-edit-request.component.html',
    styleUrls: ['./leave-edit-request.component.css']
})
export class LeaveEditRequestComponent implements OnInit {

    constructor(
        private localeService: BsLocaleService,
        private editService: LeaveEditRequestService,
        public datepipe: DatePipe,
        private router: ActivatedRoute
    ) { }
    leaveRequest = new FormGroup({
        leaveType: new FormControl(null, [Validators.required]),
        startDate: new FormControl('', [Validators.required]),
        endDate: new FormControl(''),
        duration: new FormControl(null, [Validators.required]),
        detail: new FormControl('', [
            Validators.required,
            this.noWhitespaceValidator,
        ]),
    });

    noWhitespaceValidator(control: FormControl) {
        const isWhitespace = (control.value || '').trim().length === 0;
        const isValid = !isWhitespace;
        return isValid ? null : { whitespace: true };
    }

    locale = 'th';
    today!: Date;
    amount: string = "0 วัน 0 ชั่วโมง";
    summited: boolean = false;
    LeavesDays: any;
    rvac_id: string = this.router.snapshot.params['id'];

    APISuccess: boolean = false

    objData: any

    date = {
        dateStart: "",
        dateEnd: ""
    }

    ngOnInit() {
        this.getVacation()
        this.today = new Date();
        defineLocale('th', thBeLocale);
        this.localeService.use(this.locale);
        console.log(this.rvac_id)

        this.editService.showReverseVacation(this.rvac_id).subscribe({
            next: (res: any) => {
                this.objData = res.data
                this.leaveRequest.controls.leaveType.setValue(this.objData.rvac_type)
                this.leaveRequest.controls.startDate.setValue(this.objData.rvac_date_start)
                this.leaveRequest.controls.endDate.setValue(this.objData.rvac_date_end)
                this.objData.rvac_duration = 1
                this.leaveRequest.controls.duration.setValue(this.objData.rvac_duration)
                this.leaveRequest.controls.detail.setValue(this.objData.rvac_detail)
                console.log(res.data)
                this.countEditDays()
                console.log(this.leaveRequest)
                this.APISuccess = true
            },
            error: (err: any) => {
            }
        });

    }

    getVacation() {
        this.editService.getVacationType().subscribe({
            next: (res: any) => {
                this.LeavesDays = res.data.leaveDays;
                console.log(this.LeavesDays);
            },
            error: (res: any) => {

            }
        });
    }
    changeDate(date: any){
        let ary = date!.toString().split("/")
        ary[2] = (Number(ary[2]) - 543).toString()
        date = ary[1] +"-" + ary[0] + "-" + ary[2]
        return date
    }

    countEditDays(){
        
        let amount_hours = 0, amount_days = 0, diff;
        let startDateS = this.leaveRequest.controls.startDate.value;//String Value
        let endDateS = this.leaveRequest.controls.endDate.value;//String Value
        let duration = this.leaveRequest.controls.duration.value;
        startDateS = this.changeDate(startDateS!)
        endDateS =  this.changeDate(endDateS!)
        console.log(startDateS)
        console.log(endDateS)   
        //User is input strat date.
        if (startDateS != null) {
            //User is input end. 
            if (endDateS) {
                let startDate = new Date(startDateS);//Change string to Date
                let endDate = new Date(endDateS);//Change string to Date
                console.log(startDate)
                console.log(endDate)  
                //leave morning
                if (duration == "1") {
                    diff = (endDate.getTime() - startDate.getTime());
                    amount_days = Math.ceil(diff / (1000 * 60 * 60 * 24));
                    amount_hours = 4;
                }
                //leave all the days
                else {
                    diff = (endDate.getTime() - startDate.getTime());
                    amount_days = Math.ceil(diff / (1000 * 60 * 60 * 24)) + 1;
                    amount_hours = 0;
                }
            }
            //User is not input end.
            else {
                if (duration == "3") {
                    amount_days = 1;
                    amount_hours = 0;
                }
                else {
                    amount_days = 0;
                    amount_hours = 4;
                }
            }
        }
        this.amount = amount_days + " วัน " + amount_hours + " ชั่วโมง";

    }

    countDays(){
        
        let amount_hours = 0, amount_days = 0, diff;
        let startDateS = this.leaveRequest.controls.startDate.value;//String Value
        let endDateS = this.leaveRequest.controls.endDate.value;//String Value
        let duration = this.leaveRequest.controls.duration.value;
        if(this.date.dateStart == ""){
            startDateS = this.changeDate(startDateS!)
        }
       if(this.date.dateEnd == ""){
            endDateS =  this.changeDate(endDateS!)
       }
        console.log(startDateS)
        console.log(endDateS)   
        //User is input strat date.
        if (startDateS != null) {
            //User is input end. 
            if (endDateS) {
                let startDate = new Date(startDateS);//Change string to Date
                let endDate = new Date(endDateS);//Change string to Date
                console.log(startDate)
                console.log(endDate)  
                //leave morning
                if (duration == "1" || duration == "2") {
                    diff = (endDate.getTime() - startDate.getTime());
                    amount_days = Math.ceil(diff / (1000 * 60 * 60 * 24));
                    amount_hours = 4;
                }
                //leave all the days
                else {
                    diff = (endDate.getTime() - startDate.getTime());
                    amount_days = Math.ceil(diff / (1000 * 60 * 60 * 24)) + 1;
                    amount_hours = 0;
                }
            }
            //User is not input end.
            else {
                if (duration == "3") {
                    amount_days = 1;
                    amount_hours = 0;
                }
                else {
                    amount_days = 0;
                    amount_hours = 4;
                }
            }
        }
        this.amount = amount_days + " วัน " + amount_hours + " ชั่วโมง";

    }
    
    onValueChangeDateStart() {
        let startDate = this.datepipe.transform(this.leaveRequest.controls.startDate.value, 'yyyy-MM-dd');

        let arydate1 = startDate!.toString().split("-")
        console.log("test1", arydate1)

        arydate1[0] = (Number(arydate1[0]) + 543).toString()

        console.log("test2", arydate1.toString())

        let date = arydate1.toString().replace(",", "-")
        date = date?.replace(",", "-")

        console.log(date)
        this.date.dateStart = date!

    }

    onValueChangeDateEnd() {

        let endDate = this.datepipe.transform(this.leaveRequest.controls.endDate.value, 'yyyy-MM-dd');
        let arydate1 = endDate!.toString().split("-")
        console.log("test1", arydate1)

        arydate1[0] = (Number(arydate1[0]) + 543).toString()

        console.log("test2", arydate1.toString())

        let date = arydate1.toString().replace(",", "-")
        date = date?.replace(",", "-")

        console.log(date)
        this.date.dateEnd = endDate!

    }

    resendRequest() {
        console.log(this.leaveRequest.value)

        if (this.date.dateStart == "") {
            let tempdate = this.leaveRequest.controls.startDate.value?.toString().split("/")
            let date = tempdate?.reverse().toString().replace(",", "-")
            date = date?.replace(",", "-")
            console.log(date)
            this.date.dateStart = date!
        } else {
            console.log(this.date.dateStart)
        }

        if (this.date.dateEnd == "") {
            let tempdate = this.leaveRequest.controls.endDate.value?.toString().split("/")
            let date = tempdate?.reverse().toString().replace(",", "-")
            date = date?.replace(",", "-")
            console.log(date)
            this.date.dateEnd = date!
        } else {
            console.log(this.date.dateEnd)
        }

        //   body:     'rvac_id'   :  3,
        //                   'rvac_type'   :  '3',
        //                   'rvac_date_start'   :  '2565-12-09',
        //                   'rvac_date_end' : '2565-12-12,
        //                   'rvac_duration' : '3',
        //                   'rvac_detail' : 'อนุมัติเถอะ',


        this.editService.resendRequest(
            this.rvac_id, this.leaveRequest.controls.leaveType.value, this.date.dateStart, this.date.dateEnd, this.leaveRequest.controls.duration.value, this.leaveRequest.controls.detail.value
        ).subscribe({
            next: (res: any) => {
            },
            error: (res: any) => {
            }
        });
    }
}



