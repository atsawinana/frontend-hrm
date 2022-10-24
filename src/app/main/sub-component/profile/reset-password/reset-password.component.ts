import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  togglePassword(passwordId:any, toggleId:any) {
    // toggle the type attribute
    let passwordElem = document.getElementById(passwordId)
    let typeAttribute = passwordElem!.getAttribute("type") === "password" ? "text" : "password";
    passwordElem!.setAttribute("type", typeAttribute);

    let toggle = document.getElementById(toggleId)
    let srcAttribute = toggle!.getAttribute("src") === "assets/img/login/eye-solid.png" ? "assets/img/login/eye-slash-solid.png" : "assets/img/login/eye-solid.png";
    toggle!.setAttribute("src", srcAttribute);
  }

  modal() {
    Swal.fire({
      icon: 'success',
      title: '<strong style="font-family:Kanit; font-size:24px; color: #2F2F2F">เปลี่ยนรหัสผ่านสำเร็จ</strong>',
      html: '<div style="font-family:Kanit; font-size:18px"; color: #2F2F2F">เราได้บันทึกรหัสผ่านใหม่ของคุณแล้ว'+'<br>'+'คุณสามารถเข้าสู่ระบบได้แล้วตอนนี้</div>',
      confirmButtonColor: '#005FBC',
      confirmButtonText: '<div style="font-family:Kanit">กลับสู่หน้าหลัก</div>',
    })
  }

}
