import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Route, Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { LoadingService } from './loading/loading.service';
import { LoginService } from './login.service';
import { environment } from 'src/environments/environment';
import { retry } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  
  username = new FormControl('');
  password = new FormControl('');
  isSuccess?: boolean;
  token?: string;
  tokentype?: string;
  expires?: string;
  isHR: boolean = true;

  constructor(private loginService: LoginService, private router: Router, private coreToken: AuthService, public loading: LoadingService) {}

  ngOnInit(): void {
    // console.log(environment.apiURL)
  }

  alertTextRed() {
    let alert = document.getElementById('alert');
    alert!.style.display = 'block';
  }

  alertTextRedNull() {
    let alert = document.getElementById('alertnull');
    alert!.style.display = 'block';
  }

  ClearAlertText() {
    let alertnull = document.getElementById('alertnull');
    alertnull!.style.display = 'none';

    let alert = document.getElementById('alert');
    alert!.style.display = 'none';
  }

  togglePassword() {
    // toggle the type attribute
    let passwordElem = document.getElementById('passwordtag')
    let typeAttribute = passwordElem!.getAttribute("type") === "password" ? "text" : "password";
    passwordElem!.setAttribute("type", typeAttribute);

    let toggle = document.getElementById('togglt-password')
    let srcAttribute = toggle!.getAttribute("src") === "assets/img/login/eye-solid.png" ? "assets/img/login/eye-slash-solid.png" : "assets/img/login/eye-solid.png";
    toggle!.setAttribute("src", srcAttribute);
  }

  checkEnterLogin(e: any){
    if(e.keyCode == 13)
    {
      this.onClickSubmit()
    }
  }

  onClickSubmit() {
    this.ClearAlertText();
    this.loginService.login({username: this.username.value!, password: this.password.value!,}).subscribe({
        next: (res: any) => {
          console.log('Success, Username and Password are correct');
          this.isSuccess = true;
          this.token = res.data.access_token;
          this.tokentype = res.data.token_type;
          this.expires = res.data.expires_in;
          localStorage.setItem('notification',res.data.notification)
          // this.coreToken.token = localStorage.setItem('tokenLocal',this.token!)!
          
          localStorage.setItem('tokenLocal',this.token!)
          if (this.token != null) {
            this.router.navigate(['/main']);
          }
        },
        error: (err) => {
          console.log('Failed, Username and Password are incorrect');
          this.isSuccess = false;
          if (this.isSuccess == false) {
            if (this.username.value == '' || this.password.value == '') {
              this.alertTextRedNull();
            } else {
              this.alertTextRed();
            }
          }
        },
      });
  }
}
