import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MainService } from 'src/app/main/main.service';
import Swal from 'sweetalert2';
import { ResetPasswordService } from './reset-password.service';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor(
    private change_password: ResetPasswordService,
    private main: MainService,
    private route: Router,
  ) { }

  password = new FormGroup({
    old_password: new FormControl('', Validators.required),
    new_password: new FormControl('', Validators.required),
    confirm_password: new FormControl('', Validators.required),
  })

  summitted: boolean = false;
  checkInvalid: boolean = false;
  checkDuplicate: boolean = false;
  checkNewPass: boolean = false;

  ngOnInit() {
  }

  togglePassword(passwordId: any, toggleId: any) {
    // toggle the type attribute
    let passwordElem = document.getElementById(passwordId)
    let typeAttribute = passwordElem!.getAttribute("type") === "password" ? "text" : "password";
    passwordElem!.setAttribute("type", typeAttribute);

    let toggle = document.getElementById(toggleId)
    let srcAttribute = toggle!.getAttribute("src") === "assets/img/login/eye-solid.png" ? "assets/img/login/eye-slash-solid.png" : "assets/img/login/eye-solid.png";
    toggle!.setAttribute("src", srcAttribute);
  }

  checkSpace(event: any) {
    if (event.keyCode == 32) {
      return false;
    } else {
      return true;
    }
  }

  clearAlert() {
    if (this.summitted)
      this.checkInvalid = false
    this.checkNewPass = false
    this.checkDuplicate = false
  }

  Submit() {

    var Lower = /[a-z]/g;
    var Upper = /[A-Z]/g;
    var Number = /[0-9]/g;

    let oldPassword = this.password.controls.old_password.value;
    let newPassword = this.password.controls.new_password.value;
    let confirmPassword = this.password.controls.confirm_password.value;

    this.summitted = true;

    if (this.password.invalid) {
      return;
    }
    if (oldPassword == newPassword) {
      this.checkDuplicate = true;
      return;
    }
    if (newPassword!.length >= 8 && newPassword!.length <= 20) {
      if (Lower.test(newPassword!) && Upper.test(newPassword!) && Number.test(newPassword!)) {

      } else {
        this.checkInvalid = true;
        return;
      }
    } else {
      this.checkInvalid = true;
      return;
    }

    if (newPassword == confirmPassword) {
    } else {
      this.checkNewPass = true;
      return;
    }

    Swal.fire({
      title:
        '<strong style = "font-family:Kanit"> คุณต้องการเปลี่ยนรหัสผ่าน หรือไม่ ? </strong>',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: '<div style = "font-family:Kanit"> ยกเลิก </div>',
      confirmButtonText: '<div style = "font-family:Kanit"> ตกลง </div>',
      confirmButtonColor: '#005FBC',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.patchPassword()
      }
    });
  }

  patchPassword() {
    this.change_password.changePassword(
      this.password.controls.old_password.value!,
      this.password.controls.new_password.value!,
      this.password.controls.confirm_password.value!
    ).subscribe({
      next: (res: any) => {
        Swal.fire({
          title: '<strong style = "font-family:Kanit"> เปลี่ยนรหัสผ่านสำเร็จ </strong>',
          html: '<div style = "font-family:Kanit">เราได้บันทึกรหัสผ่านใหม่ของคุณแล้ว<br>คุณสามารถเข้าสู่ระบบได้แล้วตอนนี้</ div > ',
          icon: 'success',
          confirmButtonColor: '#005FBC',
          confirmButtonText: '<div style = "font-family:Kanit"> ตกลง </div>'
        }).then((e) => {
          this.route.navigate(['/main/profile']);
        })
      },
      error: (err: any) => {
        if (err.status === 419) {
          Swal.fire({
            icon: 'warning',
            title: 'เซสชั่นหมดอายุ',
            text: 'กรุณา Login ใหม่ เพื่อใช้งาน',
          }).then((e) => {
            this.route.navigate(['']);
          })
        } else if (err.status === 400) {
          Swal.fire({
            title: '<strong style = "font-family:Kanit"> รหัสผ่านเดิมไม่ถูกต้อง </strong>',
            html: '<div style = "font-family:Kanit"> กรุณาลองใหม่อีกครั้ง </div>',
            icon: 'success',
            confirmButtonColor: '#005FBC',
            confirmButtonText: '<div style = "font-family:Kanit"> ตกลง </div>'
          }).then((e) => { location.reload(); })
        } else {
          this.main.Error()
        }
      }
    })

  }
}
